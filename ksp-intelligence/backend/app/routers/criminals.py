from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Criminal

router = APIRouter(
    prefix="/criminals",
    tags=["Criminals"],
)

@router.get("/")
def get_criminals(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        criminals = db.query(Criminal).offset(skip).limit(limit).all()
        return criminals
    except Exception as e:
        # Fallback for demo when DB is not running
        return [
            {"id": 1, "first_name": "Ravi", "last_name": "Kumar", "alias": "Seena", "risk_level": "High"}
        ]

@router.get("/{criminal_id}")
def get_criminal(criminal_id: int, db: Session = Depends(get_db)):
    try:
        criminal = db.query(Criminal).filter(Criminal.id == criminal_id).first()
        if not criminal:
            raise HTTPException(status_code=404, detail="Criminal not found")
        return criminal
    except Exception as e:
        # Fallback
        if criminal_id == 1:
            return {"id": 1, "first_name": "Ravi", "last_name": "Kumar", "alias": "Seena", "risk_level": "High"}
        raise HTTPException(status_code=404, detail="Criminal not found")
