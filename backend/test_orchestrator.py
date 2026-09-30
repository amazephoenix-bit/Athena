from orchestrator.twin_orchestrator import TwinOrchestrator


orchestrator = TwinOrchestrator()


print("\n===== AVAILABLE ATHENA AGENTS =====\n")

print(orchestrator.get_available_agents())


print("\n===== TESTING PRODUCTIVITY AGENT =====\n")


user_context = {
    "tasks": [
        {
            "title": "Complete hackathon project",
            "completed": False
        }
    ],

    "assignments": [
        {
            "title": "AI assignment",
            "deadline": "2026-10-02",
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


orchestrator.update_context(user_context)


result = orchestrator.run_agent(
    "productivity"
)


print(result)