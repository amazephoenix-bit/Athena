from .base_agent import BaseAgent


class SafetyAgent(BaseAgent):

    name = "Safety Agent"

    def process(self, user_input: str = ""):

        contacts = self.context.get(
            "emergency_contacts", []
        )

        safety_information = self.context.get(
            "safety_information", {}
        )

        return {
            "agent": self.name,

            "emergency_contacts": contacts,

            "safety_information": safety_information,

            "sos": {
                "enabled": bool(contacts),
                "requires_user_confirmation": True
            }
        }

    def get_emergency_contacts(self):

        return self.context.get(
            "emergency_contacts", []
        )