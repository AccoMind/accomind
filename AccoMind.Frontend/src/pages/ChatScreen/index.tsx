import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Menu, Send, User} from "lucide-react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import ChatService from "@/services/chatService.ts";
import {Filter, Message} from "@/types/message.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select.tsx";

const ChatScreen: React.FC = () => {
    const [company, setCompany] = useState("");
    const [year, setYear] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            const message = location.state.message;
            sendFirstMessage(message);
        }
    }, [location])

    const navigate = useNavigate();


    const {id} = useParams();

    useEffect(() => {
        if (id) {
            ChatService.getChatById(id!)
                .then((response) => {
                    setMessages(response.data.messages);
                });
        }
    }, [id]);

    const onNewChat = (messageObj: Message) => {
        ChatService.createChat(messageObj)
            .then((response) => {
                navigate(`/${response.data.chat_id}`);
            });
    }


    const onNewChatMessage = async (messageObj: Message) => {

        ChatService.newChatMessage(id!, messageObj)
            .then((response) => {
                navigate(`/${response?.data.chat_id}`)
                setMessages((prevMessages) => [...prevMessages, response.data]);
            });
    }

    const sendFirstMessage = async (message: string) => {
        const filters: Filter = {}

        if (company) {
            filters["company"] = company;
        }

        if (year) {
            filters["year"] = year;
        }

        const userMessage: Message = {
            filters: filters,
            message: message,
            source: "user",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);

        onNewChat(userMessage);
    }


    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;


        const filters: Filter = {}

        if (company) {
            filters["company"] = company;
        }

        if (year) {
            filters["year"] = year;
        }


        const userMessage: Message = {
            filters: filters,
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

    return (
        <div className="h-screen flex bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-100 p-4 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Chat Options</h2>
                    <Menu className="h-6 w-6 text-gray-700"/>
                </div>
                <div className="flex-1"></div>
                <div className="mt-4 flex items-center p-2 bg-gray-200 rounded-md">
                    <User className="h-6 w-6 text-gray-700"/>
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
                    {messages.map((message) => (
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
                <div className="border-t p-4 bg-white">
                    <div className="mb-4 flex gap-4">
                        <Select onValueChange={(value) => setCompany(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Company"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="COMMERCIAL_BANK_OF_CEYLON_PLC">COMMERCIAL BANK PLC</SelectItem>
                                <SelectItem value="SEYLAN_BANK_PLC">NDB BANK PLC</SelectItem>
                                <SelectItem value="PAN_ASIA_BANKING_CORPORATION_PLC">PAN ASIA BANKING CORPORATION
                                    PLC</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => setYear(value)}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Select YEAR"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center">
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
                            <Send className="h-5 w-5"/>
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ChatScreen;