from app.database import supabase
from app.services.conversation_service import _get_authed_client


class Data:
    """A simple memory record model with persistence helpers."""

    def __init__(self, user_id: str, memory: str, memory_type: str = "preference", record_id: str | None = None):
        self.user_id = user_id
        self.memory = memory
        self.memory_type = memory_type
        self.record_id = record_id

    def to_dict(self):
        payload = {
            "user_id": self.user_id,
            "content": self.memory,
            "memory_type": self.memory_type,
        }
        if self.record_id is not None:
            payload["id"] = self.record_id
        return payload

    @classmethod
    def from_dict(cls, payload: dict):
        if not isinstance(payload, dict):
            raise TypeError("payload must be a dictionary")

        return cls(
            user_id=payload.get("user_id"),
            memory=payload.get("content", payload.get("memory", "")),
            memory_type=payload.get("memory_type", "preference"),
            record_id=payload.get("id"),
        )

    def save(self, token: str = None):
        client = _get_authed_client(token) if token else supabase
        result = (
            client
            .table("memories")
            .insert(self.to_dict())
            .execute()
        )

        if not result.data:
            return None

        first_record = result.data[0]
        self.record_id = first_record.get("id")
        self.user_id = first_record.get("user_id", self.user_id)
        self.memory = first_record.get("content", self.memory)
        self.memory_type = first_record.get("memory_type", self.memory_type)
        return first_record


def save_memory(user_id: str, memory: str, token: str = None, memory_type: str = "preference"):
    client = _get_authed_client(token) if token else supabase
    result = (
        client
        .table("memories")
        .insert({
            "user_id": user_id,
            "content": memory,
            "memory_type": memory_type,
        })
        .execute()
    )

    return result.data