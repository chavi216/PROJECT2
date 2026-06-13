import db from '../config/db.js';

export const createUserInDB = async (userData) => {
    const { ID, name, email, password, role, address, phone_number } = userData;
    const query = `INSERT INTO Users (ID, name, email, password, role, address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [ID, name, email, password, role, address, phone_number]);
    return result;
};

export const deleteUserFromDB = async (userId) => {
    const query = `DELETE FROM Users WHERE ID = ?`;
    const [result] = await db.query(query, [userId]);
    return result;
};

export const deleteBlogFromDB = async (blogId) => {
    const query = `DELETE FROM Blogs WHERE blog_ID = ?`;
    const [result] = await db.query(query, [blogId]);
    return result;
};

export const deleteVideoFromDB = async (videoId) => {
    const query = `DELETE FROM FitnessVideos WHERE video_ID = ?`;
    const [result] = await db.query(query, [videoId]);
    return result;
};

export const getAllUsersFromDB = async () => {
    const query = `SELECT ID, name, email, role, address, phone_number FROM Users`;
    const [rows] = await db.query(query);
    return rows;
};

export const getAllBlogsFromDB = async () => {
    const query = `SELECT b.blog_ID, b.Title, b.audience_type, u.name as author_name FROM Blogs b JOIN Users u ON b.User_ID = u.ID`;
    const [rows] = await db.query(query);
    return rows;
};

export const getAllVideosFromDB = async () => {
    const query = `SELECT v.video_ID, v.title, v.video_url, v.audience_type, u.name as creator_name FROM FitnessVideos v JOIN Users u ON v.From_ID = u.ID`;
    const [rows] = await db.query(query);
    return rows;
};

export const getAllTasksFromDB = async () => {
    const query = `SELECT t.Task_ID, t.Title, t.Body, t.completed, m.name as manager_name, c.name as client_name 
                   FROM Tasks t 
                   JOIN Users m ON t.manager_ID = m.ID 
                   JOIN Users c ON t.client_ID = c.ID`;
    const [rows] = await db.query(query);
    return rows;
};

export const deleteTaskFromDB = async (taskId) => {
    const query = `DELETE FROM Tasks WHERE Task_ID = ?`;
    const [result] = await db.query(query, [taskId]);
    return result;
};