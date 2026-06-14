import { fetchWithErrorHandling } from './apiConfig';

export const clientApi = {
  getInfo: () => fetchWithErrorHandling('/client/info'),
  getTasks: () => fetchWithErrorHandling('/client/tasks'),
  toggleTask: (taskId, completed) => fetchWithErrorHandling(`/client/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify({ completed }),
  }),
  getFoodPlan: () => fetchWithErrorHandling('/client/food-plan'),
  getVideos: () => fetchWithErrorHandling('/client/videos'),
  getBlogs: () => fetchWithErrorHandling('/client/blogs'),
  getProfessionals: () => fetchWithErrorHandling('/client/professionals'),
  updateTeam: (teamData) => fetchWithErrorHandling('/client/team', {
    method: 'PUT',
    body: JSON.stringify(teamData),
  }),
  
  // פונקציית העלאת תמונה
  uploadProfileImage: (formData) => fetchWithErrorHandling('/client/upload-image', {
    method: 'POST',
    body: formData, // כאן ה-FormData מועבר ללא הפיכה ל-JSON
  }),
};
