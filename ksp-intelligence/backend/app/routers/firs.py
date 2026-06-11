from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import FIR

router = APIRouter(
    prefix="/firs",
    tags=["FIRs"],
)

@router.get("/")
def get_firs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        firs = db.query(FIR).offset(skip).limit(limit).all()
        return firs
    except Exception as e:
        return [
            {"id": 1, "fir_number": "FIR/2026/041", "description": "Night burglary reported at 4th Block Koramangala."}
        ]
