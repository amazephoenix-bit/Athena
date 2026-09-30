from app.database import supabase
from app.services.conversation_service import _get_authed_client


def create_reminder(
    user_id: str,
    title: str,
    remind_at: str,
    description: str = None,
    token: str = None,
):
    """
    Insert a new reminder row for the authenticated user.

    `remind_at` must be an ISO-8601 datetime string that
    PostgreSQL can cast to timestamptz (e.g. "2026-10-05T08:00:00+05:30").
    """
    data = {
        "user_id": user_id,
        "title": title,
        "description": description,
        "remind_at": remind_at,
        "completed": False,
    }

    client = _get_authed_client(token) if token else supabase
    response = client.table("reminders").insert(data).execute()
    return response.data


def get_reminders(
    user_id: str,
    token: str = None,
    limit: int = 20,
    include_completed: bool = False,
):
    """
    Return the user's reminders, ordered by remind_at ascending.
    By default only incomplete (active) reminders are returned.
    """
    client = _get_authed_client(token) if token else supabase

    query = (
        client
        .table("reminders")
        .select("*")
        .eq("user_id", user_id)
        .order("remind_at", desc=False)
        .limit(limit)
    )

    if not include_completed:
        query = query.eq("completed", False)

    response = query.execute()
    return response.data or []


def update_reminder(
    reminder_id: str,
    user_id: str,
    token: str = None,
    title: str = None,
    description: str = None,
    remind_at: str = None,
    completed: bool = None,
):
    """
    Partially update a reminder that belongs to user_id.
    Only non-None fields are applied.
    """
    updates = {}

    if title is not None:
        updates["title"] = title
    if description is not None:
        updates["description"] = description
    if remind_at is not None:
        updates["remind_at"] = remind_at
    if completed is not None:
        updates["completed"] = completed

    if not updates:
        return None

    client = _get_authed_client(token) if token else supabase
    response = (
        client
        .table("reminders")
        .update(updates)
        .eq("id", reminder_id)
        .eq("user_id", user_id)  # RLS double-check at query level
        .execute()
    )
    return response.data


def delete_reminder(
    reminder_id: str,
    user_id: str,
    token: str = None,
):
    """
    Delete a reminder that belongs to user_id.
    The double .eq("user_id", ...) ensures a user can never
    delete another user's row even if RLS is misconfigured.
    """
    client = _get_authed_client(token) if token else supabase
    response = (
        client
        .table("reminders")
        .delete()
        .eq("id", reminder_id)
        .eq("user_id", user_id)
        .execute()
    )
    return response.data
