import asyncio
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from models.chat import Chat
from core.security import get_current_user
from db.session import get_db
from schemas.chat import ChatSchema, ChatMessageRequestSchema
from services.chat_service import ChatService

router = APIRouter()


@router.get("/")
async def get_all_chats(db: Session = Depends(get_db), current_user: Annotated[int, Depends(get_current_user)] = None):
    return ChatService.get_all_chats(db, current_user)


@router.post("/")
async def new_chat(
        request: ChatMessageRequestSchema,
        db: Session = Depends(get_db)
):
    chat = Chat(user_id=2)
    db.add(chat)
    db.commit()
    db.refresh(chat)

    chat_message = request.content
    prompt = ChatService.new_user_prompt(db, chat.id, chat_message)

    return prompt


@router.get("/{chat_id}", response_model=ChatSchema)
async def get_chat_by_id(chat_id: int, db: Session = Depends(get_db)):
    chat = db.query(Chat).filter(
        Chat.id == chat_id).first()

    if not chat:
        raise HTTPException(
            status_code=404,
            detail="Chat not found"
        )
    return chat


@router.post("/{chat_id}/message")
async def create_chat_message(
        chat_id: int,
        request: ChatMessageRequestSchema,
        db: Session = Depends(get_db)
):
    return ChatService.new_user_prompt(db, chat_id, request.content, filters=request.filters)
