from typing import Any, Dict


class BaseAgent:
    """
    Base class for all ATHENA agents.

    Each agent receives structured user context and returns
    structured information that can later be passed to an LLM.
    """

    name = "Base Agent"

    def __init__(self):
        self.context: Dict[str, Any] = {}

    def update_context(self, context: Dict[str, Any]):
        self.context = context or {}

    def get_context(self) -> Dict[str, Any]:
        return self.context

    def process(self, user_input: str = "") -> Dict[str, Any]:
        raise NotImplementedError(
            "Each agent must implement the process() method."
        )