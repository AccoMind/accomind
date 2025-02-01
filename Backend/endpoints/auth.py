from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from core.security import (
    verify_password,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES, get_password_hash
)
from db.session import get_db
from models.user import User
from schemas.auth import LoginResponseSchema, LoginSchema, RegisterResponseSchema, RegisterSchema

router = APIRouter()


@router.post("/login", response_model=LoginResponseSchema)
async def login(
        login_data: LoginSchema,
        db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.username == login_data.username).first()
    if not user or not verify_password(login_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=access_token_expires
    )

    return LoginResponseSchema(
        full_name=user.full_name,
        email=user.email,
        username=user.email,
        token=access_token
    )


@router.post("/register", response_model=RegisterResponseSchema)
async def register(
        register_data: RegisterSchema,
        db: Session = Depends(get_db)
):
    user = User(
        username=register_data.username,
        email=register_data.email,
        password=get_password_hash(register_data.password),
        full_name=register_data.full_name
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
