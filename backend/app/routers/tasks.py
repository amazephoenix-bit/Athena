from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials

from app.dependencies.auth import get_current_user, bearer_scheme
from app.services.task_service import (
    create_task,
    get_tasks,
    update_task,
    delete_task,
)

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)


@router.post("")
def add_task(
    data: dict,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    user_id = user.id

    return create_task(
        user_id=user_id,
        title=data["title"],
        description=data.get("description"),
        due_at=data.get("due_at"),
        token=credentials.credentials,
    )


@router.get("")
def list_tasks(
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return get_tasks(
        user_id=user.id,
        token=credentials.credentials,
    )


@router.patch("/{task_id}")
def edit_task(
    task_id: str,
    data: dict,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return update_task(
        task_id=task_id,
        user_id=user.id,
        updates=data,
        token=credentials.credentials,
    )


@router.delete("/{task_id}")
def remove_task(
    task_id: str,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return delete_task(
        task_id=task_id,
        user_id=user.id,
        token=credentials.credentials,
    )