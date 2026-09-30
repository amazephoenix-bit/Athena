from datetime import datetime
from .base_agent import BaseAgent


class ProductivityAgent(BaseAgent):

    name = "Productivity Agent"

    def process(self, user_input: str = ""):

        tasks = self.context.get("tasks", [])
        assignments = self.context.get("assignments", [])
        study_goals = self.context.get("study_goals", [])
        procrastination = self.context.get("procrastination", {})

        pending_tasks = [
            task for task in tasks
            if not task.get("completed", False)
        ]

        pending_assignments = [
            assignment for assignment in assignments
            if not assignment.get("completed", False)
        ]

        social_media_minutes = procrastination.get(
            "social_media_minutes", 0
        )

        daily_limit = procrastination.get(
            "daily_limit_minutes", 120
        )

        return {
            "agent": self.name,

            "tasks": pending_tasks,

            "assignments": pending_assignments,

            "deadlines": [
                {
                    "title": item.get("title"),
                    "deadline": item.get("deadline")
                }
                for item in pending_assignments
            ],

            "study_plan": study_goals,

            "procrastination": {
                "social_media_minutes": social_media_minutes,
                "daily_limit_minutes": daily_limit,
                "over_limit": social_media_minutes > daily_limit
            },

            "task_intent": self._detect_task_intent(
                user_input
            ),

            "recommendations": self._get_recommendations(
                social_media_minutes,
                daily_limit,
                pending_assignments
            )
        }

    def _detect_task_intent(self, user_input: str):

        text = user_input.lower()

        task_phrases = [
            "i have to",
            "i need to",
            "i need to finish",
            "i need to complete",
            "assignment",
            "task",
            "deadline",
            "due",
            "submit"
        ]

        if any(phrase in text for phrase in task_phrases):

            return {
                "is_task": True,
                "message": user_input
            }

        return {
            "is_task": False,
            "message": None
        }

    def _get_recommendations(
        self,
        social_media_minutes,
        daily_limit,
        assignments
    ):

        recommendations = []

        if social_media_minutes > daily_limit:
            recommendations.append(
                "Your social-media usage is above your preferred daily limit."
            )

        if assignments:
            recommendations.append(
                "Prioritize assignments according to their deadlines."
            )

        if not recommendations:
            recommendations.append(
                "Your current productivity pattern is within your configured limits."
            )

        return recommendations