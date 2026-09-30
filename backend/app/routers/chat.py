import json
import re
from datetime import datetime, timezone, timedelta

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials

from app.dependencies.auth import bearer_scheme, get_current_user
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.behavior_service import create_behavior_log
from app.services.conversation_service import (
    get_conversation_history,
    save_message,
)
from app.services.lifestyle_service import create_lifestyle_preference
from app.services.reminder_service import (
    create_reminder,
    get_reminders,
    update_reminder,
    delete_reminder,
)
from app.services.safety_service import create_emergency_contact
from app.services.task_service import (
    create_task,
    get_tasks,
    update_task,
    delete_task,
)
from app.services.user_context_service import get_user_context
from app.services.wellness_service import create_wellness_log
from llm.gemini_service import GeminiService
from memory.user_memory import save_memory
from orchestrator.twin_orchestrator import TwinOrchestrator

# ---------------------------------------------------------
# INITIALIZE
# ---------------------------------------------------------

orchestrator = TwinOrchestrator()
llm_service = GeminiService()

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


# ---------------------------------------------------------
# MEMORY INTENT
# ---------------------------------------------------------

def extract_memory_intent(text: str) -> str | None:
    """
    Extract memory statement if the user explicitly
    asks ATHENA to remember something.
    """
    text_clean = text.strip().rstrip(".!")

    patterns = [
        r"^(?:please\s+)?remember(?:\s+that|:)?\s+(.+)$",
        r"^(?:please\s+)?keep\s+in\s+mind(?:\s+that|:)?\s+(.+)$",
        r"^(?:please\s+)?note(?:\s+that|:)?\s+(.+)$",
        r"^(.+?)[,\s]+(?:please\s+)?remember\s+(?:it|this)$",
    ]

    for pattern in patterns:
        match = re.search(pattern, text_clean, re.IGNORECASE)
        if match:
            extracted = match.group(1).strip().lstrip(":").strip()
            if extracted:
                return extracted

    return None


# ---------------------------------------------------------
# TASK EXTRACTION
# ---------------------------------------------------------

TASK_TRIGGER_KEYWORDS = [
    "task",
    "todo",
    "to-do",
    "remind",
    "assignment",
    "homework",
    "deadline",
    "due",
    "submit",
    "schedule",
    "need to",
    "have to",
    "must finish",
]


def extract_task_with_llm(user_input: str) -> dict:
    """
    Determine whether the user is creating a task and extract details.
    Uses a quick keyword pre-check to avoid burning LLM quota on simple greetings/questions.
    """
    text_lower = user_input.lower()

    # Fast check: skip LLM call if message clearly has no task-related words
    if not any(kw in text_lower for kw in TASK_TRIGGER_KEYWORDS):
        return {
            "is_task": False,
            "title": None,
            "description": None,
            "due_at": None,
        }

    prompt = f"""
You are a task extraction system.

Analyze the user's message and determine whether
the user is asking ATHENA to create a task.

USER MESSAGE:
{user_input}

Return ONLY valid JSON.

If the user is creating a task:

{{
    "is_task": true,
    "title": "short task title",
    "description": "description or null",
    "due_at": "ISO-8601 datetime or null"
}}

If the user is NOT creating a task:

{{
    "is_task": false,
    "title": null,
    "description": null,
    "due_at": null
}}

Rules:
1. Do not invent information.
2. Do not invent a deadline.
3. If the user gives an explicit date and time, convert to ISO-8601 format.
4. If the deadline cannot safely be converted, return null for due_at.
5. Keep the title concise.
6. Return ONLY raw JSON without markdown or explanations.
"""

    try:
        response = llm_service.generate_response(prompt)

        # Robust JSON extraction handling any markdown wrappers or preamble
        match = re.search(r"\{.*\}", response, re.DOTALL)
        if match:
            return json.loads(match.group(0))

        return {
            "is_task": False,
            "title": None,
            "description": None,
            "due_at": None,
        }

    except Exception as e:
        print(f"Task extraction failed: {e}")
        return {
            "is_task": False,
            "title": None,
            "description": None,
            "due_at": None,
        }


# ---------------------------------------------------------
# BEHAVIOR LOG EXTRACTION
# ---------------------------------------------------------

