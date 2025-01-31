from pydantic import BaseModel


class LoginSchema(BaseModel):
    username: str
    password: str

class RegisterSchema(BaseModel):
    username: str
    password: str
    email: str
    full_name: str