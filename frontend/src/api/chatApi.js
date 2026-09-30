import apiClient, { DEMO_MODE } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import { mockChatHistory } from './mockData';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const demoResponses = [
  "I understand! Based on your profile and current schedule, let me help you with that. Your productivity patterns suggest you work best in the evening — so consider tackling demanding tasks between 6 PM and 10 PM.",
  "Great question! Looking at your recent activity, I can see some patterns worth noting. Remember, I'm here to help you stay on track, not to pressure you.",
  "Based on what I know about you, here's my suggestion: Start with your highest-priority task first, then take a short break before moving to the next one.",
  "I noticed you've been consistent with your habits this week — that's excellent! Your streak is currently at 5 days. Keep going!",
  "Your wellness data shows you've been averaging about 7.5 hours of sleep. That's a great baseline. How are you feeling today?",
];

let demoMsgIdx = 0;

export const chatApi = {
  async sendMessage(message, context = {}) {
    if (DEMO_MODE) {
      await delay(1200 + Math.random() * 800);
      const response = demoResponses[demoMsgIdx % demoResponses.length];
      demoMsgIdx++;
      return {
        response,
        selected_agents: ['productivity', 'memory'],
        agent_results: {},
      };
    }
    const res = await apiClient.post(API_ENDPOINTS.chat.send, { message, context });
    return res.data;
  },

  async getHistory() {
    if (DEMO_MODE) { await delay(300); return mockChatHistory; }
    const res = await apiClient.get(API_ENDPOINTS.chat.history);
    return res.data;
  },
};
