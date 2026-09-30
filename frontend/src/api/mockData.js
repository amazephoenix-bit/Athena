/**
 * DEMO MODE mock data — used when VITE_DEMO_MODE=true or backend is unavailable.
 * All demo data is clearly labeled and never presented as real connected data.
 */

export const mockUser = {
  id: 'demo-user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: null,
  onboardingComplete: true,
  personalInformation: {
    fullName: 'Alex Johnson',
    age: 21,
    gender: 'prefer_not_to_say',
    currentStatus: 'student',
  },
  preferences: {
    theme: 'dark',
    notifications: true,
    studyTime: 'evening',
  },
  hobbies: ['Music', 'Gaming', 'Coding', 'Reading'],
  foodPreferences: {
    favorites: ['Biryani', 'Pizza', 'Ramen'],
    cuisines: ['Indian', 'Italian', 'Japanese'],
    dietary: 'non_vegetarian',
    dislikes: ['Bitter gourd'],
    drinks: ['Coffee', 'Green Tea'],
    snacks: ['Chips', 'Chocolate'],
  },
  moodPreferences: {
    bored: ['Music', 'Gaming', 'YouTube'],
    sad: ['Music', 'Sleep', 'Talk to friends'],
    happy: ['Gaming', 'Go outside', 'Music'],
    angry: ['Music', 'Sleep', 'Gaming'],
    stressed: ['Music', 'Go outside', 'Eat'],
  },
  rewards: {
    points: 420,
    streak: 5,
    totalCompleted: 23,
  },
};

export const mockTasks = [
  {
    id: 't1',
    title: 'Complete AI Assignment',
    description: 'Finish the machine learning project report',
    deadline: new Date(Date.now() + 86400000).toISOString(),
    priority: 'high',
    category: 'academic',
    status: 'in_progress',
    recurring: false,
    estimatedDuration: 120,
    createdAt: new Date().toISOString(),
  },
  {
    id: 't2',
    title: 'Study for Data Structures Exam',
    description: 'Cover trees, graphs, and dynamic programming',
    deadline: new Date(Date.now() + 172800000).toISOString(),
    priority: 'high',
    category: 'academic',
    status: 'todo',
    recurring: false,
    estimatedDuration: 180,
    createdAt: new Date().toISOString(),
  },
  {
    id: 't3',
    title: 'Workout — Chest Day',
    description: 'Bench press, push-ups, cable fly',
    deadline: new Date().toISOString(),
    priority: 'medium',
    category: 'fitness',
    status: 'todo',
    recurring: true,
    estimatedDuration: 60,
    createdAt: new Date().toISOString(),
  },
  {
    id: 't4',
    title: 'Read 30 minutes',
    description: 'Continue Atomic Habits',
    deadline: new Date().toISOString(),
    priority: 'low',
    category: 'personal',
    status: 'completed',
    recurring: true,
    estimatedDuration: 30,
    createdAt: new Date().toISOString(),
  },
];

export const mockReminders = [
  {
    id: 'r1',
    title: 'Take Vitamin D',
    type: 'medicine',
    date: new Date().toISOString(),
    time: '08:00',
    repeat: 'daily',
    status: 'pending',
  },
  {
    id: 'r2',
    title: 'Data Structures Exam',
    type: 'exam',
    date: new Date(Date.now() + 86400000).toISOString(),
    time: '10:00',
    repeat: 'none',
    status: 'pending',
  },
  {
    id: 'r3',
    title: 'Evening Workout',
    type: 'habit',
    date: new Date().toISOString(),
    time: '18:00',
    repeat: 'daily',
    status: 'pending',
  },
  {
    id: 'r4',
    title: 'Feed Bruno',
    type: 'pet',
    date: new Date().toISOString(),
    time: '07:00',
    repeat: 'daily',
    status: 'completed',
  },
  {
    id: 'r5',
    title: 'Team Meeting — ATHENA',
    type: 'meeting',
    date: new Date(Date.now() + 3600000).toISOString(),
    time: '14:00',
    repeat: 'none',
    status: 'pending',
  },
];

export const mockMemories = [
  {
    id: 'm1',
    type: 'explicit',
    category: 'preference',
    content: 'Prefers studying in the evening.',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'm2',
    type: 'explicit',
    category: 'food',
    content: 'Favorite food: Biryani.',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'm3',
    type: 'learned',
    category: 'productivity',
    content: 'Appears to be most productive between 6 PM and 11 PM.',
    confidence: 0.78,
    timestamp: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: 'm4',
    type: 'observed',
    category: 'behavior',
    content: 'Social media usage tends to increase after 10 PM.',
    timestamp: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: 'm5',
    type: 'explicit',
    category: 'hobby',
    content: 'Enjoys gaming on weekends.',
    timestamp: new Date(Date.now() - 432000000).toISOString(),
  },
];

