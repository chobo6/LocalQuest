import api from './AxiosInstance';

export const questApi = {
  getQuestList: () => api.get('/api/quests'),
  getQuestDetail: (questId) => api.get(`/api/quests/${questId}`),
};
