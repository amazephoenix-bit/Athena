import apiClient, { DEMO_MODE } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import { mockMemories } from './mockData';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
let localMemories = [...mockMemories];

export const memoryApi = {
  async getMemory() {
    if (DEMO_MODE) { await delay(400); return localMemories; }
    const res = await apiClient.get(API_ENDPOINTS.memory.get);
    return res.data;
  },

  async addMemory(memory) {
    if (DEMO_MODE) {
      await delay(500);
      const newM = { ...memory, id: 'm' + Date.now(), timestamp: new Date().toISOString() };
      localMemories = [newM, ...localMemories];
      return newM;
    }
    const res = await apiClient.post(API_ENDPOINTS.memory.add, memory);
    return res.data;
  },

  async deleteMemory(id) {
    if (DEMO_MODE) {
      await delay(400);
      localMemories = localMemories.filter((m) => m.id !== id);
      return { success: true };
    }
    const res = await apiClient.delete(API_ENDPOINTS.memory.delete(id));
    return res.data;
  },
};