BEHAVIOR_TRIGGER_KEYWORDS = [
    "spending",
    "hours on",
    "minutes on",
    "social media",
    "instagram",
    "tiktok",
    "twitter",
    "facebook",
    "screen time",
    "procrastinating",
    "been wasting",
    "habit",
    "pattern",
    "i've been",
    "i have been",
]


def extract_behavior_with_llm(user_input: str) -> dict:
    """
    Determine whether the user is reporting a behavior and extract details.
    Uses keyword pre-check to avoid unnecessary LLM calls.
    """
    text_lower = user_input.lower()

    if not any(kw in text_lower for kw in BEHAVIOR_TRIGGER_KEYWORDS):
        return {"is_behavior": False, "behavior_type": None, "value": None}

    prompt = f"""
You are a behavior logging assistant.

Analyze whether the user is reporting a specific behavior
(e.g. social media usage, screen time, a habit, a routine change).

USER MESSAGE:
{user_input}

Return ONLY valid JSON.

If the user IS reporting a behavior to log:

{{
    "is_behavior": true,
    "behavior_type": "short type label such as social_media or screen_time",
    "value": "the reported value, e.g. 3 hours or 2 hours daily"
}}

If the user is NOT reporting a loggable behavior:

{{
    "is_behavior": false,
    "behavior_type": null,
    "value": null
}}

Rules:
1. Only return is_behavior=true if the user is clearly stating something
   they have been doing, not asking a question about it.
2. Use snake_case for behavior_type.
3. Do not invent values.
4. Return ONLY raw JSON.
"""

    try:
        response = llm_service.generate_response(prompt)
        match = re.search(r"\{.*\}", response, re.DOTALL)
        if match:
            return json.loads(match.group(0))
    except Exception as e:
        print(f"Behavior extraction failed: {e}")

    return {"is_behavior": False, "behavior_type": None, "value": None}


# ---------------------------------------------------------
# WELLNESS LOG EXTRACTION
# ---------------------------------------------------------

WELLNESS_TRIGGER_KEYWORDS = [
    "slept",
    "sleep",
    "hours of sleep",
    "worked out",
    "workout",
    "exercised",
    "exercise",
    "ran",
    "went for a run",
    "yoga",
    "meditation",
    "drank water",
    "water intake",
    "calories",
    "steps",
    "period",
    "cycle",
]


def extract_wellness_with_llm(user_input: str) -> dict:
    """
    Determine whether the user is reporting a wellness entry.
    """
    text_lower = user_input.lower()

    if not any(kw in text_lower for kw in WELLNESS_TRIGGER_KEYWORDS):
        return {
            "is_wellness": False,
            "category": None,
            "value": None,
            "unit": None,
            "notes": None,
        }

    prompt = f"""
You are a wellness logging assistant.

Analyze whether the user is reporting a wellness-related data point
(e.g. sleep duration, workout, exercise, hydration, general health note).

USER MESSAGE:
{user_input}

Return ONLY valid JSON.

If the user IS reporting wellness data:

{{
    "is_wellness": true,
    "category": "sleep | workout | exercise | hydration | general",
    "value": "numeric or descriptive value",
    "unit": "hours | minutes | km | glasses | null",
    "notes": "any extra detail or null"
}}

If the user is NOT reporting wellness data:

{{
    "is_wellness": false,
    "category": null,
    "value": null,
    "unit": null,
    "notes": null
}}

Rules:
1. Only return is_wellness=true if the user is clearly stating something
   they did or experienced, not asking a question about it.
2. Do not invent values.
3. Do not make medical interpretations.
4. Return ONLY raw JSON.
"""

    try:
        response = llm_service.generate_response(prompt)
        match = re.search(r"\{.*\}", response, re.DOTALL)
        if match:
            return json.loads(match.group(0))
    except Exception as e:
        print(f"Wellness extraction failed: {e}")

    return {
        "is_wellness": False,
        "category": None,
        "value": None,
        "unit": None,
        "notes": None,
    }


# ---------------------------------------------------------
# SAFETY CONTACT EXTRACTION
# ---------------------------------------------------------

SAFETY_CONTACT_TRIGGER_KEYWORDS = [
    "add",
    "emergency contact",
    "contact",
    "as my emergency",
]


