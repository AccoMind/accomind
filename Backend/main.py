from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from endpoints.chatbot import router as chat_router
from endpoints.auth import router as auth_router

app = FastAPI()

# add CORD
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(chat_router, prefix="/chat", tags=["chat"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])
