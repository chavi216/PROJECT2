import { fetchWithErrorHandling } from './apiConfig';

export const trainerApi = {
  // רשימת לקוחות המאמן (דרוש עבור שיוך בלוגים ומשימות)
  getClients: () => fetchWithErrorHandling('/trainer/clients'),

  // --- משימות ---
getAllTasks: () => fetchWithErrorHandling('/trainer/all-tasks'),
  getTasks: (clientId) => fetchWithErrorHandling(`/trainer/tasks/${clientId}`),
  getClientTasks: (clientId) => fetchWithErrorHandling(`/trainer/tasks/${clientId}`), 
  createTask: (taskData) => fetchWithErrorHandling('/trainer/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData),
  }),
  updateTask: (taskId, taskData) => fetchWithErrorHandling(`/trainer/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  }),
  deleteTask: (taskId) => fetchWithErrorHandling(`/trainer/tasks/${taskId}`, {
    method: 'DELETE',
  }),

  // --- בלוגים ---
  getBlogs: () => fetchWithErrorHandling('/trainer/blogs'),
  createBlog: (blogData) => fetchWithErrorHandling('/trainer/blogs', {
    method: 'POST',
    body: JSON.stringify(blogData),
  }),
  updateBlog: (blogId, blogData) => fetchWithErrorHandling(`/trainer/blogs/${blogId}`, {
    method: 'PUT',
    body: JSON.stringify(blogData),
  }),
  deleteBlog: (blogId) => fetchWithErrorHandling(`/trainer/blogs/${blogId}`, {
    method: 'DELETE',
  }),

  // --- סרטוני כושר ---
  uploadVideo: (formData) => fetchWithErrorHandling('/trainer/videos', {
    method: 'POST',
    body: formData,
  }),
  updateVideo: (videoId, videoData) => fetchWithErrorHandling(`/trainer/videos/${videoId}`, {
    method: 'PUT',
    body: JSON.stringify(videoData),
  }),
  deleteVideo: (videoId) => fetchWithErrorHandling(`/trainer/videos/${videoId}`, {
    method: 'DELETE',
  }),
  getVideos: () => fetchWithErrorHandling('/trainer/videos'),
};