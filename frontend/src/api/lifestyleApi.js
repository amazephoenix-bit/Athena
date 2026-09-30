import apiClient, { DEMO_MODE } from './apiClient';
import { API_ENDPOINTS } from './endpoints';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const lifestyleApi = {
  async getLifestyle() {
    if (DEMO_MODE) {
      await delay(400);
      return {
        spotify: { connected: false, username: '' },
        youtube: { connected: false },
        foodPreferences: {},
        preferences: {},
      };
    }
    const res = await apiClient.get(API_ENDPOINTS.lifestyle.get);
    return res.data;
  },

  async updateLifestyle(data) {
    if (DEMO_MODE) { await delay(500); return { success: true, ...data }; }
    const res = await apiClient.put(API_ENDPOINTS.lifestyle.update, data);
    return res.data;
  },

  async connectSpotify(username) {
    if (DEMO_MODE) {
      await delay(800);
      return { connected: false, message: 'Spotify connection requires backend integration. (Demo Mode)' };
    }
    const res = await apiClient.post(API_ENDPOINTS.lifestyle.spotify, { username });
    return res.data;
  },

  async connectYouTube() {
    if (DEMO_MODE) {
      await delay(800);
      return { connected: false, message: 'YouTube connection requires backend integration. (Demo Mode)' };
    }
    const res = await apiClient.post(API_ENDPOINTS.lifestyle.youtube);
    return res.data;
  },

  async getPets() {
    if (DEMO_MODE) { await delay(400); return null; }
    const res = await apiClient.get(API_ENDPOINTS.lifestyle.pets);
    return res.data;
  },

  async updatePets(data) {
    if (DEMO_MODE) { await delay(500); return { success: true }; }
    const res = await apiClient.put(API_ENDPOINTS.lifestyle.pets, data);
    return res.data;
  },
};
