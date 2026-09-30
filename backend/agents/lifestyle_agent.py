from .base_agent import BaseAgent


class LifestyleAgent(BaseAgent):

    name = "Lifestyle Agent"

    def process(self, user_input: str = ""):

        # Fetch from context (populated from DB)
        lifestyle_prefs = self.context.get("lifestyle_preferences", [])

        # Group preferences by category
        grouped = {}
        for pref in lifestyle_prefs:
            category = pref.get("category", "general")
            grouped.setdefault(category, []).append({
                "key": pref.get("key"),
                "value": pref.get("value"),
            })

        preferences_summary = [
            {
                "category": category,
                "entries": entries,
            }
            for category, entries in grouped.items()
        ]

        observations = []
        recommendations = []

        if lifestyle_prefs:
            categories = list(grouped.keys())
            observations.append(
                f"You have lifestyle preferences recorded across "
                f"{len(categories)} category(s): "
                f"{', '.join(categories)}."
            )
        else:
            observations.append(
                "No lifestyle preferences have been recorded yet. "
                "You can share preferences such as music tastes, "
                "pet-related information, or family reminders."
            )

        # Music-specific observation
        music_prefs = grouped.get("music", [])
        if music_prefs:
            observations.append(
                "Your recorded music preferences are available. "
                "Note: ATHENA does not have access to Spotify or "
                "any external streaming service unless an integration "
                "is explicitly configured."
            )

        return {
            "agent": self.name,
            "preferences": preferences_summary,
            "observations": observations,
            "recommendations": recommendations,
            "lifestyle_preferences": lifestyle_prefs,
        }