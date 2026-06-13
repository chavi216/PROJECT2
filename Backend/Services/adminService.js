import bcrypt from 'bcrypt';
import * as adminModel from '../Models/userModel.js';

export const registerUser = async (userData) => {
    const validRoles = ['client', 'admin', 'trainer', 'nutritionist'];
    if (!validRoles.includes(userData.role)) {
        throw new Error('Invalid user role provided');
    }

    if (!userData.password) {
        throw new Error('Password is required');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const securedUserData = {
        ...userData,
        password: hashedPassword
    };
    
    return await adminModel.createUserInDB(securedUserData);
};

export const removeUser = async (userId, currentAdminId) => {
    if (userId === currentAdminId) {
        throw new Error('Admin cannot delete their own account');
    }

    const result = await adminModel.deleteUserFromDB(userId);
    if (result.affectedRows === 0) {
        throw new Error('User not found');
    }
    return result;
};

export const getUsersList = async () => {
    return await adminModel.getAllUsersFromDB();
};


export const getContentList = async (contentType) => {
    if (contentType === 'blog') {
        return await adminModel.getAllBlogsFromDB();
    } else if (contentType === 'video') {
        return await adminModel.getAllVideosFromDB();
    } else if (contentType === 'task') { // 🌟 תמיכה חדשה במשימות
        return await adminModel.getAllTasksFromDB();
    } else {
        throw new Error('Invalid content type requested');
    }
};

export const removeContent = async (contentType, contentId) => {
    let result;
    
    if (contentType === 'blog') {
        result = await adminModel.deleteBlogFromDB(contentId);
    } else if (contentType === 'video') {
        result = await adminModel.deleteVideoFromDB(contentId);
    } else if (contentType === 'task') { // 🌟 תמיכה חדשה במשימות
        result = await adminModel.deleteTaskFromDB(contentId);
    } else {
        throw new Error('Invalid content type');
    }

    if (result.affectedRows === 0) {
        throw new Error('Content not found');
    }
    return result;
};