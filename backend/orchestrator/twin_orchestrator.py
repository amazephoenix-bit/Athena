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
            "set a reminder",
            "remind me",
            "don't let me forget",
            "dont let me forget",
            "alert me",
            "remember to",
            "medicine",
            "meeting",
            "event",
            "exam tomorrow",
            "notify me",
            "alarm",
        ]

        memory_keywords = [
            "remember",
            "memory",
            "preference",
            "i like",
            "i prefer",
        ]

        behavior_keywords = [
            "habit",
            "pattern",
            "social media",
            "screen time",
            "instagram",
            "tiktok",
            "twitter",
            "facebook",
            "routine",
            "behavior",
            "procrastinat",
            "been spending",
            "hours on",
            "minutes on",
            "been wasting",
            "i've been",
            "i have been",
        ]

        wellness_keywords = [
            "sleep",
            "slept",
            "workout",
            "worked out",
            "exercise",
            "exercised",
            "ran",
            "period",
            "cycle",
            "wellness",
            "health",
            "yoga",
            "meditation",
            "water intake",
            "calories",
            "steps",
        ]

        safety_keywords = [
            "sos",
            "emergency",
            "danger",
            "unsafe",
            "emergency contact",
            "add.*contact",
            "contact",
        ]

        lifestyle_keywords = [
            "spotify",
            "music",
            "genre",
            "pet",
            "dog",
            "cat",
            "family",
            "lifestyle",
            "prefer",
            "i like",
            "i love",
            "i enjoy",
            "favorite",
            "favourite",
        ]

        if any(word in text for word in productivity_keywords):
            selected_agents.append("productivity")

        has_reminder = any(word in text for word in reminder_keywords)

        if has_reminder:
            selected_agents.append("reminder")

        # Add memory agent only for genuine memory phrases, not reminder overlap.
        # "remember to X" is a reminder, not a memory-store request.
        memory_only_keywords = ["memory", "i like", "i prefer", "preference"]
        if any(word in text for word in memory_only_keywords) or (
            "remember" in text and not has_reminder
        ):
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

        # Build context fields for the prompt
        behavior_logs = context.get("behavior_logs", [])
        wellness_logs = context.get("wellness_logs", [])
        emergency_contacts = context.get("emergency_contacts", [])
        safety_config = context.get("safety_config", {})
        lifestyle_preferences = context.get("lifestyle_preferences", [])
        reminders = context.get("reminders", [])

        newly_created_task = context.get("newly_created_task")
        newly_created_behavior = context.get("newly_created_behavior")
        newly_created_wellness = context.get("newly_created_wellness")
        newly_created_lifestyle = context.get("newly_created_lifestyle")
        newly_created_contact = context.get("newly_created_contact")
        newly_created_reminder = context.get("newly_created_reminder")
        newly_completed_reminder = context.get("newly_completed_reminder")
        newly_cancelled_reminder = context.get("newly_cancelled_reminder")
        newly_completed_task = context.get("newly_completed_task")
        newly_deleted_task = context.get("newly_deleted_task")
        contact_missing_fields = context.get("contact_missing_fields", [])
        reminder_ambiguous = context.get("reminder_ambiguous", False)

        # Create the ATHENA LLM prompt
        prompt = f"""
You are ATHENA, a personal digital twin AI assistant.

Your job is to help the user manage productivity, reminders,
memory, behavior, wellness, safety, and lifestyle.

USER MESSAGE:
{user_input}

USER CONTEXT:
- Profile: {context.get("profile")}
- Memories: {context.get("memories")}
- Tasks: {context.get("tasks")}
- Reminders: {reminders}
- Behavior logs: {behavior_logs}
- Wellness logs: {wellness_logs}
- Emergency contacts: {emergency_contacts}
- Safety config: {safety_config}
- Lifestyle preferences: {lifestyle_preferences}

RECENT ACTIONS (performed this turn — use to confirm to the user):
- Created task: {newly_created_task}
- Created reminder: {newly_created_reminder}
- Completed reminder: {newly_completed_reminder}
- Cancelled reminder: {newly_cancelled_reminder}
- Completed task: {newly_completed_task}
- Deleted task: {newly_deleted_task}
- Created behavior log: {newly_created_behavior}
- Created wellness log: {newly_created_wellness}
- Created lifestyle preference: {newly_created_lifestyle}
- Created emergency contact: {newly_created_contact}
- Missing contact fields (ask user for these): {contact_missing_fields}
- Reminder time ambiguous (ask user for specific time): {reminder_ambiguous}

AGENT ANALYSIS:
{agent_results}

Follow these rules carefully:

1. Answer the user's actual request directly.

2. ATHENA directly manages reminders and tasks (create, complete, delete).
   - If a reminder was marked completed (newly_completed_reminder), confirm it cleanly (e.g. "I've marked your 'Study ML' reminder as completed.").
   - If a reminder was cancelled/deleted (newly_cancelled_reminder), confirm it cleanly.
   - If a task was marked completed or deleted, confirm it cleanly.
   - NEVER claim that you cannot mark reminders/tasks as completed or manage them.

3. Use the user context and agent analysis to personalize the response.

4. Never invent personal information, reminders, events, completed actions, medical information, or facts that are not provided.

5. If information is missing, clearly say that it is not available.

6. When multiple agents provide relevant information, combine them naturally.

7. Give practical and actionable suggestions when appropriate.

8. Keep the response concise, warm, and easy to understand.

9. Do not mention "agents", "agent analysis", "orchestrator", prompts, internal systems, or implementation details.

10. Do not claim that an external action (like sending SMS/calling) was actually performed unless the system confirms it.

11. Wellness information is supportive and should not be presented as a medical diagnosis.

12. Music preferences or behavior patterns must not be treated as proof of a person's mental or physical health condition.

13. For emergency or SOS situations, prioritize the user's configured safety information and do not automatically contact anyone unless the system explicitly confirms that action.

14. If the user asks to remember something, identify the information that should be stored, but do not claim it has been permanently saved unless the memory system confirms that it was saved.

15. If contact_missing_fields is not empty, ask the user to provide those missing fields before creating the contact.

16. If reminder_ambiguous is True, ask the user what specific time they would like the reminder set for.

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