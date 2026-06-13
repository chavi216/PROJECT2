import * as clientModel from '../models/clientModel.js';

export const handleGetClientInfo = (clientId) => clientModel.getClientInfoFromDB(clientId);
export const handleGetClientVideos = (clientId) => clientModel.getClientVideosFromDB(clientId);
export const handleGetBlogs = () => clientModel.getAllBlogsFromDB();
export const handleGetFoodPlan = (clientId) => clientModel.getClientFoodPlanFromDB(clientId);
export const handleGetProfessionals = () => clientModel.getProfessionalsFromDB();
export const handleUpdateTeam = (clientId, trainerId, nutritionistId) => clientModel.updateClientTeamInDB(clientId, trainerId, nutritionistId);
export const handleUpdateProfileImage = (clientId, imageUrl) => clientModel.updateClientProfileImageInDB(clientId, imageUrl);

export const handleUpdateTask = async (taskId, clientId, completed) => {
    const result = await clientModel.updateTaskCompletionInDB(taskId, clientId, completed);
    if (result.affectedRows === 0) throw new Error('Task not found or unauthorized');
    return result;
};
