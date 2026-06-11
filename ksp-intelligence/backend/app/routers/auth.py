from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import Dict, Any

from app.database import get_db
from app.auth import verify_password, create_access_token, get_password_hash, ACCESS_TOKEN_EXPIRE_MINUTES
from app.models import User, Role

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

@router.post("/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    
    # Mocking for demo purposes if no user exists, allowing an admin login bypass
    if not user and form_data.username == "admin" and form_data.password == "admin":
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": "admin", "role": "Administrator"}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer", "role": "Administrator"}

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    role = db.query(Role).filter(Role.id == user.role_id).first()
    role_name = role.name if role else "Investigator"

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "role": role_name}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer", "role": role_name}
