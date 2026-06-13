// import apiConfig from './apiConfig';

// export const adminApi = {
//   // קבלת כל המשתמשים במערכת
//   getAllUsers: async () => {
//     const response = await apiConfig.get('/admin/users');
//     return response.data;
//   },

//   // רישום משתמש חדש על ידי אדמין
//   registerUser: async (userData) => {
//     const response = await apiConfig.post('/admin/users/register', userData);
//     return response.data;
//   },

//   // מחיקת משתמש
//   deleteUser: async (userId) => {
//     const response = await apiConfig.delete(`/admin/users/${userId}`);
//     return response.data;
//   },

//   // קבלת תוכן לפי סוג (blog / video)
//   getContent: async (type) => {
//     const response = await apiConfig.get(`/admin/content/${type}`);
//     return response.data;
//   },

//   // מחיקת תוכן (בלוג או סרטון)
//   deleteContent: async (type, id) => {
//     const response = await apiConfig.delete(`/admin/content/${type}/${id}`);
//     return response.data;
//   }
// };

import { fetchWithErrorHandling } from './apiConfig';

export const adminApi = {
  // קבלת כל המשתמשים במערכת
  getAllUsers: async () => {
    return await fetchWithErrorHandling('/admin/users', {
      method: 'GET'
    });
  },

  // רישום משתמש חדש על ידי אדמין
  registerUser: async (userData) => {
    return await fetchWithErrorHandling('/admin/users/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  // מחיקת משתמש
  deleteUser: async (userId) => {
    return await fetchWithErrorHandling(`/admin/users/${userId}`, {
      method: 'DELETE'
    });
  },

  // קבלת תוכן לפי סוג (blog / video)
  getContent: async (type) => {
    return await fetchWithErrorHandling(`/admin/content/${type}`, {
      method: 'GET'
    });
  },

  // מחיקת תוכן (בלוג או סרטון)
  deleteContent: async (type, id) => {
    return await fetchWithErrorHandling(`/admin/content/${type}/${id}`, {
      method: 'DELETE'
    });
  }
};