import apiClient, { DEMO_MODE } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import { mockBehaviorInsights } from './mockData';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const behaviorApi = {
  async getPatterns() {
    if (DEMO_MODE) { await delay(600); return mockBehaviorInsights.patterns; }
    const res = await apiClient.get(API_ENDPOINTS.behavior.patterns);
    return res.data;
  },

  async getInsights() {
    if (DEMO_MODE) { await delay(500); return mockBehaviorInsights.insights; }
    const res = await apiClient.get(API_ENDPOINTS.behavior.insights);
    return res.data;
  },
};
