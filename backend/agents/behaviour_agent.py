from .base_agent import BaseAgent


class BehaviorAgent(BaseAgent):

    name = "Behavior Agent"

    def process(self, user_input: str = ""):

        patterns = self.context.get("patterns", {})
        social_media = self.context.get(
            "social_media_habits", {}
        )
        productivity = self.context.get(
            "productivity_patterns", {}
        )
        routine_changes = self.context.get(
            "routine_changes", []
        )

        insights = []

        if social_media.get("daily_minutes", 0) > social_media.get(
            "preferred_limit", 120
        ):
            insights.append(
                "Social-media usage is higher than the configured limit."
            )

        if productivity.get("late_night_productivity", False):
            insights.append(
                "The user appears to be more productive during late hours."
            )

        if routine_changes:
            insights.append(
                "A change in the user's routine has been detected."
            )

        return {
            "agent": self.name,
            "patterns": patterns,
            "social_media_habits": social_media,
            "productivity_patterns": productivity,
            "routine_changes": routine_changes,
            "behavior_insights": insights
        }