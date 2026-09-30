from .base_agent import BaseAgent


class LifestyleAgent(BaseAgent):

    name = "Lifestyle Agent"

    def process(self, user_input: str = ""):

        spotify = self.context.get("spotify", {})
        pet = self.context.get("pet", {})
        family = self.context.get("family_reminders", [])
        preferences = self.context.get(
            "lifestyle_preferences", {}
        )

        return {
            "agent": self.name,

            "spotify": spotify,

            "pet_tracker": {
                "feeding": pet.get("feeding", []),
                "litter_cleaning": pet.get(
                    "litter_cleaning", []
                ),
                "health_information": pet.get(
                    "health_information", {}
                )
            },

            "family_reminders": family,

            "lifestyle_preferences": preferences,

            "music_insights": self._music_insight(spotify)
        }

    def _music_insight(self, spotify):

        recent_mood = spotify.get("recent_mood")

        if recent_mood == "sad":
            return {
                "status": "changed",
                "message": "A change in recent music preference was detected."
            }

        if recent_mood == "positive":
            return {
                "status": "positive",
                "message": "Recent music preference appears positive."
            }

        return {
            "status": "unknown",
            "message": "Not enough music data for an insight."
        }