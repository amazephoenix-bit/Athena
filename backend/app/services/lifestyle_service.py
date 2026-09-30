from app.database import supabase
from app.services.conversation_service import _get_authed_client


def create_lifestyle_preference(
    user_id: str,
    category: str,
    key: str,
    value: str = None,
    token: str = None,
):
    data = {
        "user_id": user_id,
        "category": category,
        "key": key,
        "value": value,
    }

    client = _get_authed_client(token) if token else supabase
    response = client.table("lifestyle_preferences").insert(data).execute()
    return response.data


def get_lifestyle_preferences(
    user_id: str,
    category: str = None,
    token: str = None,
):
    client = _get_authed_client(token) if token else supabase
    query = (
        client
        .table("lifestyle_preferences")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
    )

    if category:
        query = query.eq("category", category)

    response = query.execute()
    return response.data or []


def update_lifestyle_preference(
    pref_id: str,
    user_id: str,
    updates: dict,
    token: str = None,
):
    safe_updates = {
        k: v for k, v in updates.items()
        if k not in ["id", "user_id", "created_at"]
    }

    client = _get_authed_client(token) if token else supabase
    response = (
        client
        .table("lifestyle_preferences")
        .update(safe_updates)
        .eq("id", pref_id)
        .eq("user_id", user_id)
        .execute()
    )
    return response.data


def delete_lifestyle_preference(
    pref_id: str,
    user_id: str,
    token: str = None,
):
    client = _get_authed_client(token) if token else supabase
    response = (
        client
        .table("lifestyle_preferences")
        .delete()
        .eq("id", pref_id)
        .eq("user_id", user_id)
        .execute()
    )
    return response.data
