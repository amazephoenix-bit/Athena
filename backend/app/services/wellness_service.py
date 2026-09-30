from app.database import supabase
from app.services.conversation_service import _get_authed_client


def create_wellness_log(
    user_id: str,
    category: str,
    value: str = None,
    unit: str = None,
    notes: str = None,
    token: str = None,
):
    data = {
        "user_id": user_id,
        "category": category,
        "value": value,
        "unit": unit,
        "notes": notes,
    }

    client = _get_authed_client(token) if token else supabase
    response = client.table("wellness_logs").insert(data).execute()
    return response.data


def get_wellness_logs(
    user_id: str,
    limit: int = 50,
    category: str = None,
    token: str = None,
):
    client = _get_authed_client(token) if token else supabase
    query = (
        client
        .table("wellness_logs")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .limit(limit)
    )

    if category:
        query = query.eq("category", category)

    response = query.execute()
    return response.data or []


def update_wellness_log(
    log_id: str,
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
        .table("wellness_logs")
        .update(safe_updates)
        .eq("id", log_id)
        .eq("user_id", user_id)
        .execute()
    )
    return response.data


def delete_wellness_log(
    log_id: str,
    user_id: str,
    token: str = None,
):
    client = _get_authed_client(token) if token else supabase
    response = (
        client
        .table("wellness_logs")
        .delete()
        .eq("id", log_id)
        .eq("user_id", user_id)
        .execute()
    )
    return response.data
