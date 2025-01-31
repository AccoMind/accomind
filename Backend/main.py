from fastapi import FastAPI

from endpoints.chatbot import router as chat_router
from endpoints.auth import router as auth_router

app = FastAPI()


app.include_router(chat_router, prefix="/chat", tags=["chat"])
app.include_router(auth_router, prefix="/auth", tags=["chat"])

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
