from orchestrator.twin_orchestrator import TwinOrchestrator
from llm.ollama_service import OllamaService


class AthenaService:
    """
    Main interface for ATHENA's Agents + LLM system.

    The FastAPI backend can call this service without
    needing to manage individual agents.
    """

    def __init__(self, llm_service=None):

        self.orchestrator = TwinOrchestrator()

        # Use the provided LLM service,
        # otherwise use local Ollama.
        self.llm_service = llm_service or OllamaService()

    def process(
        self,
        user_input: str,
        user_context: dict = None
    ):
        """
        Process a user message through ATHENA.

        Flow:

        User message
              ↓
        Twin Orchestrator
              ↓
        Relevant Agents
              ↓
        LLM Service
              ↓
        ATHENA response
        """

        user_context = user_context or {}

        return self.orchestrator.process(
            user_input=user_input,
            context=user_context,
            llm_service=self.llm_service
        )

    def get_available_agents(self):
        """
        Return the agents currently available in ATHENA.
        """

        return self.orchestrator.get_available_agents()