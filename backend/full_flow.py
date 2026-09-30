from orchestrator.twin_orchestrator import TwinOrchestrator
from llm.ollama_service import OllamaService


# Create ATHENA orchestrator
orchestrator = TwinOrchestrator()

# Create local Ollama LLM service
ollama = OllamaService()


# Sample user context
user_context = {
    "tasks": [
        {
            "title": "Complete AI assignment",
            "completed": False
        }
    ],

    "assignments": [
        {
            "title": "AI assignment",
            "deadline": "2026-10-01",
            "completed": False
        }
    ],

    "study_goals": [
        "Study AI for 2 hours"
    ],

    "procrastination": {
        "social_media_minutes": 180,
        "daily_limit_minutes": 120
    }
}


# User's message
user_input = user_input = "I have an exam tomorrow, remind me to study tonight, and I haven't been sleeping properly."


# Process the complete ATHENA flow
result = orchestrator.process(
    user_input=user_input,
    context=user_context,
    llm_service=ollama
)


print("\n===== SELECTED AGENTS =====\n")
print(result["selected_agents"])


print("\n===== AGENT RESULTS =====\n")
print(result["agent_results"])


print("\n===== ATHENA RESPONSE =====\n")
print(result["response"])