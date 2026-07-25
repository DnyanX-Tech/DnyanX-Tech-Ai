import os
import logging
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("dnyanx_db")

DATABASE_URL = os.getenv("DATABASE_URL")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Local fallback in-memory store for RAG chunks and chat sessions when DB connection is not configured
in_memory_vector_store: List[Dict[str, Any]] = []
in_memory_chat_history: Dict[str, List[Dict[str, str]]] = {}

def is_db_available() -> bool:
    return bool(DATABASE_URL or (SUPABASE_URL and SUPABASE_KEY))

def init_db():
    """Initializes pgvector extension and table in PostgreSQL if DATABASE_URL is available."""
    if not DATABASE_URL:
        logger.info("DATABASE_URL not set. Operating with in-memory fallback store.")
        return

    try:
        import psycopg2
        from pgvector.psycopg2 import register_vector

        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
        cur.execute("""
            CREATE TABLE IF NOT EXISTS document_embeddings (
                id SERIAL PRIMARY KEY,
                content TEXT NOT NULL,
                source VARCHAR(255),
                embedding vector(1536),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        cur.execute("""
            CREATE TABLE IF NOT EXISTS chat_messages (
                id SERIAL PRIMARY KEY,
                session_id VARCHAR(255) NOT NULL,
                role VARCHAR(50) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        conn.commit()
        cur.close()
        conn.close()
        logger.info("Database schema & pgvector extension initialized successfully.")
    except Exception as e:
        logger.warning(f"Could not initialize PostgreSQL database: {e}. Falling back to in-memory store.")

def save_document_chunk(content: str, source: str, embedding: List[float]):
    if DATABASE_URL:
        try:
            import psycopg2
            conn = psycopg2.connect(DATABASE_URL)
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO document_embeddings (content, source, embedding) VALUES (%s, %s, %s);",
                (content, source, str(embedding))
            )
            conn.commit()
            cur.close()
            conn.close()
            return
        except Exception as e:
            logger.error(f"Error saving chunk to DB: {e}")

    # Fallback to in-memory store
    in_memory_vector_store.append({
        "content": content,
        "source": source,
        "embedding": embedding
    })

def store_chat_message(session_id: str, role: str, content: str):
    if DATABASE_URL:
        try:
            import psycopg2
            conn = psycopg2.connect(DATABASE_URL)
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO chat_messages (session_id, role, content) VALUES (%s, %s, %s);",
                (session_id, role, content)
            )
            conn.commit()
            cur.close()
            conn.close()
            return
        except Exception as e:
            logger.error(f"Error storing chat message: {e}")

    if session_id not in in_memory_chat_history:
        in_memory_chat_history[session_id] = []
    in_memory_chat_history[session_id].append({"role": role, "content": content})

def get_chat_history(session_id: str, limit: int = 10) -> List[Dict[str, str]]:
    if DATABASE_URL:
        try:
            import psycopg2
            conn = psycopg2.connect(DATABASE_URL)
            cur = conn.cursor()
            cur.execute(
                "SELECT role, content FROM chat_messages WHERE session_id = %s ORDER BY id DESC LIMIT %s;",
                (session_id, limit)
            )
            rows = cur.fetchall()
            cur.close()
            conn.close()
            return [{"role": r[0], "content": r[1]} for r in reversed(rows)]
        except Exception as e:
            logger.error(f"Error fetching chat history from DB: {e}")

    return in_memory_chat_history.get(session_id, [])[-limit:]
