
import { fetchWithErrorHandling } from './apiConfig';

export const nutritionistApi = {
  createFoodPlan: (planData) => fetchWithErrorHandling('/nutritionist/food-plan', {
    method: 'POST',
    body: JSON.stringify(planData),
  }),
  getClients: () => fetchWithErrorHandling('/nutritionist/clients'),
  getClientDiet: (clientId) => fetchWithErrorHandling(`/nutritionist/track/${clientId}`),
  deleteFoodItem: (tableId) => fetchWithErrorHandling(`/nutritionist/food-plan/${tableId}`, {
    method: 'DELETE',
  }),

  // -- הפונקציה החדשה לעדכון תפריט --
  updateFoodPlan: (tableId, updateData) => fetchWithErrorHandling(`/nutritionist/food-plan/${tableId}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  }),

  // --- משימות (משותף) ---
  getTasks: (clientId) => fetchWithErrorHandling(`/nutritionist/tasks/${clientId}`),
  createTask: (taskData) => fetchWithErrorHandling('/nutritionist/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData),
  }),
  updateTask: (taskId, taskData) => fetchWithErrorHandling(`/nutritionist/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  }),
  deleteTask: (taskId) => fetchWithErrorHandling(`/nutritionist/tasks/${taskId}`, {
    method: 'DELETE',
  }),

  // --- בלוגים (משותף) ---
  getBlogs: () => fetchWithErrorHandling('/nutritionist/blogs'),
  createBlog: (blogData) => fetchWithErrorHandling('/nutritionist/blogs', {
    method: 'POST',
    body: JSON.stringify(blogData),
  }),
  updateBlog: (blogId, blogData) => fetchWithErrorHandling(`/nutritionist/blogs/${blogId}`, {
    method: 'PUT',
    body: JSON.stringify(blogData),
  }),
  deleteBlog: (blogId) => fetchWithErrorHandling(`/nutritionist/blogs/${blogId}`, {
    method: 'DELETE',
  }),
};