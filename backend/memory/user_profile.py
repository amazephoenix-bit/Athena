from datetime import datetime


class UserProfile:

    def __init__(self):

        self.personal_information = {}

        self.preferences = {}

        self.hobbies = []

        self.routines = {}

        self.habits = {}

        self.productivity_patterns = {}

        self.lifestyle = {}

        self.observations = []

        self.learned_patterns = []

    def add_preference(self, key, value):

        self.preferences[key] = value

    def add_hobby(self, hobby):

        if hobby not in self.hobbies:
            self.hobbies.append(hobby)

    def update_routine(self, key, value):

        self.routines[key] = value

    def update_habit(self, key, value):

        self.habits[key] = value

    def add_observation(self, observation, category):

        self.observations.append({
            "observation": observation,
            "category": category,
            "timestamp": datetime.now().isoformat()
        })

    def add_learned_pattern(
        self,
        pattern,
        category,
        confidence=0.5
    ):

        self.learned_patterns.append({
            "pattern": pattern,
            "category": category,
            "confidence": confidence,
            "timestamp": datetime.now().isoformat()
        })

    def get_profile(self):

        return {
            "personal_information":
                self.personal_information,

            "preferences":
                self.preferences,

            "hobbies":
                self.hobbies,

            "routines":
                self.routines,

            "habits":
                self.habits,

            "productivity_patterns":
                self.productivity_patterns,

            "lifestyle":
                self.lifestyle,

            "observations":
                self.observations,

            "learned_patterns":
                self.learned_patterns
        }