from .base_agent import BaseAgent


class WellnessAgent(BaseAgent):

    name = "Wellness Agent"

    def process(self, user_input: str = ""):

        # Fetch wellness logs from context (populated from DB)
        wellness_logs = self.context.get("wellness_logs", [])

        logs_summary = []
        observations = []
        recommendations = []

        # Group by category
        grouped = {}
        for log in wellness_logs:
            category = log.get("category", "general")
            grouped.setdefault(category, []).append(log)

        for category, logs in grouped.items():
            values = [
                {
                    "value": log.get("value"),
                    "unit": log.get("unit"),
                    "notes": log.get("notes"),
                    "recorded_at": log.get("created_at"),
                }
                for log in logs
            ]

            logs_summary.append({
                "category": category,
                "count": len(logs),
                "entries": values[:10],  # Most recent 10
            })

            # Category-specific observations (non-diagnostic)
            if category == "sleep":
                sleep_values = [
                    float(log.get("value", 0))
                    for log in logs
                    if log.get("value")
                ]

                if sleep_values:
                    avg = sum(sleep_values) / len(sleep_values)
                    observations.append(
                        f"Your average recorded sleep is "
                        f"{avg:.1f} hours across {len(sleep_values)} entries."
                    )
                    if avg < 7:
                        recommendations.append(
                            "Your recorded sleep entries average below 7 hours. "
                            "Many adults find 7–9 hours of sleep supports "
                            "their energy and focus."
                        )

            elif category in ("workout", "exercise"):
                observations.append(
                    f"You have logged {len(logs)} workout or exercise "
                    f"session(s). Consistent activity tracking helps you "
                    f"see your progress over time."
                )

            else:
                observations.append(
                    f"You have {len(logs)} recorded entry(s) "
                    f"in the '{category}' wellness category."
                )

        if not wellness_logs:
            observations.append(
                "No wellness data has been recorded yet. "
                "You can log sleep, exercise, or other wellness "
                "information by telling ATHENA about it."
            )

        return {
            "agent": self.name,
            "logs": logs_summary,
            "observations": observations,
            "recommendations": recommendations,
            "wellness_logs": wellness_logs,
        }