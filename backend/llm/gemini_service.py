import os
from google import genai
from .llm_service import LLMService


class GeminiService(LLMService):

    def __init__(self, model="gemini-3.5-flash-lite"):
        self.api_key = os.getenv("GEMINI_API_KEY")

        if not self.api_key:
            raise ValueError(
                "GEMINI_API_KEY environment variable is not set."
            )

        self.model = model
        self.client = genai.Client(api_key=self.api_key)

    def generate_response(self, prompt: str) -> str:
        fallback_models = [self.model, "gemini-3.5-flash", "gemini-3.8-flash"]
        # Remove duplicates while preserving order
        candidate_models = list(dict.fromkeys(fallback_models))

        last_error = None
        for m in candidate_models:
            try:
                response = self.client.models.generate_content(
                    model=m,
                    contents=prompt,
                )
                return response.text
            except Exception as e:
                last_error = e
                print(f"Gemini model {m} failed: {e}. Trying fallback...")

        raise last_error