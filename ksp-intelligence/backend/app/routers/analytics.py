# Analytics router
from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(
    prefix="/analytics",
    tags=["analytics"],
)

@router.get("/trends")
def get_crime_trends():
    return {
        "months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "data": [120, 150, 130, 180, 200, 170]
    }

@router.get("/districts")
def get_district_stats():
    return [
        {"district": "Bengaluru Central", "crimes": 450},
        {"district": "Bengaluru South", "crimes": 320},
        {"district": "Mysuru City", "crimes": 210},
        {"district": "Mangaluru", "crimes": 180}
    ]

@router.get("/categories")
def get_category_analysis():
    return [
        {"category": "Property Crime", "percentage": 45},
        {"category": "Violent Crime", "percentage": 25},
        {"category": "Cyber Crime", "percentage": 20},
        {"category": "Financial Fraud", "percentage": 10}
    ]

@router.get("/hotspots")
def get_hotspots():
    return [
        {"lat": 12.9279, "lng": 77.6271, "intensity": 0.9, "label": "Koramangala"},
        {"lat": 12.9716, "lng": 77.5946, "intensity": 0.8, "label": "Majestic"},
        {"lat": 12.9121, "lng": 77.6446, "intensity": 0.7, "label": "HSR Layout"}
    ]