def extract_emergency_contact_with_llm(user_input: str) -> dict:
    """
    Determine whether the user wants to add an emergency contact
    and whether they have provided enough information.
    """
    text_lower = user_input.lower()

    # Only trigger if both "add/save" intent and contact-related words are present
    has_add = any(w in text_lower for w in ["add", "save", "set", "register"])
    has_contact = any(
        w in text_lower
        for w in ["emergency contact", "contact", "emergency"]
    )

    if not (has_add and has_contact):
        return {
            "is_contact": False,
            "name": None,
            "phone": None,
            "relationship": None,
            "missing_fields": [],
        }

    prompt = f"""
You are a safety information extraction assistant.

Analyze whether the user wants to add an emergency contact.
Extract the name, phone number, and relationship if provided.

USER MESSAGE:
{user_input}

Return ONLY valid JSON.

If the user IS trying to add an emergency contact AND has provided
at least a name and phone number:

{{
    "is_contact": true,
    "name": "contact name",
    "phone": "phone number",
    "relationship": "relationship or null",
    "missing_fields": []
}}

If the user IS trying to add an emergency contact but is missing
required information (name or phone):

{{
    "is_contact": true,
    "name": "name if provided or null",
    "phone": "phone if provided or null",
    "relationship": "relationship if provided or null",
    "missing_fields": ["name", "phone"]
}}

(Only include fields that are actually missing in missing_fields.)

If the user is NOT trying to add an emergency contact:

{{
    "is_contact": false,
    "name": null,
    "phone": null,
    "relationship": null,
    "missing_fields": []
}}

Rules:
1. Do not invent phone numbers, names, or relationships.
2. Return ONLY raw JSON.
"""

    try:
        response = llm_service.generate_response(prompt)
        match = re.search(r"\{.*\}", response, re.DOTALL)
        if match:
            return json.loads(match.group(0))
    except Exception as e:
        print(f"Emergency contact extraction failed: {e}")

    return {
        "is_contact": False,
        "name": None,
        "phone": None,
        "relationship": None,
        "missing_fields": [],
    }


# ---------------------------------------------------------
# LIFESTYLE PREFERENCE EXTRACTION
# ---------------------------------------------------------

LIFESTYLE_TRIGGER_KEYWORDS = [
    "prefer",
    "i like",
    "i love",
    "i enjoy",
    "favorite",
    "favourite",
    "music",
    "genre",
    "pet",
    "dog",
    "cat",
    "family",
    "lifestyle",
]


def extract_lifestyle_with_llm(user_input: str) -> dict:
    """
    Determine whether the user is stating a lifestyle preference.
    """
    text_lower = user_input.lower()

    if not any(kw in text_lower for kw in LIFESTYLE_TRIGGER_KEYWORDS):
        return {
            "is_preference": False,
            "category": None,
            "key": None,
            "value": None,
        }

    prompt = f"""
You are a lifestyle preference extraction assistant.

Analyze whether the user is stating a personal preference
(e.g. music taste, pet information, family-related preference,
general lifestyle preference).

USER MESSAGE:
{user_input}

Return ONLY valid JSON.

If the user IS stating a preference:

{{
    "is_preference": true,
    "category": "music | pet | family | food | general | other",
    "key": "short snake_case key e.g. study_music or morning_routine",
    "value": "the preference value"
}}

If the user is NOT stating a preference:

{{
    "is_preference": false,
    "category": null,
    "key": null,
    "value": null
}}

Rules:
1. Only return is_preference=true if the user is clearly stating
   a preference, not asking a question about one.
2. Do not invent values.
3. Do not reference Spotify or external services.
4. Return ONLY raw JSON.
"""

    try:
        response = llm_service.generate_response(prompt)
        match = re.search(r"\{.*\}", response, re.DOTALL)
        if match:
            return json.loads(match.group(0))
    except Exception as e:
        print(f"Lifestyle extraction failed: {e}")

    return {
        "is_preference": False,
        "category": None,
        "key": None,
        "value": None,
    }


# ---------------------------------------------------------
# REMINDER EXTRACTION
# ---------------------------------------------------------

REMINDER_TRIGGER_KEYWORDS = [
    "remind",
    "reminder",
    "set a reminder",
    "remind me",
    "don't let me forget",
    "dont let me forget",
    "alert me",
    "remember to",
    "notify me",
]

# Timezone assumption: server uses UTC unless a project-wide tz is configured.
# All relative dates ("tomorrow", "next Monday") are resolved against UTC now.
# The ISO-8601 string stored in Supabase will carry the UTC offset.
_SERVER_TZ = timezone.utc


