from agents.lifestyle_agent import LifestyleAgent
from llm.ollama_service import OllamaService


user_context = {
    "spotify": {
        "recent_mood": "positive",
        "top_genres": [
            "Pop",
            "Lo-fi",
            "Hip-Hop"
        ],
        "listening_hours_per_day": 2.5
    },

    "pet": {
        "feeding": [
            {
                "time": "8:00 AM",
                "completed": True
            },
            {
                "time": "7:00 PM",
                "completed": False
            }
        ],

        "litter_cleaning": [
            {
                "scheduled": "6:00 PM",
                "completed": False
            }
        ],

        "health_information": {
            "last_checkup": "2026-08-15"
        }
    },

    "family_reminders": [
        {
            "title": "Call parents",
            "time": "8:00 PM"
        }
    ],

    "lifestyle_preferences": {
        "preferred_study_environment": "Quiet room",
        "favorite_activity": "Listening to music"
    }
}


agent = LifestyleAgent()

agent.update_context(user_context)

agent_result = agent.process()


ollama = OllamaService()

prompt = f"""
You are ATHENA, a personal lifestyle assistant.

Analyze the following lifestyle information:

{agent_result}

Provide:
1. A short Spotify listening summary
2. Pet-care tasks that need attention
3. Family reminders
4. Lifestyle preferences
5. Two useful lifestyle suggestions

Important:
- Music listening is only a contextual signal.
- Do not diagnose mood, mental health, or medical conditions from music.
- Do not invent information.
- Keep the response concise and practical.
"""

response = ollama.generate_response(prompt)

print("\n===== ATHENA LIFESTYLE RESPONSE =====\n")
print(response)