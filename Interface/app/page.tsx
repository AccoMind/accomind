"use client"

import type React from "react"

import {useState} from "react"
import {useRouter} from "next/navigation"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {MessageSquare, Sparkles, Zap} from "lucide-react"
import ChatService from "@/services/chatService";
import {useChatStore} from "@/stores/CurrentChatStore";

export default function QueryPage() {
    const [query, setQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const addMessage = useChatStore(state => state.addMessage)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return

        setIsLoading(true)

        const message = {
            content: query,
            role: "user",
            filters: {},
            timestamp: new Date()
        }

        addMessage(message)

        ChatService.createChat(message)
            .then(res => {
                setIsLoading(false)
                const chatId = res.data.chat_id

                addMessage({
                    id: res.data.id,
                    role: "assistant",
                    content: res.data.content,
                    timestamp: new Date()
                })

                router.push(`/chat/${chatId}`)
            })
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                            <Sparkles className="h-8 w-8 text-white"/>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        AccoMind
                    </h1>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        Your Financial Insights Assistant – Ask About Any Public Company
                    </p>
                </div>

                {/* Query Form */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5"/>
                            What would you like to know about PLCs in Sri Lanka?
                        </CardTitle>
                        <CardDescription>Type your question below and press Enter or click Ask to get
                            started</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me about PLCs in Sri Lanka."
                                className="min-h-[120px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                disabled={isLoading}
                            />
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3"
                                disabled={!query.trim() || isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                                        Starting conversation...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4"/>
                                        Ask AccoMind
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-white/60 backdrop-blur-sm border-gray-200">
                        <CardContent className="p-4 text-center">
                            <div
                                className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <MessageSquare className="h-4 w-4 text-blue-600"/>
                            </div>
                            <h3 className="font-medium text-gray-900">Conversational</h3>
                            <p className="text-sm text-gray-600">Natural dialogue interface</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white/60 backdrop-blur-sm border-gray-200">
                        <CardContent className="p-4 text-center">
                            <div
                                className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Sparkles className="h-4 w-4 text-purple-600"/>
                            </div>
                            <h3 className="font-medium text-gray-900">Intelligent</h3>
                            <p className="text-sm text-gray-600">Powered by advanced AI</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white/60 backdrop-blur-sm border-gray-200">
                        <CardContent className="p-4 text-center">
                            <div
                                className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Zap className="h-4 w-4 text-green-600"/>
                            </div>
                            <h3 className="font-medium text-gray-900">Fast</h3>
                            <p className="text-sm text-gray-600">Real-time responses</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
