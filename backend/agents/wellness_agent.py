from .base_agent import BaseAgent


class WellnessAgent(BaseAgent):

    name = "Wellness Agent"

    def process(self, user_input: str = ""):

        period = self.context.get("period_tracking", {})
        sleep = self.context.get("sleep", {})
        workouts = self.context.get("workouts", [])
        wellness = self.context.get("wellness", {})

        return {
            "agent": self.name,

            "period_tracking": {
                "enabled": period.get("enabled", False),
                "last_period": period.get("last_period"),
                "average_cycle_days": period.get(
                    "average_cycle_days"
                ),
                "average_duration_days": period.get(
                    "average_duration_days"
                ),
                "next_estimated_period": period.get(
                    "next_estimated_period"
                )
            },

            "sleep": sleep,

            "workouts": workouts,

            "wellness_information": wellness
        }