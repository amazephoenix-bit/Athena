import apiClient, { DEMO_MODE } from './apiClient';
import { API_ENDPOINTS } from './endpoints';
import { mockRewards } from './mockData';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
let localRewards = { ...mockRewards };

export const rewardsApi = {
  async getRewards() {
    if (DEMO_MODE) { await delay(400); return localRewards; }
    const res = await apiClient.get(API_ENDPOINTS.rewards.get);
    return res.data;
  },

  async getHistory() {
    if (DEMO_MODE) { await delay(400); return localRewards.history; }
    const res = await apiClient.get(API_ENDPOINTS.rewards.history);
    return res.data;
  },

  async redeemReward(id) {
    if (DEMO_MODE) {
      await delay(800);
      const reward = localRewards.available.find((r) => r.id === id);
      if (!reward) return { success: false, message: 'Reward not found.' };
      if (localRewards.points < reward.cost) {
        return { success: false, message: 'Insufficient ATHENA points.' };
      }
      localRewards = { ...localRewards, points: localRewards.points - reward.cost };
      return { success: true, message: `${reward.title} redeemed! (Demo)`, reward };
    }
    const res = await apiClient.post(API_ENDPOINTS.rewards.redeem(id));
    return res.data;
  },
};
