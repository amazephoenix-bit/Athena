from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials

from app.dependencies.auth import get_current_user, bearer_scheme
from app.services.behavior_service import (
    create_behavior_log,
    get_behavior_logs,
    update_behavior_log,
    delete_behavior_log,
)

router = APIRouter(
    prefix="/behavior",
    tags=["Behavior"],
)


@router.post("")
def add_behavior_log(
    data: dict,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    behavior_type = data.get("behavior_type")
    if not behavior_type:
        raise HTTPException(
            status_code=422,
            detail="behavior_type is required",
        )

    return create_behavior_log(
        user_id=user.id,
        behavior_type=behavior_type,
        value=data.get("value"),
        metadata=data.get("metadata"),
        token=credentials.credentials,
    )


@router.get("")
def list_behavior_logs(
    behavior_type: str = None,
    limit: int = 50,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return get_behavior_logs(
        user_id=user.id,
        limit=limit,
        behavior_type=behavior_type,
        token=credentials.credentials,
    )


@router.patch("/{log_id}")
def edit_behavior_log(
    log_id: str,
    data: dict,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return update_behavior_log(
        log_id=log_id,
        user_id=user.id,
        updates=data,
        token=credentials.credentials,
    )


@router.delete("/{log_id}")
def remove_behavior_log(
    log_id: str,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return delete_behavior_log(
        log_id=log_id,
        user_id=user.id,
        token=credentials.credentials,
    )
