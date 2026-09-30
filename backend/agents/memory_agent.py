from .base_agent import BaseAgent


class MemoryAgent(BaseAgent):

    name = "Memory Agent"

    def process(self, user_input: str = ""):

        return {
            "agent": self.name,

            "preferences": self.context.get(
                "preferences", {}
            ),

            "personal_information": self.context.get(
                "personal_information", {}
            ),

            "memories": self.context.get(
                "memories", []
            ),

            "past_context": self.context.get(
                "past_context", []
            )
        }

    def add_memory(self, memory: str):
        memories = self.context.setdefault("memories", [])
        memories.append(memory)

    def add_preference(self, key: str, value):
        preferences = self.context.setdefault(
            "preferences", {}
        )
        preferences[key] = value