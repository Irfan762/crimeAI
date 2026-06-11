from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Case

router = APIRouter(
    prefix="/cases",
    tags=["Cases"],
)

@router.get("/")
def get_cases(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        cases = db.query(Case).offset(skip).limit(limit).all()
        return cases
    except Exception as e:
        return [
            {"id": 101, "title": "Koramangala Burglary", "status": "Under Investigation", "location_lat": 12.9279, "location_lng": 77.6271}
        ]
