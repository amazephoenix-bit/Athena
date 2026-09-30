from agents.productivity_agent import ProductivityAgent
from agents.reminder import ReminderAgent
from agents.memory_agent import MemoryAgent
from agents.behaviour_agent import BehaviorAgent
from agents.wellness_agent import WellnessAgent
from agents.safety_agent import SafetyAgent
from agents.lifestyle_agent import LifestyleAgent


class TwinOrchestrator:

    def __init__(self):

        self.agents = {
            "productivity": ProductivityAgent(),
            "reminder": ReminderAgent(),
            "memory": MemoryAgent(),
            "behavior": BehaviorAgent(),
            "wellness": WellnessAgent(),
            "safety": SafetyAgent(),
            "lifestyle": LifestyleAgent()
        }

    def update_context(self, context):

        for agent in self.agents.values():
            agent.update_context(context)

    def run_agent(self, agent_name, user_input=""):

        if agent_name not in self.agents:
            raise ValueError(
                f"Unknown agent: {agent_name}"
            )

        return self.agents[agent_name].process(
            user_input
        )

    def get_available_agents(self):

        return list(self.agents.keys())

    def detect_agents(self, user_input):

        text = user_input.lower()

        selected_agents = []

        productivity_keywords = [
            "task",
            "assignment",
            "deadline",
            "study",
            "studying",
            "exam preparation",
            "procrastination",
            "productive"
        ]

        reminder_keywords = [
            "remind",
            "reminder",
            "medicine",
            "meeting",
            "event",
            "exam tomorrow"
        ]

        memory_keywords = [
            "remember",
            "memory",
            "preference",
            "i like",
            "i prefer"
        ]

        behavior_keywords = [
            "habit",
            "pattern",
            "social media",
            "screen time",
            "routine",
            "behavior"
        ]

        wellness_keywords = [
            "sleep",
            "workout",
            "exercise",
            "period",
            "wellness",
            "health"
        ]

        safety_keywords = [
            "sos",
            "emergency",
            "danger",
            "unsafe",
            "emergency contact"
        ]

        lifestyle_keywords = [
            "spotify",
            "music",
            "pet",
            "dog",
            "cat",
            "family",
            "lifestyle"
        ]

        if any(word in text for word in productivity_keywords):
            selected_agents.append("productivity")

        if any(word in text for word in reminder_keywords):
            selected_agents.append("reminder")

        if any(word in text for word in memory_keywords):
            selected_agents.append("memory")

        if any(word in text for word in behavior_keywords):
            selected_agents.append("behavior")

        if any(word in text for word in wellness_keywords):
            selected_agents.append("wellness")

        if any(word in text for word in safety_keywords):
            selected_agents.append("safety")

        if any(word in text for word in lifestyle_keywords):
            selected_agents.append("lifestyle")

        if not selected_agents:
            selected_agents.append("productivity")

        return selected_agents

    def process(
        self,
        user_input,
        context=None,
        llm_service=None
    ):

        context = context or {}

        # Give user context to all agents
        self.update_context(context)

        # Determine which agents are relevant
        selected_agents = self.detect_agents(
            user_input
        )

        # Run the selected agents
        agent_results = {}

        for agent_name in selected_agents:

            agent_results[agent_name] = self.run_agent(
                agent_name,
                user_input
            )

        # If no LLM service is provided,
        # return the agent results directly.
        if llm_service is None:

            return {
                "selected_agents": selected_agents,
                "agent_results": agent_results
            }

        # Create the ATHENA LLM prompt
        prompt = f"""
You are ATHENA, a personal digital twin AI assistant.

Your job is to help the user manage productivity, reminders,
memory, behavior, wellness, safety, and lifestyle.

USER MESSAGE:
{user_input}

USER CONTEXT:
{context}

AGENT ANALYSIS:
{agent_results}

Follow these rules carefully:

1. Answer the user's actual request directly.

2. Use the user context and agent analysis to personalize
   the response.

3. Never invent personal information, reminders, events,
   completed actions, medical information, or facts that
   are not provided.

4. If information is missing, clearly say that it is not available.

5. When multiple agents provide relevant information,
   combine them naturally.

6. Give practical and actionable suggestions when appropriate.

7. Keep the response concise and easy to understand.

8. Use bullet points when they make the response clearer.

9. Do not mention "agents", "agent analysis", "orchestrator",
   prompts, internal systems, or implementation details.

10. Do not claim that a reminder, message, SOS, notification,
    or other external action was actually performed unless
    the system confirms it.

11. Wellness information is supportive and should not be
    presented as a medical diagnosis.

12. Music preferences or behavior patterns must not be treated
    as proof of a person's mental or physical health condition.

13. For emergency or SOS situations, prioritize the user's
    configured safety information and do not automatically
    contact anyone unless the system explicitly confirms
    that action.

14. If the user asks to remember something, identify the
    information that should be stored, but do not claim it
    has been permanently saved unless the memory system
    confirms that it was saved.

Respond naturally as ATHENA.

Do not explain how you generated the answer.
"""

        # Generate final response using the selected LLM
        final_response = llm_service.generate_response(
            prompt
        )

        return {
            "selected_agents": selected_agents,
            "agent_results": agent_results,
            "response": final_response
        }