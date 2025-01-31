from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from core.security import get_current_user
from db.session import get_db
from schemas.chat import ChatSchema, ChatMessageRequestSchema
from services.chat_service import ChatService

router = APIRouter()

@router.get("/")
async def get_chats(db: Session = Depends(get_db), current_user: Annotated[int, Depends(get_current_user)] = None):
    return ChatService.get_all_chats(db, current_user)

@router.post("/")
async def create_chat(
        request: ChatMessageRequestSchema,
        db: Session = Depends(get_db),
        current_user: Annotated[int, Depends(get_current_user)] = None
):
    chat = ChatService.create_chat(request.message, db, current_user)
    return chat

@router.get("/{chat_id}", response_model=ChatSchema)
async def get_chat(chat_id: int, db: Session = Depends(get_db), current_user: Annotated[int, Depends(get_current_user)] = None):
    return ChatService.get_chat_with_messages(db, chat_id, current_user)

@router.post("/{chat_id}/message")
async def create_chat_message(
        chat_id: int,
        request: ChatMessageRequestSchema,
        db: Session = Depends(get_db),
        current_user: Annotated[int, Depends(get_current_user)] = None
):
    return ChatService.new_user_prompt(db, chat_id, request.message)