def _resolve_relative_date(remind_at_str: str) -> str | None:
    """
    Convert a relative or explicit date/time string from Gemini into
    a UTC ISO-8601 datetime string suitable for PostgreSQL timestamptz.

    Returns None when the string is ambiguous or cannot be safely parsed.

    Supported patterns:
      - Already ISO-8601 (passed through as-is)
      - "tomorrow at HH:MM" / "tomorrow at H PM"
      - "today at HH:MM" / "today at H PM"
      - Anything else → None (ask user for clarification)
    """
    if not remind_at_str:
        return None

    s = remind_at_str.strip()

    # If it already looks like an ISO-8601 datetime, return it directly
    iso_re = re.compile(
        r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}",
        re.IGNORECASE,
    )
    if iso_re.match(s):
        # Validate it parses correctly
        try:
            datetime.fromisoformat(
                s.replace("Z", "+00:00")
            )
            return s
        except ValueError:
            return None

    # Relative patterns
    now = datetime.now(_SERVER_TZ)

    # "tomorrow at H PM", "tomorrow at HH:MM"
    tomorrow_re = re.compile(
        r"^tomorrow\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$",
        re.IGNORECASE,
    )
    today_re = re.compile(
        r"^today\s+at\s+(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$",
        re.IGNORECASE,
    )

    for pattern, day_offset in [(tomorrow_re, 1), (today_re, 0)]:
        m = pattern.match(s)
        if m:
            hour = int(m.group(1))
            minute = int(m.group(2)) if m.group(2) else 0
            meridiem = (m.group(3) or "").lower()

            if meridiem == "pm" and hour != 12:
                hour += 12
            elif meridiem == "am" and hour == 12:
                hour = 0

            if not (0 <= hour <= 23 and 0 <= minute <= 59):
                return None

            target = (now + timedelta(days=day_offset)).replace(
                hour=hour, minute=minute, second=0, microsecond=0,
                tzinfo=_SERVER_TZ,
            )
            return target.isoformat()

    # Unrecognised pattern — cannot safely convert
    return None


def extract_reminder_with_llm(user_input: str) -> dict:
    """
    Determine whether the user is creating a reminder and extract details.
    The LLM returns a raw date/time string; _resolve_relative_date() converts it.
    Returns a dict with keys: is_reminder, title, description, remind_at, ambiguous.
    """
    text_lower = user_input.lower()

    if not any(kw in text_lower for kw in REMINDER_TRIGGER_KEYWORDS):
        return {
            "is_reminder": False,
            "title": None,
            "description": None,
            "remind_at": None,
            "ambiguous": False,
        }

    # Provide today's date to help the LLM resolve relative expressions
    today_str = datetime.now(_SERVER_TZ).strftime("%Y-%m-%d")

    prompt = f"""
You are a reminder extraction assistant. Today's date is {today_str}.

Analyze the user's message and determine whether
they are asking to create a reminder.

USER MESSAGE:
{user_input}

Return ONLY valid JSON.

If the user IS creating a reminder with a clear date and time:

{{
    "is_reminder": true,
    "title": "short reminder title",
    "description": "extra detail or null",
    "remind_at": "ISO-8601 datetime if fully explicit, OR a string like 'tomorrow at 7 PM' or 'today at 3:30 PM'"
}}

If the user IS creating a reminder but the time is ambiguous
(e.g. 'sometime tomorrow', 'later today', no specific time given):

{{
    "is_reminder": true,
    "title": "short reminder title",
    "description": null,
    "remind_at": null
}}

If the user is NOT creating a reminder:

{{
    "is_reminder": false,
    "title": null,
    "description": null,
    "remind_at": null
}}

Rules:
1. Do NOT invent a date or time that the user did not provide.
2. If the user says 'tomorrow at 7 PM', set remind_at to 'tomorrow at 7 PM'.
3. If the user gives a full explicit date like 'October 5, 2026 at 8 AM',
   convert to ISO-8601: '2026-10-05T08:00:00+00:00'.
4. If the time is vague or missing, set remind_at to null.
5. Keep title concise.
6. Return ONLY raw JSON without markdown.
"""

    try:
        response = llm_service.generate_response(prompt)
        match = re.search(r"\{.*\}", response, re.DOTALL)
        if match:
            extracted = json.loads(match.group(0))

            is_reminder = extracted.get("is_reminder", False)
            title = extracted.get("title")
            description = extracted.get("description")
            raw_remind_at = extracted.get("remind_at")

            if not is_reminder:
                return {
                    "is_reminder": False,
                    "title": None,
                    "description": None,
                    "remind_at": None,
                    "ambiguous": False,
                }

            # Try to resolve the date/time
            resolved_remind_at = None
            ambiguous = False

            if raw_remind_at:
                resolved_remind_at = _resolve_relative_date(raw_remind_at)
                if resolved_remind_at is None:
                    # Could not parse — treat as ambiguous
                    ambiguous = True
            else:
                # LLM returned null remind_at — time is missing/vague
                ambiguous = True

            return {
                "is_reminder": True,
                "title": title,
                "description": description,
                "remind_at": resolved_remind_at,
                "ambiguous": ambiguous,
            }

    except Exception as e:
        print(f"Reminder extraction failed: {e}")

    return {
        "is_reminder": False,
        "title": None,
        "description": None,
        "remind_at": None,
        "ambiguous": False,
    }


