from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials

from app.dependencies.auth import get_current_user, bearer_scheme
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.conversation_service import save_message
from app.services.user_context_service import get_user_context


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("", response_model=ChatResponse)
def chat(
    data: ChatRequest,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    user_id = user.id
    token = credentials.credentials
    context = get_user_context(user_id)

    print("USER CONTEXT:")
    print(context)

    save_message(
        user_id=user_id,
        role="user",
        message=data.message,
        token=token,
    )

    response = "ATHENA received your message."

    save_message(
        user_id=user_id,
        role="assistant",
        message=response,
        token=token,
    )

    return {"response": response}
