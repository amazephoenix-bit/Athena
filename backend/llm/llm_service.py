class LLMService:

    def generate_response(self, prompt: str) -> str:
        raise NotImplementedError(
            "Each LLM provider must implement generate_response()."
        )