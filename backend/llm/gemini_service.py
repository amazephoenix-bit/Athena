import os

from .llm_service import LLMService


class GeminiService(LLMService):

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")

        if not self.api_key:
            raise ValueError(
                "GEMINI_API_KEY environment variable is not set."
            )

    def generate_response(self, prompt: str) -> str:

        # Gemini API integration will be added next.
        raise NotImplementedError(
            "Gemini integration is not configured yet."
        )