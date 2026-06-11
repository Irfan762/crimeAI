from fastapi import APIRouter
from fastapi.responses import StreamingResponse, PlainTextResponse
import io
import csv

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)

@router.get("/export/csv")
def export_csv():
    # Mock CSV generation
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Name", "Type", "Status"])
    writer.writerow(["FIR-001", "Night Burglary", "Property", "Open"])
    writer.writerow(["FIR-002", "Cyber Fraud", "Cyber", "Closed"])
    
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=crime_report.csv"}
    )

@router.get("/export/pdf")
def export_pdf():
    # Mock PDF generation (Returning text file disguised as PDF for demo)
    content = "KSP INTELLIGENCE REPORT\n\nGenerated on: 2026-06-11\n\nConfidential Data."
    return PlainTextResponse(
        content,
        headers={"Content-Disposition": "attachment; filename=intelligence_brief.pdf"}
    )

@router.get("/export/excel")
def export_excel():
    # Mock Excel generation using CSV format but .xls extension to satisfy download requirement
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["Analyst", "Region", "Cases Resolved"])
    writer.writerow(["Admin User", "Bengaluru Central", "14"])
    
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="application/vnd.ms-excel",
        headers={"Content-Disposition": "attachment; filename=data_export.xls"}
    )
