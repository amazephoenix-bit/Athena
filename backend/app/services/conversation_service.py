from app.database import supabase
from supabase import create_client
from app.config import SUPABASE_URL, SUPABASE_KEY


def _get_authed_client(token: str):
    """Create a Supabase client that acts as the authenticated user."""
    client = create_client(SUPABASE_URL, SUPABASE_KEY)
    client.postgrest.auth(token)
    return client


def save_message(
    user_id: str,
    role: str,
    message: str,
    token: str = None,
    metadata: dict | None = None,
):
    data = {
        "user_id": user_id,
        "role": role,
        "message": message,
        "metadata": metadata or {},
    }

    client = _get_authed_client(token) if token else supabase
    response = client.table("conversations").insert(data).execute()
    return response.data


def get_conversation_history(user_id: str, limit: int = 20, token: str = None):
    client = _get_authed_client(token) if token else supabase
    response = (
        client.table("conversations")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .limit(limit)
        .execute()
    )
    return response.data
