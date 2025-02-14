import datetime

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
        orm_mode = True


class ChatSchema(BaseModel):
    id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime
    user_id: int
    messages: list[ChatMessage]

    class Config:
        orm_mode = True


class ChatMessageRequestSchema(BaseModel):
    message: str
    filters: dict


class ChatHistorySchema(BaseModel):
    role: str
    content: str
