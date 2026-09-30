from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials

from app.dependencies.auth import get_current_user, bearer_scheme
from app.services.wellness_service import (
    create_wellness_log,
    get_wellness_logs,
    update_wellness_log,
    delete_wellness_log,
)

router = APIRouter(
    prefix="/wellness",
    tags=["Wellness"],
)


@router.post("")
def add_wellness_log(
    data: dict,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    category = data.get("category")
    if not category:
        raise HTTPException(
            status_code=422,
            detail="category is required",
        )

    return create_wellness_log(
        user_id=user.id,
        category=category,
        value=data.get("value"),
        unit=data.get("unit"),
        notes=data.get("notes"),
        token=credentials.credentials,
    )


@router.get("")
def list_wellness_logs(
    category: str = None,
    limit: int = 50,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return get_wellness_logs(
        user_id=user.id,
        limit=limit,
        category=category,
        token=credentials.credentials,
    )


@router.patch("/{log_id}")
def edit_wellness_log(
    log_id: str,
    data: dict,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return update_wellness_log(
        log_id=log_id,
        user_id=user.id,
        updates=data,
        token=credentials.credentials,
    )


@router.delete("/{log_id}")
def remove_wellness_log(
    log_id: str,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return delete_wellness_log(
        log_id=log_id,
        user_id=user.id,
        token=credentials.credentials,
    )
