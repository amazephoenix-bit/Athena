from agents.athena_service import AthenaService


# Create ATHENA service
athena = AthenaService()


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


# Test user message
user_input = (
    "I have an AI assignment due tomorrow "
    "and I haven't started."
)


# Process through the complete ATHENA service
result = athena.process(
    user_input=user_input,
    user_context=user_context
)


print("\n===== AVAILABLE AGENTS =====\n")
print(athena.get_available_agents())


print("\n===== SELECTED AGENTS =====\n")
print(result["selected_agents"])


print("\n===== ATHENA RESPONSE =====\n")
print(result["response"])