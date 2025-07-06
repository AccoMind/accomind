import datetime
from typing import Optional

from pydantic import BaseModel

from models.chat import MessageSource


class ChatMessage(BaseModel):
    id: int
    message: str
    source: MessageSource
    created_at: datetime.datetime
    updated_at: datetime.datetime
    chat_id: int

    class Config:
        from_attributes = True


class ChatSchema(BaseModel):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    user_id: int
    messages: list[ChatMessage]

    class Config:
        from_attributes = True


class ChatMessageRequestSchema(BaseModel):
    content: str
    filters: Optional[dict] = None


class ChatHistorySchema(BaseModel):
    role: str
    content: str