# ---------------------------------------------------------
# REMINDER COMPLETION INTENT (Deterministic)
# ---------------------------------------------------------

def extract_reminder_completion_intent(text: str) -> str | None:
    """
    Detects deterministic completion intent for reminders such as:
    - mark my X reminder as completed
    - complete my X reminder
    - mark X as done
    - I've finished X
    - finish my X reminder
    - done with my X reminder
    """
    text_clean = text.strip().rstrip(".!").strip()

    patterns = [
        # "mark [my/the] X as completed/done/finished"
        r"^(?:please\s+)?mark\s+(?:my\s+|the\s+)?(.+?)\s+as\s+(?:completed|complete|done|finished)$",
        # "complete [my/the] X [reminder/task]"
        r"^(?:please\s+)?complete\s+(?:my\s+|the\s+)?(.+?)$",
        # "finish [my/the] X [reminder/task]"
        r"^(?:please\s+)?finish\s+(?:my\s+|the\s+)?(.+?)$",
        # "I've / I have / I finished/completed [my/the] X [reminder/task]"
        r"^(?:i've|i have|i)\s+(?:finished|completed)\s+(?:my\s+|the\s+)?(.+?)$",
        # "done with [my/the] X [reminder/task]"
        r"^(?:i'm\s+|i am\s+)?done\s+with\s+(?:my\s+|the\s+)?(.+?)$",
    ]

    for pattern in patterns:
        match = re.search(pattern, text_clean, re.IGNORECASE)
        if match:
            target = match.group(1).strip()
            if target:
                return target

    return None


def find_matching_reminder(search_target: str, reminders: list[dict]) -> list[dict]:
    """
    Matches a search target against a list of reminders by title and description.
    Handles phrases like 'ML reminder' matching 'Study ML'.
    """
    if not reminders or not search_target:
        return []

    target_lower = search_target.lower().strip()
    cleaned_target = re.sub(
        r"\b(reminder|reminders|task|tasks|my|the|a|an)\b",
        "",
        target_lower,
        flags=re.IGNORECASE,
    ).strip()

    matches = []
    for r in reminders:
        title = (r.get("title") or "").lower()
        desc = (r.get("description") or "").lower()

        # 1. Direct substring match
        if target_lower in title or target_lower in desc or title in target_lower:
            matches.append(r)
            continue
        if cleaned_target and (
            cleaned_target in title
            or cleaned_target in desc
            or title in cleaned_target
        ):
            matches.append(r)
            continue

        # 2. Word-level match
        words = [w for w in cleaned_target.split() if len(w) > 1]
        if words and any(w in title or w in desc for w in words):
            matches.append(r)
            continue

    # Deduplicate by id
    unique = []
    seen = set()
    for m in matches:
        if m["id"] not in seen:
            seen.add(m["id"])
            unique.append(m)

    return unique


# ---------------------------------------------------------
# REMINDER & TASK ACTION INTENT (Complete / Delete)
# ---------------------------------------------------------

ACTION_TRIGGER_KEYWORDS = [
    "mark",
    "complete",
    "completed",
    "done",
    "finish",
    "finished",
    "cancel",
    "delete",
    "remove",
    "clear",
    "discard",
]


