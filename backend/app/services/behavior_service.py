from app.database import supabase
from app.services.conversation_service import _get_authed_client


def create_behavior_log(
    user_id: str,
    behavior_type: str,
    value: str = None,
    metadata: dict = None,
    token: str = None,
):
    data = {
        "user_id": user_id,
        "behavior_type": behavior_type,
        "value": value,
        "metadata": metadata or {},
    }

    client = _get_authed_client(token) if token else supabase
    response = client.table("behavior_logs").insert(data).execute()
    return response.data


def get_behavior_logs(
    user_id: str,
    limit: int = 50,
    behavior_type: str = None,
    token: str = None,
):
    client = _get_authed_client(token) if token else supabase
    query = (
        client
        .table("behavior_logs")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .limit(limit)
    )

    if behavior_type:
        query = query.eq("behavior_type", behavior_type)

    response = query.execute()
    return response.data or []


def update_behavior_log(
    log_id: str,
    user_id: str,
    updates: dict,
    token: str = None,
):
    # Prevent tampering with primary key or user ownership
    safe_updates = {
        k: v for k, v in updates.items()
        if k not in ["id", "user_id", "created_at"]
    }

    client = _get_authed_client(token) if token else supabase
    response = (
        client
        .table("behavior_logs")
        .update(safe_updates)
        .eq("id", log_id)
        .eq("user_id", user_id)
        .execute()
    )
    return response.data


def delete_behavior_log(
    log_id: str,
    user_id: str,
    token: str = None,
):
    client = _get_authed_client(token) if token else supabase
    response = (
        client
        .table("behavior_logs")
        .delete()
        .eq("id", log_id)
        .eq("user_id", user_id)
        .execute()
    )
    return response.data
