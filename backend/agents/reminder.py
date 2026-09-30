from datetime import datetime, timezone

from .base_agent import BaseAgent


class ReminderAgent(BaseAgent):

    name = "Reminder Agent"

    def process(self, user_input: str = ""):

        # Reminders come from context["reminders"],
        # which is populated by user_context_service from the DB.
        reminders = self.context.get("reminders", [])

        now = datetime.now(timezone.utc)

        upcoming = []
        nearest = None

        for r in reminders:
            remind_at_raw = r.get("remind_at")

            if not remind_at_raw:
                continue

            try:
                # Parse ISO-8601; handle both offset-aware and naive strings
                if remind_at_raw.endswith("Z"):
                    remind_at_raw = remind_at_raw[:-1] + "+00:00"

                remind_dt = datetime.fromisoformat(remind_at_raw)

                # Make timezone-aware if naive (assume UTC)
                if remind_dt.tzinfo is None:
                    remind_dt = remind_dt.replace(tzinfo=timezone.utc)

                upcoming.append({
                    "id": r.get("id"),
                    "title": r.get("title"),
                    "description": r.get("description"),
                    "remind_at": remind_at_raw,
                    "remind_dt": remind_dt,
                    "is_overdue": remind_dt < now,
                })

            except (ValueError, TypeError):
                # If parsing fails, still include the reminder without dt
                upcoming.append({
                    "id": r.get("id"),
                    "title": r.get("title"),
                    "description": r.get("description"),
                    "remind_at": remind_at_raw,
                    "remind_dt": None,
                    "is_overdue": False,
                })

        # Sort upcoming by remind_at ascending (None last)
        upcoming.sort(
            key=lambda x: (
                x["remind_dt"] is None,
                x["remind_dt"] or datetime.max.replace(tzinfo=timezone.utc),
            )
        )

        # Find the nearest future reminder
        for r in upcoming:
            dt = r.get("remind_dt")
            if dt and dt >= now:
                nearest = r
                break

        # Build recommendations
        recommendations = []

        overdue = [r for r in upcoming if r.get("is_overdue")]
        if overdue:
            titles = ", ".join(r["title"] for r in overdue[:3])
            recommendations.append(
                f"You have {len(overdue)} overdue reminder(s): {titles}. "
                "Consider addressing them or marking them as completed."
            )

        if nearest:
            recommendations.append(
                f"Your next upcoming reminder is '{nearest['title']}' "
                f"at {nearest['remind_at']}."
            )

        if not reminders:
            recommendations.append(
                "You have no active reminders. "
                "You can add one by telling ATHENA what and when to remind you."
            )

        # Strip internal reminder_dt before returning (not serialisable by JSON)
        serialisable_upcoming = [
            {k: v for k, v in r.items() if k != "remind_dt"}
            for r in upcoming
        ]

        return {
            "agent": self.name,
            "reminders": reminders,
            "upcoming": serialisable_upcoming,
            "nearest": (
                {k: v for k, v in nearest.items() if k != "remind_dt"}
                if nearest else None
            ),
            "recommendations": recommendations,
        }