from .base_agent import BaseAgent


class SafetyAgent(BaseAgent):

    name = "Safety Agent"

    def process(self, user_input: str = ""):

        # Fetch from context (populated from DB)
        contacts = self.context.get("emergency_contacts", [])
        safety_config = self.context.get("safety_config", {})

        recommendations = []

        if not contacts:
            recommendations.append(
                "No emergency contacts are configured yet. "
                "You can add one by providing a name, phone number, "
                "and your relationship to the person."
            )

        sos_enabled = safety_config.get("sos_enabled", False)
        location_sharing = safety_config.get(
            "location_sharing_enabled", False
        )

        if contacts and not sos_enabled:
            recommendations.append(
                "You have emergency contacts configured but SOS is not enabled. "
                "You can enable SOS via your safety settings."
            )

        return {
            "agent": self.name,
            "emergency_contacts": contacts,
            "safety_config": {
                "sos_enabled": sos_enabled,
                "location_sharing_enabled": location_sharing,
            },
            "recommendations": recommendations,
        }

    def get_emergency_contacts(self):
        return self.context.get("emergency_contacts", [])