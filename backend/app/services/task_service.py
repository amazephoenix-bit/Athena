from app.database import supabase
from app.services.conversation_service import _get_authed_client


def create_task(
    user_id: str,
    title: str,
    description: str = None,
    due_at: str = None,
    token: str = None,
):
    data = {
        "user_id": user_id,
        "title": title,
        "description": description,
        "due_at": due_at,
        "status": "pending",
    }

    client = _get_authed_client(token) if token else supabase
    response = client.table("tasks").insert(data).execute()

    return response.data


def get_tasks(user_id: str, token: str = None):
    client = _get_authed_client(token) if token else supabase
    response = (
        client
        .table("tasks")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .execute()
    )

    return response.data


def update_task(
    task_id: str,
    user_id: str,
    updates: dict,
    token: str = None,
):
    client = _get_authed_client(token) if token else supabase
    response = (
        client
        .table("tasks")
        .update(updates)
        .eq("id", task_id)
        .eq("user_id", user_id)
        .execute()
    )

    return response.data


def delete_task(
    task_id: str,
    user_id: str,
    token: str = None,
):
    client = _get_authed_client(token) if token else supabase
    response = (
        client
        .table("tasks")
        .delete()
        .eq("id", task_id)
        .eq("user_id", user_id)
        .execute()
    )

    return response.data