def extract_action_intent_with_llm(user_input: str) -> dict:
    """
    Determine whether the user is asking to mark completed or cancel/delete
    an existing task or reminder when not caught by deterministic patterns.
    """
    text_lower = user_input.lower()

    if not any(kw in text_lower for kw in ACTION_TRIGGER_KEYWORDS):
        return {"action": None, "target": None, "type": None}

    prompt = f"""
You are an intent extraction assistant for a digital twin AI.
Analyze whether the user is asking to complete or delete/cancel an existing task or reminder.

USER MESSAGE:
{user_input}

Return ONLY valid JSON:
{{
    "action": "complete" | "delete" | null,
    "target": "short topic or title of the item (e.g. 'Study ML') or null",
    "type": "reminder" | "task" | "any" | null
}}

Rules:
1. Examples for "complete": "mark study ML as completed", "finished study ML", "done with study ML", "complete reminder study ML", "mark study ML done".
2. Examples for "delete": "cancel my study ML reminder", "delete task study ML", "remove reminder for meeting".
3. If user is creating a new reminder or task, action must be null.
4. If user is NOT asking to complete or delete an item, return all nulls.
5. Return ONLY raw JSON.
"""

    try:
        response = llm_service.generate_response(prompt)
        match = re.search(r"\{.*\}", response, re.DOTALL)
        if match:
            return json.loads(match.group(0))
    except Exception as e:
        print(f"Action intent extraction failed: {e}")

    return {"action": None, "target": None, "type": None}


# ---------------------------------------------------------
# CHAT ENDPOINT
# ---------------------------------------------------------

