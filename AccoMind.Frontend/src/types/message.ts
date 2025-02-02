export type Message = {
    id?: number
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