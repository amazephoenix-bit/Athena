from app.database import supabase

def save_message(
        user_id:str,
        role:str,
        message:str,
        metadata:dict|None=None
):
    data = {
        "user_id": user_id,
        "role": role,
        "message": message,
        "metadata": metadata or{}
    }

    response = (
        supabase
        .table("conversations")
        .insert(data)
        .execute()
    )
    return response.data

def get_conversation_history(
        user_id:str,
        limit:int=20
):
    response = (
        supabase
        .table("conversations")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .limit(limit)
        .execute()
    )
    return response.data
