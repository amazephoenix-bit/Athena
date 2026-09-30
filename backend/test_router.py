from orchestrator.twin_orchestrator import TwinOrchestrator


orchestrator = TwinOrchestrator()


test_messages = [
    "I have an assignment tomorrow",
    "Remind me about my exam tomorrow",
    "I have been sleeping badly and my workout routine changed",
    "I spend too much time on social media",
    "I need emergency help"
]


for message in test_messages:

    agents = orchestrator.detect_agents(message)

    print("\nUser:", message)
    print("Selected agents:", agents)