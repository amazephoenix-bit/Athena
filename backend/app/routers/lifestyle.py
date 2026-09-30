from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials

from app.dependencies.auth import get_current_user, bearer_scheme
from app.services.lifestyle_service import (
    create_lifestyle_preference,
    get_lifestyle_preferences,
    update_lifestyle_preference,
    delete_lifestyle_preference,
)

router = APIRouter(
    prefix="/lifestyle",
    tags=["Lifestyle"],
)


@router.post("")
def add_lifestyle_preference(
    data: dict,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    category = data.get("category")
    key = data.get("key")

    if not category:
        raise HTTPException(
            status_code=422,
            detail="category is required",
        )
    if not key:
        raise HTTPException(
            status_code=422,
            detail="key is required",
        )

    return create_lifestyle_preference(
        user_id=user.id,
        category=category,
        key=key,
        value=data.get("value"),
        token=credentials.credentials,
    )


@router.get("")
def list_lifestyle_preferences(
    category: str = None,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return get_lifestyle_preferences(
        user_id=user.id,
        category=category,
        token=credentials.credentials,
    )


@router.patch("/{pref_id}")
def edit_lifestyle_preference(
    pref_id: str,
    data: dict,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return update_lifestyle_preference(
        pref_id=pref_id,
        user_id=user.id,
        updates=data,
        token=credentials.credentials,
    )


@router.delete("/{pref_id}")
def remove_lifestyle_preference(
    pref_id: str,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return delete_lifestyle_preference(
        pref_id=pref_id,
        user_id=user.id,
        token=credentials.credentials,
    )
