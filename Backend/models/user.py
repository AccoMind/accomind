from sqlalchemy import Boolean, Column, String, Integer
from sqlalchemy.orm import relationship

from db.base import Base


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(20), unique=True, index=True)
    email = Column(String(80), unique=True, index=True)
    password = Column(String(80))
    full_name = Column(String(80))
    disabled = Column(Boolean, default=False)

    chats = relationship("Chat", back_populates="user")