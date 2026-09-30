from llm.gemini_service import GeminiService
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")

from llm.gemini_service import GeminiService

gemini = GeminiService()

response = gemini.generate_response(
    "Say hello to ATHENA in one sentence."
)

print(response)