# Chat router
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import List, Dict, Any

try:
    from langchain.prompts import PromptTemplate
    from langchain.schema.runnable import RunnableLambda
    from langchain.memory import ConversationBufferMemory
except ImportError:
    pass

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
)

class ChatRequest(BaseModel):
    query: str
    session_id: str
    history: List[Dict[str, str]] = []

# Global memory store for demo purposes
session_memories = {}

@router.post("/")
async def chat_interaction(request: ChatRequest):
    query = request.query.lower()
    
    # LangChain Implementation
    prompt = PromptTemplate(
        input_variables=["history", "input"],
        template="You are a KSP Crime Intelligence AI.\nHistory: {history}\nUser: {input}\nAI:"
    )
    
    if request.session_id not in session_memories:
        session_memories[request.session_id] = ConversationBufferMemory()
    
    memory = session_memories[request.session_id]
    memory.chat_memory.add_user_message(query)
    
    # Define a simple chain using RunnableLambda as a Mock LLM for the hackathon demo
    def mock_llm_response(prompt_text: str) -> str:
        if "burglary" in prompt_text and "koramangala" in prompt_text:
            return "Based on the SQLite DB, there are 14 reported burglary cases in Koramangala over the past 6 months."
        elif "seena" in prompt_text:
            return "Alias 'Seena' (Ravi Kumar, ID: KSP-CR-9842) is a High-Risk Offender in Gang G-84."
        elif "predict" in prompt_text:
            return "Crime forecast models indicate an 18% projected increase in vehicle thefts."
        return "I have analyzed your query against the SQLite database."

    chain = prompt | RunnableLambda(mock_llm_response)
    
    response = chain.invoke({
        "history": memory.buffer,
        "input": query
    })
    
    memory.chat_memory.add_ai_message(response)
    
    return {
        "reply": response,
        "session_id": request.session_id,
        "confidence_score": 0.89,
        "evidence_links": ["FIR/2026/041", "KSP-CR-9842"]
    }
