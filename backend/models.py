from pydantic import BaseModel, Field
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str = Field(..., description="Role of the message sender: 'user' or 'assistant'")
    content: str = Field(..., description="Content of the message")

class ChatRequest(BaseModel):
    message: str = Field(..., description="User message query")
    session_id: Optional[str] = Field(default="default_session", description="Session ID for chat history memory")
    history: Optional[List[ChatMessage]] = Field(default=[], description="Previous conversation history")

class ChatResponse(BaseModel):
    response: str = Field(..., description="AI response text")
    sources: List[str] = Field(default=[], description="Source document chunks used for context")
    session_id: str

class UploadResponse(BaseModel):
    filename: str
    chunks_created: int
    status: str
    message: str

class SearchRequest(BaseModel):
    query: str
    top_k: int = 3

class SearchResult(BaseModel):
    content: str
    source: str
    similarity: float
