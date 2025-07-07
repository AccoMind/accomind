"use client"

import {useChat} from "@ai-sdk/react"
import {useSearchParams, useRouter, useParams} from "next/navigation"
import {useEffect, useRef, useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card} from "@/components/ui/card"
import {ArrowLeft, Send, User, Bot} from "lucide-react"
import {useChatStore} from "@/stores/CurrentChatStore";
import ChatService from "@/services/chatService";
import ReactMarkdown from "react-markdown";

export default function ChatPage() {
    const {id} = useParams()
    const searchParams = useSearchParams()
    const router = useRouter()
    const initialQuery = searchParams.get("initial")
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState("")

    const messages = useChatStore(state => state.messages)
    const addMessage = useChatStore(state => state.addMessage)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleBackToQuery = () => {
        router.push("/")
    }

    const handleSubmit = (e) => {
        e.preventDefault()


        const message = {
            "content": input,
            "role": "user"
        }

        addMessage(message)

        ChatService.newChatMessage(id!.toString(), message)
            .then(res => {
                addMessage({
                    content: res.data.content,
                    id: res.data.id,
                  role: res.data.role
                })

              setInput("")
            })
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" onClick={handleBackToQuery}
                                className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4"/>
                            New Query
                        </Button>
                        <div className="h-6 w-px bg-gray-300"/>
                        <h1 className="text-lg font-semibold text-gray-900">AccoMind</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                        <span className="text-sm text-gray-600">Online</span>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-4xl mx-auto space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center py-12">
                            <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to help!</h3>
                            <p className="text-gray-600">Start a conversation by typing a message below.</p>
                        </div>
                    )}

                    {messages.map((message) => (
                        <div key={message.id}
                             className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                            {message.role === "assistant" && (
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Bot className="h-4 w-4 text-white"/>
                                    </div>
                                </div>
                            )}

                            <Card
                                className={`max-w-[80%] p-4 ${
                                    message.role === "user" ? "bg-blue-500 text-white" : "bg-white border border-gray-200"
                                }`}
                            >
                                <div className="whitespace-pre-wrap">
                                    <div key={`${message.id}`}>
                                      <ReactMarkdown>{message.content}</ReactMarkdown>
                                    </div>
                                </div>
                            </Card>

                            {message.role === "user" && (
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                                        <User className="h-4 w-4 text-white"/>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-3 justify-start">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Bot className="h-4 w-4 text-white"/>
                                </div>
                            </div>
                            <Card className="max-w-[80%] p-4 bg-white border border-gray-200">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{animationDelay: "0ms"}}
                                        />
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{animationDelay: "150ms"}}
                                        />
                                        <div
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{animationDelay: "300ms"}}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-500">AI is thinking...</span>
                                </div>
                            </Card>
                        </div>
                    )}

                    <div ref={messagesEndRef}/>
                </div>
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-200 p-4">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1"
                            disabled={isLoading}
                        />
                        <Button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-600">
                            <Send className="h-4 w-4"/>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
