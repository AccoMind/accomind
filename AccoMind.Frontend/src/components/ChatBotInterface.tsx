import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, Send, Plus, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import ChatService from "@/services/chatService";
import { Chat, Message } from "@/types/message";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import Navbar from "@/components/Navbar";

const ChatBotInterface: React.FC = () => {
  const [company, setCompany] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Load chat history on component mount
  useEffect(() => {
    loadChatHistory();
  }, []);

  // Load specific chat when id changes
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      ChatService.getChatById(id!)
        .then((response) => {
          setMessages(response.data.messages);
          setIsLoading(false);
        })
        .catch((err) => {
          setError("Failed to load chat. Please try again.");
          setIsLoading(false);
        });
    } else {
      setMessages([]);
    }
  }, [id]);

  const loadChatHistory = async () => {
    setLoadingHistory(true);
    try {
      const response = await ChatService.getAllChats();
      setChatHistory(response.data);
    } catch (err) {
      console.error("Failed to load chat history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const onNewChat = (messageObj: Message) => {
    ChatService.createChat(messageObj)
      .then((response) => {
        navigate(`/${response.data.chat_id}`);
        loadChatHistory(); // Refresh chat history
      });
  }

  const onNewChatMessage = async (messageObj: Message) => {
    ChatService.newChatMessage(id!, messageObj)
      .then((response) => {
        navigate(`/${response?.data.chat_id}`)
        setMessages((prevMessages) => [...prevMessages, response.data]);
      });
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      filters: {
        company: company,
      },
      message: newMessage,
      source: "user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    if (id)
      onNewChatMessage(userMessage);
    else
      onNewChat(userMessage);

    setNewMessage("");
  };

  const handleNewChat = () => {
    setMessages([]);
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden bg-white border-r border-gray-200 flex flex-col`}>
          <div className="p-4 border-b border-gray-200">
            <Button 
              onClick={handleNewChat}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              <span>New Chat</span>
            </Button>
          </div>
          
          <div className="flex-1 p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Recent Chats
            </h3>
            <div className="space-y-2">
              {loadingHistory ? (
                <div className="flex items-center justify-center p-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : chatHistory.length === 0 ? (
                <div className="text-center p-4 text-gray-500 text-sm">
                  No previous chats
                </div>
              ) : (
                chatHistory.map((chat) => {
                  const firstMessage = chat.messages?.[0];
                  const isActive = id === chat.id.toString();
                  
                  return (
                    <div
                      key={chat.id}
                      onClick={() => navigate(`/${chat.id}`)}
                      className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                        isActive 
                          ? 'bg-blue-100 border border-blue-200' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <MessageCircle className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm truncate block ${isActive ? 'text-blue-900' : 'text-gray-600'}`}>
                          {firstMessage?.message || 'New conversation'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(chat.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="bg-white hover:bg-gray-50 border border-gray-200"
                >
                  {sidebarOpen ? (
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  )}
                </Button>
                <h1 className="text-lg font-semibold text-gray-900">
                  {id ? `Chat ${id}` : "New Chat"}
                </h1>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Start a new conversation
                  </h3>
                  <p className="text-gray-500">
                    Ask questions about financial reports and company data
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={message.id || index}
                  className={`flex ${message.source === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md p-3 rounded-lg shadow-sm ${
                      message.source === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(message.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="mb-4 flex gap-4">
              <Select onValueChange={(value) => setCompany(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="COMMERCIAL_BANK_PLC">COMMERCIAL BANK PLC</SelectItem>
                  <SelectItem value="NDB_BANK_PLC">NDB BANK PLC</SelectItem>
                  <SelectItem value="ABANS_ELECTRICALS_PLC">ABANS ELECTRICALS PLC</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setCompany(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select YEAR" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                className="flex-1"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatBotInterface;