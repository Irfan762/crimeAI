# Network analysis router
from fastapi import APIRouter
from typing import Dict, Any

router = APIRouter(
    prefix="/network",
    tags=["network"],
)

@router.get("/graph/{case_id}")
def get_network_graph(case_id: int):
    # Mock Neo4j Graph Data formatted for Cytoscape.js
    return {
        "nodes": [
            {"data": {"id": "c1", "label": "Case 101", "type": "case"}},
            {"data": {"id": "p1", "label": "Ravi Kumar (Seena)", "type": "criminal", "risk": "high"}},
            {"data": {"id": "p2", "label": "Kiran", "type": "criminal", "risk": "medium"}},
            {"data": {"id": "l1", "label": "Koramangala 4th Block", "type": "location"}},
            {"data": {"id": "v1", "label": "Stolen Honda City", "type": "vehicle"}}
        ],
        "edges": [
            {"data": {"source": "p1", "target": "c1", "label": "SUSPECT_IN"}},
            {"data": {"source": "p2", "target": "c1", "label": "ACCOMPLICE_IN"}},
            {"data": {"source": "c1", "target": "l1", "label": "OCCURRED_AT"}},
            {"data": {"source": "p1", "target": "v1", "label": "SPOTTED_IN"}},
            {"data": {"source": "p1", "target": "p2", "label": "KNOWN_ASSOCIATE"}}
        ]
    }
