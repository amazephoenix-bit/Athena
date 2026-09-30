from app.database import supabase


def get_user_context(user_id: str):

    profile_result = (
        supabase
        .table("profiles")
        .select("*")
        .eq("id", user_id)
        .maybe_single()
        .execute()
    )

    memories_result = (
        supabase
        .table("memories")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .limit(20)
        .execute()
    )

    return {
        "profile": profile_result.data if profile_result else None,
        "memories": memories_result.data if memories_result else []
    }