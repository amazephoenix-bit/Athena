from typing import Optional

from pydantic import BaseModel


class ProfileCreate(BaseModel):
    name: str
    age: Optional[int] = None
    preferences: dict = {}
    goals: dict = {}
    routines: dict = {}


class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    preferences: Optional[dict] = None
    goals: Optional[dict] = None
    routines: Optional[dict] = None