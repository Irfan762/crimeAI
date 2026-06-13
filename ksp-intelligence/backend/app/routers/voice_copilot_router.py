from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel

from app.database import get_db
from app.services.copilot_service import (
    process_audio_note,
    smart_recall_query,
    generate_case_summary,
    generate_daily_briefing
)
from app.models import TimelineEvent

router = APIRouter(prefix="/copilot", tags=["Voice Copilot"])

class QueryRequest(BaseModel):
    query: str
    case_id: Optional[int] = None

@router.post("/voice-note")
async def upload_voice_note(
    case_id: int = Form(...),
    user_id: int = Form(...),
    audio_file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Endpoint to receive a voice note, transcribe it, and process it for memory and timeline.
    """
    # In a real app, save the file to a storage bucket (S3) or local disk
    # For now, we simulate saving and just pass the filename
    file_location = f"temp_{audio_file.filename}"
    
    # Process the audio via Copilot Service
    note = await process_audio_note(db, case_id, user_id, file_location)
    
    return {"message": "Investigation Note Saved Successfully", "note_id": note.id, "transcript": note.transcript}

@router.get("/timeline/{case_id}")
async def get_timeline(case_id: int, db: Session = Depends(get_db)):
    """
    Retrieves the timeline events for a specific case.
    """
    events = db.query(TimelineEvent).filter(TimelineEvent.case_id == case_id).order_by(TimelineEvent.event_time.desc()).all()
    return {"events": events}

@router.post("/query")
async def query_copilot(request: QueryRequest, db: Session = Depends(get_db)):
    """
    Endpoint for Voice or Text query. (Smart Recall)
    """
    response = await smart_recall_query(db, request.query, request.case_id)
    return response

@router.post("/summary/{case_id}")
async def get_case_summary(case_id: int, db: Session = Depends(get_db)):
    """
    Generates a summary for a specific case.
    """
    report = await generate_case_summary(db, case_id)
    return {"summary": report.content, "report_id": report.id}

@router.post("/briefing")
async def get_daily_briefing(db: Session = Depends(get_db)):
    """
    Generates a daily investigation briefing.
    """
    report = await generate_daily_briefing(db)
    # In a real app, generate PDF bytes here.
    return {"briefing": report.content, "report_id": report.id}
