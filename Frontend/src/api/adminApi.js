
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