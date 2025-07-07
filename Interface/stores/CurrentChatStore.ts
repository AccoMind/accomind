import { create } from 'zustand'

export type Message = {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: number
}

interface ChatState {
    messages: Message[]
    addMessage: (message: Message) => void
    setMessages: (messages: Message[]) => void
    resetChat: () => void
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],

    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),

    setMessages: (messages) => set({ messages }),

    resetChat: () => set({ messages: [] }),
}))
