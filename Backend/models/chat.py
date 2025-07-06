import datetime
import enum

from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship

from db.base import Base


class Chat(Base):
    __tablename__ = "chat"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(
        DateTime, default=datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(
        DateTime, default=datetime.datetime.now(datetime.timezone.utc))
    user_id = Column(Integer, ForeignKey("user.id"))

    user = relationship("User", back_populates="chats")
    messages = relationship("ChatMessage", back_populates="chat")


class MessageSource(enum.Enum):
    USER = "user"
    ASSISTANT = "assistant"


class ChatMessage(Base):
    __tablename__ = "chat_message"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String(5000))
    role = Column(Enum(MessageSource), default=MessageSource.USER)
    created_at = Column(
        DateTime, default=datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(
        DateTime, default=datetime.datetime.now(datetime.timezone.utc))
    chat_id = Column(Integer, ForeignKey("chat.id"))

    chat = relationship("Chat", back_populates="messages")
