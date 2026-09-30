import apiClient, { DEMO_MODE } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import { mockWellness } from './mockData';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
let localWellness = { ...mockWellness };

export const wellnessApi = {
  async getWellness() {
    if (DEMO_MODE) { await delay(400); return localWellness; }
    const res = await apiClient.get(API_ENDPOINTS.wellness.get);
    return res.data;
  },

  async updateWellness(data) {
    if (DEMO_MODE) {
      await delay(500);
      localWellness = { ...localWellness, ...data };
      return localWellness;
    }
    const res = await apiClient.put(API_ENDPOINTS.wellness.update, data);
    return res.data;
  },

  async updatePeriod(data) {
    if (DEMO_MODE) {
      await delay(500);
      localWellness.periodTracking = { ...localWellness.periodTracking, ...data };
      return localWellness.periodTracking;
    }
    const res = await apiClient.put(API_ENDPOINTS.wellness.period, data);
    return res.data;
  },

  async updateSleep(data) {
    if (DEMO_MODE) {
      await delay(500);
      localWellness.sleep = { ...localWellness.sleep, ...data };
      return localWellness.sleep;
    }
    const res = await apiClient.put(API_ENDPOINTS.wellness.sleep, data);
    return res.data;
  },

  async updateWorkout(data) {
    if (DEMO_MODE) {
      await delay(500);
      localWellness.workout = { ...localWellness.workout, ...data };
      return localWellness.workout;
    }
    const res = await apiClient.put(API_ENDPOINTS.wellness.workout, data);
    return res.data;
  },
};
