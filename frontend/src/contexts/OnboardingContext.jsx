import { createContext, useContext, useState, useCallback } from 'react';

const OnboardingContext = createContext(null);

const INITIAL_STATE = {
  // Step: personal
  fullName: '',
  age: '',
  gender: '',
  currentStatus: '',
  hobbies: [],
  customHobby: '',

  // Step: lifestyle (food + mood)
  favoriteFoods: [],
  favoriteCuisines: [],
  favoriteSnacks: [],
  favoriteDrinks: [],
  dislikedFoods: [],
  dietaryPreference: '',
  moodPreferences: {
    bored: [],
    sad: [],
    happy: [],
    angry: [],
    stressed: [],
  },
  socialMediaPlatforms: [],
  socialMediaUsage: {},

  // Step: wellness
  hasHealthConditions: false,
  healthConditions: '',
  allergies: '',
  medicines: [],
  periodTrackingEnabled: false,
  periodData: {
    lastPeriodDate: '',
    averageCycleLength: 28,
    averagePeriodDuration: 5,
    symptoms: [],
  },
  height: '',
  weight: '',
  doesWorkout: false,
  workoutType: '',
  workoutDaysPerWeek: '',
  workoutPreferredTime: '',
  workoutGoal: '',
  bedtime: '',
  wakeTime: '',
  sleepQuality: '',

  // Step: productivity
  tasks: [],
  assignments: [],
  dailyGoals: [],

  // Step: pets
  hasPet: false,
  petData: {
    name: '',
    animal: '',
    breed: '',
    age: '',
    food: '',
    feedingSchedule: [],
    feedingQuantity: '',
    medication: '',
    vetInfo: '',
    careRequirements: '',
  },

  // Step: integrations
  spotifyUsername: '',
  spotifyConnect: false,
  youtubeConnect: false,

  // Step: safety
  emergencyContacts: [],
  sosSettings: {
    autoEscalation: false,
    timeout: 60,
    escalationMethod: 'both',
  },

  // Step: permissions
  permissions: {
    notifications: false,
    spotify: false,
    youtube: false,
    healthInfo: false,
    safetyFeatures: false,
  },
};

export function OnboardingProvider({ children }) {
  const [data, setData] = useState(INITIAL_STATE);
  const [currentStep, setCurrentStep] = useState(0);

  const updateData = useCallback((updates) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetOnboarding = useCallback(() => {
    setData(INITIAL_STATE);
    setCurrentStep(0);
  }, []);

  return (
    <OnboardingContext.Provider value={{ data, updateData, currentStep, setCurrentStep, resetOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
}
