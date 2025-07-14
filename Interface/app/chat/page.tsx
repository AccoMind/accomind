"use client";

import React from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus, Clock, ArrowRight } from "lucide-react";

export default function ChatPage() {
  // Mock chat history for demonstration
  const recentChats = [
    {
      id: "1",
      title: "Commercial Bank PLC Analysis",
      lastMessage: "What are the key financial metrics for Commercial Bank?",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      title: "NDB Bank Stock Performance",
      lastMessage: "How has NDB Bank stock performed this quarter?",
      timestamp: "Yesterday",
    },
    {
      id: "3",
      title: "Banking Sector Overview",
      lastMessage: "Compare the top 5 banks in Sri Lanka",
      timestamp: "3 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                Chat History
              </h1>
              <p className="text-gray-600">
                Continue previous conversations or start a new one
              </p>
            </div>

            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium">
                <Plus className="h-4 w-4 mr-2" />
                New Conversation
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Recent Chats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Conversations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentChats.length > 0 ? (
                <div className="space-y-3">
                  {recentChats.map((chat) => (
                    <Link key={chat.id} href={`/chat/${chat.id}`}>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {chat.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                            {chat.lastMessage}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {chat.timestamp}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No conversations yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Start your first conversation about Sri Lankan PLCs
                  </p>
                  <Link href="/">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Start Chatting
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-blue-900">Ask a Question</h3>
                </div>
                <p className="text-blue-700 text-sm mb-4">
                  Get instant insights about any Sri Lankan PLC
                </p>
                <Link href="/">
                  <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-200">
                    Start New Chat
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-green-900">Company Analysis</h3>
                </div>
                <p className="text-green-700 text-sm mb-4">
                  Explore detailed company reports and financial data
                </p>
                <Link href="/company">
                  <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-200">
                    View Companies
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
