import { authApi } from './authApi';
import { clientApi } from './clientApi';
import { nutritionistApi } from './nutritionistApi';
import { trainerApi } from './trainerApi'; 
import { adminApi } from './adminApi';

export const apiService = {
  auth: authApi,
  client: clientApi,
  nutritionist: nutritionistApi,
  trainer: trainerApi,
  admin: adminApi, //
};