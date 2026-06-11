# Forecast router placeholder
from fastapi import APIRouter

router = APIRouter(
    prefix="/forecast",
    tags=["forecast"],
)

@router.get("/")
async def get_forecasts():
    return {"forecasts": []}
