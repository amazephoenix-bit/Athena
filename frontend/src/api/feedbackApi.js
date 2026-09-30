import apiClient, { DEMO_MODE } from './apiClient';
import { API_ENDPOINTS } from './endpoints';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const feedbackApi = {
  async submitFeedback(data) {
    if (DEMO_MODE) {
      await delay(800);
      return { success: true, message: 'Thank you for your feedback! (Demo Mode)' };
    }
    const res = await apiClient.post(API_ENDPOINTS.feedback.submit, data);
    return res.data;
  },
};
