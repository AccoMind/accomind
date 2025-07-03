from email import message
from typing import Optional

from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload

from schemas.chat import ChatHistorySchema
from models.chat import Chat, ChatMessage, MessageSource
from services.LLMService import LLMService


class ChatService:

    @staticmethod
    def get_all_chats(db: Session, user_id: int):
        return db.query(Chat).options(joinedload(Chat.messages)).filter(Chat.user_id == user_id).order_by(Chat.created_at.desc()).all()

    @staticmethod
    def get_chat_by_id(db: Session, chat_id: int, current_user: int):
        chat = db.query(Chat).filter(
            Chat.id == chat_id and Chat.user_id == current_user).first()

        if not chat:
            raise HTTPException(
                status_code=404,
                detail="Chat not found"
            )
        return chat

    @staticmethod
    def create_chat(chat_message: str, db: Session, user_id: int, filters: dict = {}):

        chat = Chat(user_id=user_id)
        db.add(chat)
        db.commit()
        db.refresh(chat)

        llm_response = LLMService().generate_response(chat_message, filters=filters)

        ChatService.create_chat_message(db, chat.id, chat_message)

        llm_response = ChatService.create_chat_message(
            db, chat.id, llm_response, MessageSource.BOT)

        return llm_response

    @staticmethod
    def new_user_prompt(db: Session, chat_id: int, message: str, filters: dict = {}):

        ChatService.create_chat_message(db, chat_id, message)

        chat_history = db.query(ChatMessage).filter(
            ChatMessage.chat_id == chat_id).order_by(ChatMessage.created_at).all()

        messages = []

        for chat in chat_history:
            messages.append(ChatHistorySchema(
                role="assistant" if chat.source == MessageSource.BOT else MessageSource.USER, content=chat.message
            ))

        response = LLMService().generate_response(message, messages, filters=filters)

        response = ChatService.create_chat_message(
            db, chat_id, response, MessageSource.BOT)

        return response

    @staticmethod
    def create_chat_message(db: Session, chat_id: int, message: str, source: Optional[MessageSource] = MessageSource.USER):
        chat = db.query(Chat).filter(Chat.id == chat_id).first()
        if not chat:
            raise Exception("Chat not found")
        chat_message = ChatMessage(
            message=message, chat_id=chat_id, source=source)
        db.add(chat_message)
        db.commit()
        db.refresh(chat_message)
        return chat_message
