export type Filter = {
    company?: string
    year?: number
}

export type Message = {
    id?: number
    chat_id?: number
    filters?: Filter | null
    message: string
    source: string
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