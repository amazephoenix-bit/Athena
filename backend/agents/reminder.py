from .base_agent import BaseAgent


class ReminderAgent(BaseAgent):

    name = "Reminder Agent"

    def process(self, user_input: str = ""):

        reminders = self.context.get("reminders", [])

        return {
            "agent": self.name,

            "medicine": [
                r for r in reminders
                if r.get("type") == "medicine"
            ],

            "exams": [
                r for r in reminders
                if r.get("type") == "exam"
            ],

            "meetings": [
                r for r in reminders
                if r.get("type") == "meeting"
            ],

            "events": [
                r for r in reminders
                if r.get("type") == "event"
            ],

            "habits": [
                r for r in reminders
                if r.get("type") == "habit"
            ]
        }