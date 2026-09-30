import requests

from .llm_service import LLMService


class OllamaService(LLMService):

    def __init__(self, model="llama3.2"):
        self.model = model
        self.url = "http://localhost:11434/api/generate"

    def generate_response(self, prompt: str) -> str:

        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": False
        }

        response = requests.post(
            self.url,
            json=payload,
            timeout=120
        )

        response.raise_for_status()

        data = response.json()

        return data["response"]