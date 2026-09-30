import apiClient, { DEMO_MODE } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import { mockUser } from './mockData';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const userApi = {
  async getProfile() {
    if (DEMO_MODE) { await delay(400); return mockUser; }
    const res = await apiClient.get(API_ENDPOINTS.user.profile);
    return res.data;
  },

  async updateProfile(data) {
    if (DEMO_MODE) { await delay(600); return { ...mockUser, ...data }; }
    const res = await apiClient.put(API_ENDPOINTS.user.update, data);
    return res.data;
  },

  async saveOnboarding(data) {
    if (DEMO_MODE) { await delay(1000); return { success: true }; }
    const res = await apiClient.post(API_ENDPOINTS.user.onboarding, data);
    return res.data;
  },

  async completeOnboarding() {
    if (DEMO_MODE) { await delay(400); return { success: true }; }
    const res = await apiClient.post(API_ENDPOINTS.user.onboardingComplete);
    return res.data;
  },
};
