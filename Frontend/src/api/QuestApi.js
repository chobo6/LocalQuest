import api from './AxiosInstance';

export const questApi = {
  getQuestList: () => api.get('/api/quests'),
  getQuestMapList: () => api.get('/api/quests/map'),
  getQuestDetail: (questId) => api.get(`/api/quests/${questId}`),
  getQuestReviews: (questId) => api.get(`/api/quests/${questId}/reviews`),
  createQuestReview: (questId, payload) => api.post(`/api/quests/${questId}/reviews`, payload),
  updateQuestReview: (questId, reviewId, payload) =>
    api.put(`/api/quests/${questId}/reviews/${reviewId}`, payload),
  deleteQuestReview: (questId, reviewId, userId) =>
    api.delete(`/api/quests/${questId}/reviews/${reviewId}`, { params: { userId } }),
};
