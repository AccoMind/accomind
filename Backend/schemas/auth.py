from pydantic import BaseModel


class LoginSchema(BaseModel):
    username: str
    password: str


class RegisterSchema(BaseModel):
    username: str
    password: str
    email: str
    full_name: str


class RegisterResponseSchema(BaseModel):
    full_name: str
    email: str
    username: str


class LoginResponseSchema(BaseModel):
    full_name: str
    email: str
    username: str
    token: str
