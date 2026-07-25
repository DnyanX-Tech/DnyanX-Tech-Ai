import os
import math
import logging
from typing import List, Dict, Any
from dotenv import load_dotenv
from backend.database import save_document_chunk, in_memory_vector_store, DATABASE_URL

load_dotenv()
logger = logging.getLogger("dnyanx_rag")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def chunk_text(text: str, chunk_size: int = 500, overlap: int = 100) -> List[str]:
    """Splits text into chunks of specified character length with overlap."""
    if not text:
        return []
    chunks = []
    start = 0
    text_length = len(text)

    while start < text_length:
        end = min(start + chunk_size, text_length)
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        start += (chunk_size - overlap)
    return chunks

def generate_embedding(text: str) -> List[float]:
    """Generates embeddings using OpenAI API or fallback deterministic hash/vector representation."""
    if OPENAI_API_KEY and OPENAI_API_KEY != "your_openai_api_key_here":
        try:
            from openai import OpenAI
            client = OpenAI(api_key=OPENAI_API_KEY)
            response = client.embeddings.create(
                model="text-embedding-3-small",
                input=text
            )
            return response.data[0].embedding
        except Exception as e:
            logger.warning(f"OpenAI embedding call failed: {e}. Using local encoder fallback.")

    # Fallback pseudo-embedding generator (1536 dim vector for local offline testing)
    import hashlib
    vec = [0.0] * 1536
    hash_bytes = hashlib.sha256(text.encode("utf-8")).digest()
    for i in range(1536):
        vec[i] = (hash_bytes[i % len(hash_bytes)] / 255.0) * 2 - 1
    return vec

def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    norm_a = math.sqrt(sum(a * a for a in vec1))
    norm_b = math.sqrt(sum(b * b for b in vec2))
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return dot_product / (norm_a * norm_b)

def process_and_index_document(content: str, source_filename: str) -> int:
    """Chunks, embeds, and saves document into vector store."""
    chunks = chunk_text(content, chunk_size=500, overlap=100)
    for chunk in chunks:
        embedding = generate_embedding(chunk)
        save_document_chunk(chunk, source_filename, embedding)
    logger.info(f"Indexed {len(chunks)} chunks from {source_filename}")
    return len(chunks)

def vector_search(query: str, top_k: int = 3) -> List[Dict[str, Any]]:
    """Retrieves top-k most relevant chunks using vector similarity."""
    query_embedding = generate_embedding(query)

    if DATABASE_URL:
        try:
            import psycopg2
            conn = psycopg2.connect(DATABASE_URL)
            cur = conn.cursor()
            cur.execute("""
                SELECT content, source, 1 - (embedding <=> %s::vector) AS similarity
                FROM document_embeddings
                ORDER BY embedding <=> %s::vector
                LIMIT %s;
            """, (str(query_embedding), str(query_embedding), top_k))
            rows = cur.fetchall()
            cur.close()
            conn.close()
            return [{"content": r[0], "source": r[1], "similarity": float(r[2])} for r in rows]
        except Exception as e:
            logger.error(f"DB vector search failed: {e}. Falling back to in-memory search.")

    # Search in-memory store
    results = []
    for item in in_memory_vector_store:
        sim = cosine_similarity(query_embedding, item["embedding"])
        results.append({
            "content": item["content"],
            "source": item["source"],
            "similarity": sim
        })

    results.sort(key=lambda x: x["similarity"], reverse=True)
    return results[:top_k]

def load_initial_knowledge_base(knowledge_dir: str = "knowledge"):
    """Reads initial markdown files from knowledge/ directory and indexes them."""
    if not os.path.exists(knowledge_dir):
        logger.warning(f"Knowledge directory '{knowledge_dir}' not found.")
        return

    for fname in os.listdir(knowledge_dir):
        if fname.endswith(".md") or fname.endswith(".txt"):
            filepath = os.path.join(knowledge_dir, fname)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    text = f.read()
                    process_and_index_document(text, fname)
            except Exception as e:
                logger.error(f"Error loading initial knowledge file {fname}: {e}")
