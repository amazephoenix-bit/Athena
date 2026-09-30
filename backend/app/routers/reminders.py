from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials

from app.dependencies.auth import get_current_user, bearer_scheme
from app.services.reminder_service import (
    create_reminder,
    get_reminders,
    update_reminder,
    delete_reminder,
)

router = APIRouter(
    prefix="/reminders",
    tags=["Reminders"],
)


@router.post("")
def add_reminder(
    data: dict,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    title = data.get("title")
    remind_at = data.get("remind_at")

    if not title:
        raise HTTPException(
            status_code=422,
            detail="title is required",
        )
    if not remind_at:
        raise HTTPException(
            status_code=422,
            detail="remind_at (ISO-8601 datetime) is required",
        )

    return create_reminder(
        user_id=user.id,
        title=title,
        remind_at=remind_at,
        description=data.get("description"),
        token=credentials.credentials,
    )


@router.get("")
def list_reminders(
    include_completed: bool = False,
    limit: int = 20,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return get_reminders(
        user_id=user.id,
        token=credentials.credentials,
        limit=limit,
        include_completed=include_completed,
    )


@router.patch("/{reminder_id}")
def edit_reminder(
    reminder_id: str,
    data: dict,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return update_reminder(
        reminder_id=reminder_id,
        user_id=user.id,
        token=credentials.credentials,
        title=data.get("title"),
        description=data.get("description"),
        remind_at=data.get("remind_at"),
        completed=data.get("completed"),
    )


@router.delete("/{reminder_id}")
def remove_reminder(
    reminder_id: str,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return delete_reminder(
        reminder_id=reminder_id,
        user_id=user.id,
        token=credentials.credentials,
    )
