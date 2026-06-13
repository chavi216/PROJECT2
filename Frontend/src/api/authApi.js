import { fetchWithErrorHandling } from './apiConfig';

export const authApi = {
  login: (credentials) => fetchWithErrorHandling('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  register: (userData) => fetchWithErrorHandling('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
};