@router.post("", response_model=ChatResponse)
def chat(
    data: ChatRequest,
    user=Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
):
    try:
        # -------------------------------------------------
        # AUTH
        # -------------------------------------------------
        user_id = user.id
        token = credentials.credentials

        # -------------------------------------------------
        # 1. DETERMINISTIC REMINDER COMPLETION (Immediate Execution)
        # -------------------------------------------------
        completion_target = extract_reminder_completion_intent(data.message)
        if completion_target:
            try:
                active_reminders = get_reminders(
                    user_id=user_id,
                    token=token,
                    limit=50,
                )
                matches = find_matching_reminder(
                    completion_target,
                    active_reminders or [],
                )

                if len(matches) == 0:
                    resp_text = f"I couldn't find an active reminder matching '{completion_target}'."
                    save_message(
                        user_id=user_id,
                        role="user",
                        message=data.message,
                        token=token,
                    )
                    save_message(
                        user_id=user_id,
                        role="assistant",
                        message=resp_text,
                        token=token,
                    )
                    return {"response": resp_text}

                elif len(matches) > 1:
                    resp_text = "I found multiple reminders that could match. Which one do you want to complete?"
                    save_message(
                        user_id=user_id,
                        role="user",
                        message=data.message,
                        token=token,
                    )
                    save_message(
                        user_id=user_id,
                        role="assistant",
                        message=resp_text,
                        token=token,
                    )
                    return {"response": resp_text}

                else:
                    matched = matches[0]
                    update_reminder(
                        reminder_id=matched["id"],
                        user_id=user_id,
                        completed=True,
                        token=token,
                    )
                    resp_text = f"Done — I've marked your '{matched.get('title')}' reminder as completed."
                    save_message(
                        user_id=user_id,
                        role="user",
                        message=data.message,
                        token=token,
                    )
                    save_message(
                        user_id=user_id,
                        role="assistant",
                        message=resp_text,
                        token=token,
                    )
                    return {"response": resp_text}

            except Exception as e:
                print(f"Direct reminder completion error: {e}")

        # -------------------------------------------------
        # TASK CREATION
        # -------------------------------------------------
        task_data = extract_task_with_llm(data.message)
        created_task = None

        if task_data.get("is_task") and task_data.get("title"):
            try:
                created_task = create_task(
                    user_id=user_id,
                    title=task_data["title"],
                    description=task_data.get("description"),
                    due_at=task_data.get("due_at"),
                    token=token,
                )
                print(f"Created task: {created_task}")
            except Exception as e:
                print(f"Warning: could not create task: {e}")

        # -------------------------------------------------
        # BEHAVIOR LOG CREATION
        # -------------------------------------------------
        behavior_data = extract_behavior_with_llm(data.message)
        created_behavior = None

        if behavior_data.get("is_behavior") and behavior_data.get("behavior_type"):
            try:
                created_behavior = create_behavior_log(
                    user_id=user_id,
                    behavior_type=behavior_data["behavior_type"],
                    value=behavior_data.get("value"),
                    token=token,
                )
                print(f"Created behavior log: {created_behavior}")
            except Exception as e:
                print(f"Warning: could not create behavior log: {e}")

        # -------------------------------------------------
        # WELLNESS LOG CREATION
        # -------------------------------------------------
        wellness_data = extract_wellness_with_llm(data.message)
        created_wellness = None

        if wellness_data.get("is_wellness") and wellness_data.get("category"):
            try:
                created_wellness = create_wellness_log(
                    user_id=user_id,
                    category=wellness_data["category"],
                    value=wellness_data.get("value"),
                    unit=wellness_data.get("unit"),
                    notes=wellness_data.get("notes"),
                    token=token,
                )
                print(f"Created wellness log: {created_wellness}")
            except Exception as e:
                print(f"Warning: could not create wellness log: {e}")

        # -------------------------------------------------
        # LIFESTYLE PREFERENCE CREATION
        # -------------------------------------------------
        lifestyle_data = extract_lifestyle_with_llm(data.message)
        created_lifestyle = None

        if (
            lifestyle_data.get("is_preference")
            and lifestyle_data.get("category")
            and lifestyle_data.get("key")
        ):
            try:
                created_lifestyle = create_lifestyle_preference(
                    user_id=user_id,
                    category=lifestyle_data["category"],
                    key=lifestyle_data["key"],
                    value=lifestyle_data.get("value"),
                    token=token,
                )
                print(f"Created lifestyle preference: {created_lifestyle}")
            except Exception as e:
                print(f"Warning: could not create lifestyle preference: {e}")

        # -------------------------------------------------
        # EMERGENCY CONTACT CREATION
        # -------------------------------------------------
        contact_data = extract_emergency_contact_with_llm(data.message)
        created_contact = None
        contact_missing_fields = []

        if contact_data.get("is_contact"):
            missing = contact_data.get("missing_fields", [])
            if missing:
                # Ask the user for missing fields instead of creating an incomplete record
                contact_missing_fields = missing
                print(
                    f"Emergency contact intent detected but missing fields: {missing}"
                )
            elif contact_data.get("name") and contact_data.get("phone"):
                try:
                    created_contact = create_emergency_contact(
                        user_id=user_id,
                        name=contact_data["name"],
                        phone=contact_data["phone"],
                        relationship=contact_data.get("relationship"),
                        token=token,
                    )
                    print(f"Created emergency contact: {created_contact}")
                except Exception as e:
                    print(f"Warning: could not create emergency contact: {e}")

        # -------------------------------------------------
        # REMINDER CREATION
        # -------------------------------------------------
        reminder_data = extract_reminder_with_llm(data.message)
        created_reminder = None
        reminder_ambiguous = False

        if reminder_data.get("is_reminder"):
            if reminder_data.get("ambiguous"):
                # Time is missing or vague — do not create; flag for ATHENA
                reminder_ambiguous = True
                print("Reminder intent detected but time is ambiguous")
            elif reminder_data.get("title") and reminder_data.get("remind_at"):
                try:
                    created_reminder = create_reminder(
                        user_id=user_id,
                        title=reminder_data["title"],
                        remind_at=reminder_data["remind_at"],
                        description=reminder_data.get("description"),
                        token=token,
                    )
                    print(f"Created reminder: {created_reminder}")
                except Exception as e:
                    print(f"Warning: could not create reminder: {e}")

        # -------------------------------------------------
        # ACTION INTENTS: COMPLETE / DELETE REMINDER OR TASK
        # -------------------------------------------------
        completed_reminder = None
        cancelled_reminder = None
        completed_task = None
        deleted_task = None

        action_data = extract_action_intent_with_llm(data.message)
        action = action_data.get("action")
        target = (action_data.get("target") or "").strip().lower()

        if action and target:
            # 1. Search in Reminders
            try:
                active_reminders = get_reminders(
                    user_id=user_id,
                    token=token,
                    limit=50,
                )
                rem_matches = [
                    r for r in (active_reminders or [])
                    if target in (r.get("title") or "").lower()
                    or (r.get("title") or "").lower() in target
                ]

                if rem_matches:
                    match_rem = rem_matches[0]
                    if action == "complete":
                        update_reminder(
                            reminder_id=match_rem["id"],
                            user_id=user_id,
                            token=token,
                            completed=True,
                        )
                        completed_reminder = match_rem
                        print(f"Marked reminder complete: {completed_reminder}")
                    elif action == "delete":
                        delete_reminder(
                            reminder_id=match_rem["id"],
                            user_id=user_id,
                            token=token,
                        )
                        cancelled_reminder = match_rem
                        print(f"Deleted reminder: {cancelled_reminder}")
            except Exception as e:
                print(f"Warning: could not process reminder action: {e}")

            # 2. Search in Tasks if not matched in reminders or explicitly a task
            if not completed_reminder and not cancelled_reminder:
                try:
                    all_tasks = get_tasks(user_id=user_id, token=token)
                    task_matches = [
                        t for t in (all_tasks or [])
                        if target in (t.get("title") or "").lower()
                        or (t.get("title") or "").lower() in target
                    ]

                    if task_matches:
                        match_task = task_matches[0]
                        if action == "complete":
                            update_task(
                                task_id=match_task["id"],
                                user_id=user_id,
                                updates={"status": "completed"},
                                token=token,
                            )
                            completed_task = match_task
                            print(f"Marked task complete: {completed_task}")
                        elif action == "delete":
                            delete_task(
                                task_id=match_task["id"],
                                user_id=user_id,
                                token=token,
                            )
                            deleted_task = match_task
                            print(f"Deleted task: {deleted_task}")
                except Exception as e:
                    print(f"Warning: could not process task action: {e}")

        # -------------------------------------------------
        # USER CONTEXT (Single fetch — includes all new tables)
        # -------------------------------------------------

        context = get_user_context(user_id, token=token)

        # Inform the orchestrator about newly created/modified records
        if created_task:
            context["newly_created_task"] = created_task

        if completed_task:
            context["newly_completed_task"] = completed_task

        if deleted_task:
            context["newly_deleted_task"] = deleted_task

        if created_reminder:
            context["newly_created_reminder"] = created_reminder

        if completed_reminder:
            context["newly_completed_reminder"] = completed_reminder

        if cancelled_reminder:
            context["newly_cancelled_reminder"] = cancelled_reminder

        if reminder_ambiguous:
            context["reminder_ambiguous"] = True

        if created_behavior:
            context["newly_created_behavior"] = created_behavior

        if created_wellness:
            context["newly_created_wellness"] = created_wellness

        if created_lifestyle:
            context["newly_created_lifestyle"] = created_lifestyle

        if created_contact:
            context["newly_created_contact"] = created_contact

        if contact_missing_fields:
            context["contact_missing_fields"] = contact_missing_fields

        # -------------------------------------------------
        # CONVERSATION HISTORY
        # -------------------------------------------------
        try:
            history = get_conversation_history(
                user_id=user_id,
                limit=20,
                token=token,
            )
            context["conversation_history"] = history or []
        except Exception as e:
            print(f"Warning: could not fetch conversation history: {e}")
            context["conversation_history"] = []

        # -------------------------------------------------
        # MEMORY PERSISTENCE
        # -------------------------------------------------
        memory_to_save = extract_memory_intent(data.message)
        if memory_to_save:
            try:
                save_memory(
                    user_id=user_id,
                    memory=memory_to_save,
                    token=token,
                )
                if memory_to_save not in context.get("memories", []):
                    context.setdefault("memories", []).append(memory_to_save)

                print(f"Saved memory for user {user_id}: {memory_to_save}")
            except Exception as e:
                print(f"Warning: could not save memory to Supabase: {e}")

        # -------------------------------------------------
        # DEBUG CONTEXT
        # -------------------------------------------------
        print("USER CONTEXT:")
        print(context)

        # -------------------------------------------------
        # SAVE USER MESSAGE
        # -------------------------------------------------
        save_message(
            user_id=user_id,
            role="user",
            message=data.message,
            token=token,
        )

        # -------------------------------------------------
        # ORCHESTRATOR
        # -------------------------------------------------
        result = orchestrator.process(
            user_input=data.message,
            context=context,
            llm_service=llm_service,
        )

        response = result["response"]

        # -------------------------------------------------
        # SAVE ASSISTANT RESPONSE
        # -------------------------------------------------
        save_message(
            user_id=user_id,
            role="assistant",
            message=response,
            token=token,
        )

        # -------------------------------------------------
        # RESPONSE
        # -------------------------------------------------
        return {"response": response}

    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Chat processing failed: {str(e)}",
        )
