import * as nutritionistModel from '../models/nutritionistModel.js';
import * as sharedModel from '../models/sharedModel.js';

export const handleCreateFoodPlan = async (planData) => {
    if (!planData.To_ID || !planData.food) {
        throw new Error('Missing client ID (To_ID) or food details');
    }
    return await nutritionistModel.createFoodPlanInDB(planData);
};

export const handleUpdateFoodPlan = async (Table_ID, food, calories) => {
    const result = await nutritionistModel.updateFoodPlanInDB(Table_ID, food, calories);
    if (result.affectedRows === 0) throw new Error('Food plan not found');
    return result;
};

export const handleDeleteFoodPlan = async (Table_ID) => {
    const result = await nutritionistModel.deleteFoodPlanFromDB(Table_ID);
    if (result.affectedRows === 0) throw new Error('Food plan not found');
    return result;
};

export const handleClientTracking = async (To_ID) => {
    return await nutritionistModel.getClientFoodLogsFromDB(To_ID);
};

export const handleSendMessage = async (messageData) => {
    if (!messageData.to_ID || !messageData.body) {
        throw new Error('Message body and to_ID are required');
    }
    return await sharedModel.createMessageInDB(messageData);
};

export const handleCreateBlog = async (blogData) => {
    if (!blogData.blog_ID || !blogData.Title || !blogData.body) {
        throw new Error('Missing blog_ID, Title, or body');
    }
    return await sharedModel.createBlogInDB(blogData);
};

export const handleAssignTask = async (taskData) => {
    if (!taskData.client_ID || !taskData.Title || !taskData.Body) {
        throw new Error('Missing client_ID, Title, or Body for the task');
    }
    return await sharedModel.createTaskInDB(taskData);
};

export const handleGetMyClients = async (nutritionistId) => {
    return await nutritionistModel.getMyClientsFromDB(nutritionistId);
};