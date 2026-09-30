from .base_agent import BaseAgent


class BehaviorAgent(BaseAgent):

    name = "Behavior Agent"

    def process(self, user_input: str = ""):

        # Fetch recorded behavior logs from context
        behavior_logs = self.context.get("behavior_logs", [])

        # Group logs by behavior_type for pattern analysis
        grouped = {}
        for log in behavior_logs:
            btype = log.get("behavior_type", "unknown")
            grouped.setdefault(btype, []).append(log)

        patterns = []
        observations = []
        recommendations = []

        # Identify patterns per behavior type
        for btype, logs in grouped.items():
            count = len(logs)

            # Build a pattern summary
            values = [
                log.get("value")
                for log in logs
                if log.get("value")
            ]

            patterns.append({
                "behavior_type": btype,
                "recorded_entries": count,
                "recent_values": values[:5],  # Last 5 recorded values
            })

            # Simple observations based on recorded data
            if count >= 3:
                observations.append(
                    f"You have logged '{btype}' {count} time(s). "
                    "A recurring pattern appears to be forming."
                )
            elif count == 1:
                observations.append(
                    f"You have one recorded entry for '{btype}'."
                )

            # Soft recommendations — no medical/psychological claims
            if btype in ("social_media", "screen_time") and values:
                observations.append(
                    "You have logged social media or screen time activity. "
                    "Reviewing your recorded entries may help you notice trends."
                )
                recommendations.append(
                    "Consider checking whether your recorded usage aligns "
                    "with the limits you have set for yourself."
                )

        # Check user message for direct inquiry
        text = user_input.lower()

        if not behavior_logs:
            observations.append(
                "No behavior data has been recorded yet. "
                "You can log a behavior by describing it to ATHENA."
            )

        return {
            "agent": self.name,
            "patterns": patterns,
            "observations": observations,
            "recommendations": recommendations,
            "behavior_logs": behavior_logs,
        }