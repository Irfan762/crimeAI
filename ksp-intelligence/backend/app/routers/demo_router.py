from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime, timedelta

router = APIRouter(prefix="/demo", tags=["Hackathon Demo"])

@router.get("/workflow")
async def get_demo_workflow():
    """
    Returns the complete mocked dataset to run the 3-minute hackathon demo workflow.
    Fulfills: Voice Copilot, Timeline, Network Intel, Summaries, Explainable AI, Hotspots, Sociological Insights.
    """
    base_time = datetime.now()
    
    return {
        "status": "success",
        "demo_data": {
            "voice_copilot": {
                "transcript": "Officer note: The suspect arrived on a white scooter and was seen wearing a black jacket. Known to frequent the MG Road area.",
                "extracted_entities": [
                    {"entity": "White Scooter", "type": "Vehicle", "confidence": 0.95},
                    {"entity": "Black Jacket", "type": "Clothing", "confidence": 0.88},
                    {"entity": "MG Road", "type": "Location", "confidence": 0.92}
                ],
                "ai_response": "I have saved this note and updated the investigation memory. The white scooter has been cross-referenced with recent traffic violations on MG Road."
            },
            "timeline": [
                {"time": (base_time - timedelta(hours=3)).strftime("%I:%M %p"), "event": "Victim Statement Recorded", "type": "statement", "icon": "user"},
                {"time": (base_time - timedelta(hours=1.5)).strftime("%I:%M %p"), "event": "CCTV Evidence Uploaded - White Scooter spotted", "type": "evidence", "icon": "video"},
                {"time": base_time.strftime("%I:%M %p"), "event": "Suspect Identified via Voice Investigation Copilot", "type": "ai_insight", "icon": "bot"}
            ],
            "network_intelligence": {
                "nodes": [
                    {"id": "Suspect A", "group": "suspect"},
                    {"id": "Gang X", "group": "gang"},
                    {"id": "Vehicle Y (White Scooter)", "group": "vehicle"},
                    {"id": "Phone Z", "group": "phone"}
                ],
                "links": [
                    {"source": "Suspect A", "target": "Vehicle Y (White Scooter)", "label": "owns"},
                    {"source": "Vehicle Y (White Scooter)", "target": "Gang X", "label": "used by"},
                    {"source": "Suspect A", "target": "Phone Z", "label": "registered to"}
                ],
                "ai_explanation": "Explainable AI Insight: Suspect A is indirectly linked to Gang X. The white scooter (Vehicle Y) mentioned in the voice note has been identified in 3 previous FIRs associated with Gang X."
            },
            "crime_forecast": {
                "hotspot": "MG Road / Brigade Road Junction",
                "risk_level": "High (87% Probability)",
                "prediction": "Emerging gang activity zone for two-wheeler theft.",
                "explainable_reasoning": [
                    "3 related incidents in past 7 days.",
                    "Suspect network movement detected via cellular ping (Phone Z).",
                    "Temporal pattern: 80% of thefts occur between 6 PM - 9 PM."
                ]
            },
            "sociological_insights": {
                "demographic_risk": "Males 18-25, recent migrants seeking informal employment.",
                "economic_stress_factor": "High. Correlates with recent factory closures in surrounding districts.",
                "policy_recommendation": "Increase community policing and youth engagement programs in adjacent residential wards."
            },
            "case_summary": {
                "title": "Investigation Summary: Case #1042",
                "content": "A suspect wearing a black jacket and operating a white scooter has been identified. Network analysis links the suspect to Gang X. Predictive models indicate a high risk of repeat offenses at MG Road tonight.",
                "export_ready": True
            }
        }
    }
