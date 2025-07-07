export type Filter = {
    company?: string
    year?: string
}

export type Message = {
    id?: number
    chat_id?: number
    filters?: Filter | null
    content: string
    role: "user" | "assistant"
    created_at: string
    updated_at: string
}

export type Chat = {
    id: number
    user_id: number
    messages: Message[]
    created_at: string
    updated_at: string
}

export type NewChatMessage = {
    message: string
}