import * as trainerModel from '../models/trainerModel.js';
import * as sharedModel from '../models/sharedModel.js'; 

export const handleAddVideo = async (videoData) => {

    if (!videoData.title) {
        throw new Error('Title is required');
    }

    if (!videoData.file) {
        throw new Error('Video file is required');
    }

    const dbVideo = {
        From_ID: videoData.From_ID,
        To_ID: videoData.To_ID,
        title: videoData.title,
        video_url: `/uploads/${videoData.file.filename}`
    };

    return await trainerModel.createVideoInDB(dbVideo);
};

export const handleUpdateVideo = async (video_ID, title, video_url) => {
    const result = await trainerModel.updateVideoInDB(video_ID, title, video_url);
    if (result.affectedRows === 0) throw new Error('Video not found');
    return result;
};

export const handleDeleteVideo = async (video_ID) => {
    const result = await trainerModel.deleteVideoFromDB(video_ID);
    if (result.affectedRows === 0) throw new Error('Video not found');
    return result;
};

export const handleTrackClient = async (client_ID) => {
    return await trainerModel.getClientTasksFromDB(client_ID);
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

export const handleGetClients = async (trainerId) => {
    if (!trainerId) throw new Error('Trainer ID is missing');
    return await trainerModel.getClientsByTrainerId(trainerId);
};

export const handleGetVideos = async () => {
    return await trainerModel.getAllVideosFromDB();
};