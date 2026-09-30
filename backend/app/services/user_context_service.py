from app.database import supabase
from app.services.conversation_service import _get_authed_client


def get_user_context(user_id: str, token: str = None):
    client = _get_authed_client(token) if token else supabase

    # -------------------------
    # Profile
    # -------------------------

    profile_data = None

    try:
        profile_result = (
            client
            .table("profiles")
            .select("*")
            .eq("id", user_id)
            .maybe_single()
            .execute()
        )

        profile_data = profile_result.data

    except Exception as e:
        print(f"Failed to fetch profile: {e}")

    # -------------------------
    # Memories
    # -------------------------

    raw_memories = []

    try:
        memories_result = (
            client
            .table("memories")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .limit(20)
            .execute()
        )

        raw_memories = (
            memories_result.data
            if memories_result and memories_result.data
            else []
        )

    except Exception as e:
        print(f"Failed to fetch memories: {e}")

    # Extract memory text
    memory_strings = [
        memory.get("content")
        for memory in raw_memories
        if memory.get("content")
    ]

    # -------------------------
    # Preferences
    # -------------------------

    preferences = {}

    if profile_data and isinstance(profile_data, dict):
        preferences = profile_data.get("preferences") or {}

    # -------------------------
    # Tasks
    # -------------------------

    tasks = []

    try:
        tasks_result = (
            client
            .table("tasks")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .limit(50)
            .execute()
        )

        tasks = (
            tasks_result.data
            if tasks_result and tasks_result.data
            else []
        )

    except Exception as e:
        print(f"Failed to fetch tasks: {e}")

    # -------------------------
    # Behavior Logs
    # -------------------------

    behavior_logs = []

    try:
        behavior_result = (
            client
            .table("behavior_logs")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .limit(50)
            .execute()
        )

        behavior_logs = (
            behavior_result.data
            if behavior_result and behavior_result.data
            else []
        )

    except Exception as e:
        print(f"Failed to fetch behavior_logs: {e}")

    # -------------------------
    # Wellness Logs
    # -------------------------

    wellness_logs = []

    try:
        wellness_result = (
            client
            .table("wellness_logs")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .limit(50)
            .execute()
        )

        wellness_logs = (
            wellness_result.data
            if wellness_result and wellness_result.data
            else []
        )

    except Exception as e:
        print(f"Failed to fetch wellness_logs: {e}")

    # -------------------------
    # Emergency Contacts
    # -------------------------

    emergency_contacts = []

    try:
        contacts_result = (
            client
            .table("emergency_contacts")
            .select("*")
            .eq("user_id", user_id)
            .order("priority", desc=False)
            .execute()
        )

        emergency_contacts = (
            contacts_result.data
            if contacts_result and contacts_result.data
            else []
        )

    except Exception as e:
        print(f"Failed to fetch emergency_contacts: {e}")

    # -------------------------
    # Safety Config
    # -------------------------

    safety_config = {}

    try:
        safety_result = (
            client
            .table("safety_config")
            .select("*")
            .eq("user_id", user_id)
            .maybe_single()
            .execute()
        )

        safety_config = safety_result.data or {}

    except Exception as e:
        print(f"Failed to fetch safety_config: {e}")

    # -------------------------
    # Lifestyle Preferences
    # -------------------------

    lifestyle_preferences = []

    try:
        lifestyle_result = (
            client
            .table("lifestyle_preferences")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )

        lifestyle_preferences = (
            lifestyle_result.data
            if lifestyle_result and lifestyle_result.data
            else []
        )

    except Exception as e:
        print(f"Failed to fetch lifestyle_preferences: {e}")

    # -------------------------
    # Reminders (active only)
    # -------------------------

    reminders = []

    try:
        reminders_result = (
            client
            .table("reminders")
            .select("*")
            .eq("user_id", user_id)
            .eq("completed", False)
            .order("remind_at", desc=False)
            .limit(20)
            .execute()
        )

        reminders = (
            reminders_result.data
            if reminders_result and reminders_result.data
            else []
        )

    except Exception as e:
        print(f"Failed to fetch reminders: {e}")

    # -------------------------
    # Final unified context
    # -------------------------

    return {
        "profile": profile_data,

        "preferences": preferences,

        "memories": memory_strings,

        "raw_memories": raw_memories,

        "tasks": tasks,

        "assignments": [],

        "reminders": reminders,

        "study_goals": [],

        "habits": [],

        "routines": [],

        "behavior_logs": behavior_logs,

        "wellness_logs": wellness_logs,

        "emergency_contacts": emergency_contacts,

        "safety_config": safety_config,

        "lifestyle_preferences": lifestyle_preferences,
    }