export const mockBehaviorInsights = {
  patterns: [
    {
      id: 'b1',
      label: 'Study Pattern',
      value: 'Evening',
      detail: 'Typical productive period: 6 PM – 11 PM',
      confidence: 0.82,
    },
    {
      id: 'b2',
      label: 'Social Media',
      value: 'High after 10 PM',
      detail: 'ATHENA noticed higher screen activity late at night.',
      confidence: 0.71,
    },
    {
      id: 'b3',
      label: 'Workout Consistency',
      value: '4 days/week',
      detail: 'Based on your recorded activity.',
      confidence: 0.65,
    },
  ],
  insights: [
    'Your recent activity suggests you prefer evening study sessions.',
    'ATHENA noticed higher social media usage on weekdays.',
    'You tend to complete more tasks when you have fewer distractions in the evening.',
  ],
};

export const mockWellness = {
  sleep: {
    bedtime: '23:30',
    wakeTime: '07:00',
    averageDuration: 7.5,
    quality: 'good',
  },
  workout: {
    doesWorkout: true,
    type: 'Gym',
    daysPerWeek: 4,
    preferredTime: '18:00',
    goal: 'Muscle gain',
  },
  periodTracking: {
    enabled: false,
  },
  bmi: {
    height: 175,
    weight: 70,
    bmi: 22.9,
    category: 'Normal weight',
  },
};

export const mockPet = {
  hasPet: true,
  name: 'Bruno',
  animal: 'Dog',
  breed: 'Labrador',
  age: 3,
  food: 'Royal Canin',
  feedingSchedule: ['07:00', '13:00', '19:00'],
  feedingQuantity: '1 cup',
  medication: null,
  vetInfo: 'Dr. Sharma — City Vet Clinic',
  careChecklist: [
    { task: 'Morning food', done: true, time: '07:00' },
    { task: 'Afternoon food', done: false, time: '13:00' },
    { task: 'Evening food', done: false, time: '19:00' },
    { task: 'Evening walk', done: false, time: '18:30' },
  ],
};

export const mockRewards = {
  points: 420,
  streak: 5,
  tasksCompleted: 23,
  achievements: [
    { id: 'ach1', icon: '🔥', title: '5-Day Streak', description: 'Maintained a 5-day daily streak' },
    { id: 'ach2', icon: '✅', title: 'Task Master', description: 'Completed 20+ tasks' },
    { id: 'ach3', icon: '🧠', title: 'Twin Activated', description: 'Completed onboarding setup' },
  ],
  history: [
    { id: 'rh1', action: 'Completed task — AI Assignment', points: 10 },
    { id: 'rh2', action: 'Daily goals all achieved', points: 50 },
    { id: 'rh3', action: 'Weekly consistency bonus', points: 100 },
    { id: 'rh4', action: 'Mood check-in logged', points: 5 },
    { id: 'rh5', action: 'Streak day 5', points: 20 },
  ],
  available: [
    { id: 'av1', title: '₹50 Food Voucher', description: 'Redeem at partner restaurants', cost: 500, icon: '🍕' },
    { id: 'av2', title: 'Music Premium Coupon', description: '1 month Spotify Premium', cost: 750, icon: '🎵' },
    { id: 'av3', title: 'Coffee Voucher', description: 'Free coffee at Cafe Coffee Day', cost: 1000, icon: '☕' },
    { id: 'av4', title: 'Mystery Reward', description: 'A surprise reward unlocked at 1500 points', cost: 1500, icon: '🎁' },
  ],
};

export const mockChatHistory = [
  {
    id: 'c1',
    role: 'assistant',
    content: "Hello! I'm ATHENA, your personal digital twin. How can I help you today?",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    selectedAgents: [],
  },
  {
    id: 'c2',
    role: 'user',
    content: 'What are my tasks for today?',
    timestamp: new Date(Date.now() - 3500000).toISOString(),
  },
  {
    id: 'c3',
    role: 'assistant',
    content: "Based on your schedule, here are your tasks for today:\n\n• **Complete AI Assignment** (High priority — due tomorrow)\n• **Workout — Chest Day** (Medium priority — 6:00 PM)\n• **Study for Data Structures** (High priority)\n\nYou already completed your reading session — great work! 🎉",
    timestamp: new Date(Date.now() - 3400000).toISOString(),
    selectedAgents: ['productivity', 'reminder'],
  },
];
