import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, Send, User } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ChatService from "@/services/chatService";
import { Message } from "@/types/message";

const ChatBotInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { id } = useParams();


  const query = useQuery(
    {
      queryKey: ["messages", { id }],
      queryFn: () => ChatService.getChatById(id!),
      enabled: !!id,
    }
  )

  const mutation = useMutation({
    mutationFn: (message: string) => ChatService.newChatMessage(id!, message),
    onError: (error, variables, context) => {
      console.log(error)
      queryClient.setQueryData(["messages", { id }], context)
    },
    onSettled: () => {
      queryClient.invalidateQueries(["messages", { id }])
    }
  })

  const newChatMutation = useMutation({
    mutationFn: (message: string) => ChatService.createChat({ message }),
    onSettled: (data) => {
      console.log(data)
      navigate(`/${data?.data.chat_id}`)
      queryClient.invalidateQueries(["messages", { id }])
    }
  })


  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      message: newMessage,
      source: "user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (id)
      mutation.mutate(newMessage);
    else
      newChatMutation.mutate(newMessage);

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setNewMessage("");
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-100 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Chat Options</h2>
          <Menu className="h-6 w-6 text-gray-700" />
        </div>
        <nav className="space-y-4 flex-1">
          <Button className="w-full text-left">New Chat</Button>
          <Button className="w-full text-left">Recent Chats</Button>
          <Button className="w-full text-left">Top 10 Growing Companies</Button>
          <Button className="w-full text-left">Fix this code</Button>
          <Button className="w-full text-left">Sample Copy</Button>
        </nav>
        <div className="mt-4 flex items-center p-2 bg-gray-200 rounded-md">
          <User className="h-6 w-6 text-gray-700" />
          <div className="ml-2">
            <p className="text-sm text-gray-800">Welcome back,</p>
            <p className="text-sm font-bold text-gray-900">User</p>
          </div>
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {query.data?.data.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.source === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg shadow ${message.source === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-900"
                  }`}
              >
                {message.message}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t p-4 bg-white flex items-center">
          <Input
            className="flex-1"
            placeholder="Type a new message here"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button
            onClick={handleSendMessage}
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ChatBotInterface;