import os
import logging
from typing import List
from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from backend.models import ChatRequest, ChatResponse, UploadResponse, SearchRequest, SearchResult
from backend.database import init_db, store_chat_message, get_chat_history
from backend.rag import process_and_index_document, vector_search, load_initial_knowledge_base

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("dnyanx_backend")

app = FastAPI(
    title="DnyanX AI Backend API",
    description="FastAPI Backend for DnyanX Tech AI Assistant with RAG & Vector Search",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DNYANX_SYSTEM_PROMPT = """
You are "DnyanX AI", the official custom branded AI assistant for "DnyanX Tech" agency.

### Persona & Behavioral Guidelines:
1. Always start your response with a concise **TL;DR:** section for long answers.
2. Use bullet points and clear Markdown headers for maximum readability.
3. Be professional, innovative, and friendly.
4. Incorporate DnyanX Tech's business philosophy where appropriate:
   - "Value = Pain × People × Frequency"
   - "Sell the hole, not the drill machine"
   - "Trust = Value + Consistency + Authenticity"
5. **Pricing**: If asked about pricing, refer strictly to the fixed pricing matrix provided in context.
6. **Project Quotes**: If asked for a quote, ask clarifying questions (project type, scope, timeline, budget) before giving an estimated price range.
7. **Multilingual (Marathi & English)**: Reply in Marathi (मराठी) if the user asks in Marathi; otherwise reply in English.
8. Rely on the provided context retrieved from DnyanX Tech documentation to answer questions. If the context does not contain the answer, politely offer to connect them with the DnyanX Tech human team.
"""

@app.on_event("startup")
def startup_event():
    logger.info("Initializing DB schema & indexing initial knowledge base...")
    init_db()
    load_initial_knowledge_base("knowledge")

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "DnyanX AI Backend", "version": "1.0.0"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message content cannot be empty.")

    # 1. Save user message to memory
    store_chat_message(request.session_id, "user", request.message)

    # 2. Retrieve relevant context via RAG vector search
    rag_results = vector_search(request.message, top_k=3)
    context_text = "\n\n".join([f"--- Source: {r['source']} ---\n{r['content']}" for r in rag_results])
    sources_used = list(set([r["source"] for r in rag_results]))

    # 3. Retrieve conversation history
    history = get_chat_history(request.session_id, limit=6)
    formatted_history = []
    for msg in history:
        formatted_history.append({"role": msg["role"], "content": msg["content"]})

    # 4. Construct messages for OpenAI / LLM call
    messages = [
        {"role": "system", "content": DNYANX_SYSTEM_PROMPT},
        {"role": "system", "content": f"### Context from DnyanX Tech Knowledge Base:\n{context_text}"}
    ]
    messages.extend(formatted_history[:-1]) # past history
    messages.append({"role": "user", "content": request.message})

    # 5. Call LLM Engine (Gemini API or OpenAI API)
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    openai_api_key = os.getenv("OPENAI_API_KEY")
    ai_response_text = ""

    # Try Gemini API first if configured
    if gemini_api_key and gemini_api_key != "your_gemini_api_key_here":
        try:
            import google.generativeai as genai
            genai.configure(api_key=gemini_api_key)
            model = genai.GenerativeModel("gemini-1.5-flash")
            full_prompt = f"{DNYANX_SYSTEM_PROMPT}\n\n### Context from DnyanX Tech Knowledge Base:\n{context_text}\n\nUser Question: {request.message}"
            res = model.generate_content(full_prompt)
            if res and res.text:
                ai_response_text = res.text
        except Exception as e:
            logger.error(f"Gemini API call failed: {e}")

    # Fallback to OpenAI API if Gemini not used or failed
    if not ai_response_text and openai_api_key and openai_api_key != "your_openai_api_key_here":
        try:
            from openai import OpenAI
            client = OpenAI(api_key=openai_api_key)
            llm_res = client.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                temperature=0.7,
                max_tokens=800
            )
            ai_response_text = llm_res.choices[0].message.content
        except Exception as e:
            logger.error(f"OpenAI completion call failed: {e}")

    if not ai_response_text:
        # Fallback offline responder with context awareness for demonstration & local testing
        if "मराठी" in request.message or any(ord(c) >= 0x0900 and ord(c) <= 0x097F for c in request.message):
            ai_response_text = (
                "**TL;DR:** DnyanX Tech मध्ये तुमचे स्वागत आहे! आम्ही उत्तम AI आणि वेब सोल्यूशन्स देतो.\n\n"
                "• **आमच्या सेवा**: Custom AI Chatbots, Full-Stack Next.js Apps, Enterprise RAG Pipeline.\n"
                "• **मूल्य तत्त्वज्ञान**: Value = Pain × People × Frequency.\n"
                "• **कोटेशन**: तुमच्या प्रोजेक्टचे स्वरूप, टाइमलाइन आणि बजेट सांगा म्हणजे मी अचूक कोट देईन."
            )
        else:
            ai_response_text = (
                "**TL;DR:** Welcome to DnyanX Tech! I am your AI assistant ready to help with project quotes, technical advice, and services.\n\n"
                "• **Core Services**: Custom AI Assistants, Next.js Full-Stack Apps, and Enterprise RAG Systems.\n"
                "• **Starter Pricing**: Packages start from $1,500 for RAG Chatbots.\n"
                "• **Our Philosophy**: *Value = Pain × People × Frequency* & *Sell the hole, not the drill machine*.\n\n"
                "How can DnyanX Tech assist your project today?"
            )


    # 6. Save assistant response to DB/memory
    store_chat_message(request.session_id, "assistant", ai_response_text)

    return ChatResponse(
        response=ai_response_text,
        sources=sources_used,
        session_id=request.session_id
    )

@app.post("/api/upload", response_model=UploadResponse)
async def upload_document(file: UploadFile = File(...)):
    if not file.filename.endswith(('.md', '.txt', '.pdf')):
        raise HTTPException(status_code=400, detail="Only Markdown (.md), Text (.txt), or PDF (.pdf) files are supported.")

    try:
        content = ""
        if file.filename.endswith('.pdf'):
            import PyPDF2
            pdf_reader = PyPDF2.PdfReader(file.file)
            for page in pdf_reader.pages:
                text = page.extract_text()
                if text:
                    content += text + "\n"
        else:
            raw_bytes = await file.read()
            content = raw_bytes.decode("utf-8")

        chunks_created = process_and_index_document(content, file.filename)
        return UploadResponse(
            filename=file.filename,
            chunks_created=chunks_created,
            status="success",
            message=f"Successfully chunked and indexed {chunks_created} chunks into pgvector knowledge base."
        )
    except Exception as e:
        logger.error(f"Error processing file upload: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process file: {str(e)}")

@app.post("/api/search", response_model=List[SearchResult])
def search_knowledge_base(request: SearchRequest):
    results = vector_search(request.query, top_k=request.top_k)
    return [SearchResult(content=r["content"], source=r["source"], similarity=r["similarity"]) for r in results]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
