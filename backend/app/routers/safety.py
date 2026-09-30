from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials

from app.dependencies.auth import get_current_user, bearer_scheme
from app.services.safety_service import (
    create_emergency_contact,
    get_emergency_contacts,
    update_emergency_contact,
    delete_emergency_contact,
    get_safety_config,
    update_safety_config,
)

router = APIRouter(
    prefix="/safety",
    tags=["Safety"],
)


# ---------------------------------------------------------
# EMERGENCY CONTACTS
# ---------------------------------------------------------

@router.post("/contacts")
def add_emergency_contact(
    data: dict,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    name = data.get("name")
    phone = data.get("phone")

    if not name:
        raise HTTPException(
            status_code=422,
            detail="name is required for an emergency contact",
        )
    if not phone:
        raise HTTPException(
            status_code=422,
            detail="phone is required for an emergency contact",
        )

    return create_emergency_contact(
        user_id=user.id,
        name=name,
        phone=phone,
        relationship=data.get("relationship"),
        priority=data.get("priority", 1),
        token=credentials.credentials,
    )


@router.get("/contacts")
def list_emergency_contacts(
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return get_emergency_contacts(
        user_id=user.id,
        token=credentials.credentials,
    )


@router.patch("/contacts/{contact_id}")
def edit_emergency_contact(
    contact_id: str,
    data: dict,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return update_emergency_contact(
        contact_id=contact_id,
        user_id=user.id,
        updates=data,
        token=credentials.credentials,
    )


@router.delete("/contacts/{contact_id}")
def remove_emergency_contact(
    contact_id: str,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return delete_emergency_contact(
        contact_id=contact_id,
        user_id=user.id,
        token=credentials.credentials,
    )


# ---------------------------------------------------------
# SAFETY CONFIG
# ---------------------------------------------------------

@router.get("/config")
def get_config(
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return get_safety_config(
        user_id=user.id,
        token=credentials.credentials,
    )


@router.patch("/config")
def update_config(
    data: dict,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    return update_safety_config(
        user_id=user.id,
        updates=data,
        token=credentials.credentials,
    )
