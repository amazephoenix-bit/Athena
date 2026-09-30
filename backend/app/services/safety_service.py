from app.database import supabase
from app.services.conversation_service import _get_authed_client


# ---------------------------------------------------------
# EMERGENCY CONTACTS
# ---------------------------------------------------------

def create_emergency_contact(
    user_id: str,
    name: str,
    phone: str,
    relationship: str = None,
    priority: int = 1,
    token: str = None,
):
    data = {
        "user_id": user_id,
        "name": name,
        "phone": phone,
        "relationship": relationship,
        "priority": priority,
    }

    client = _get_authed_client(token) if token else supabase
    response = client.table("emergency_contacts").insert(data).execute()
    return response.data


def get_emergency_contacts(
    user_id: str,
    token: str = None,
):
    client = _get_authed_client(token) if token else supabase
    response = (
        client
        .table("emergency_contacts")
        .select("*")
        .eq("user_id", user_id)
        .order("priority", desc=False)
        .execute()
    )
    return response.data or []


def update_emergency_contact(
    contact_id: str,
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
        .table("emergency_contacts")
        .update(safe_updates)
        .eq("id", contact_id)
        .eq("user_id", user_id)
        .execute()
    )
    return response.data


def delete_emergency_contact(
    contact_id: str,
    user_id: str,
    token: str = None,
):
    client = _get_authed_client(token) if token else supabase
    response = (
        client
        .table("emergency_contacts")
        .delete()
        .eq("id", contact_id)
        .eq("user_id", user_id)
        .execute()
    )
    return response.data


# ---------------------------------------------------------
# SAFETY CONFIGURATION
# ---------------------------------------------------------

def get_safety_config(
    user_id: str,
    token: str = None,
):
    client = _get_authed_client(token) if token else supabase
    response = (
        client
        .table("safety_config")
        .select("*")
        .eq("user_id", user_id)
        .maybe_single()
        .execute()
    )
    return response.data or {}


def update_safety_config(
    user_id: str,
    updates: dict,
    token: str = None,
):
    safe_updates = {
        k: v for k, v in updates.items()
        if k not in ["id", "user_id", "created_at"]
    }

    client = _get_authed_client(token) if token else supabase

    # Check if a config row already exists for this user
    existing = (
        client
        .table("safety_config")
        .select("id")
        .eq("user_id", user_id)
        .maybe_single()
        .execute()
    )

    if existing.data:
        # Update the existing row
        safe_updates["updated_at"] = "now()"
        response = (
            client
            .table("safety_config")
            .update(safe_updates)
            .eq("user_id", user_id)
            .execute()
        )
    else:
        # Insert a new row
        insert_data = {"user_id": user_id, **safe_updates}
        response = (
            client
            .table("safety_config")
            .insert(insert_data)
            .execute()
        )

    return response.data
