import http from "@/http-common"
import { Chat, Message } from "@/types/message"

export default class ChatService {

    private static path = "/chat"

    public static getAllChats() {
        return http.get(`${ChatService.path}/`)
    }

    public static getChatById(id: string) {
        return http.get<Chat>(`${ChatService.path}/${id}`)
    }

    public static createChat(chatMessage: Message) {
        return http.post(`${ChatService.path}/`, chatMessage)
    }

    public static newChatMessage(id: string, message: Message) {
        return http.post<Message>(`${ChatService.path}/${id}/message`, message)
    }
}