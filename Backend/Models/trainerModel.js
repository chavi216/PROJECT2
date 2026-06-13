import db from '../config/db.js';

export const createVideoInDB = async (videoData) => {
    const { From_ID, To_ID, title, video_url } = videoData;
    const query = `INSERT INTO FitnessVideos (From_ID, To_ID, title, video_url) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(query, [From_ID, To_ID || null, title, video_url]);
    return result;
};

export const updateVideoInDB = async (video_ID, title, video_url) => {
    const query = `UPDATE FitnessVideos SET title = ?, video_url = ? WHERE video_ID = ?`;
    const [result] = await db.query(query, [title, video_url, video_ID]);
    return result;
};

export const deleteVideoFromDB = async (video_ID) => {
    const query = `DELETE FROM FitnessVideos WHERE video_ID = ?`;
    const [result] = await db.query(query, [video_ID]);
    return result;
};

export const getClientTasksFromDB = async (client_ID) => {
    const query = `SELECT * FROM Tasks WHERE client_ID = ?`;
    const [rows] = await db.query(query, [client_ID]);
    return rows;
};

// הפונקציה החדשה למשיכת הלקוחות שמשויכים למאמן
export const getClientsByTrainerId = async (trainerId) => {
    const query = `SELECT ID, name, email, phone_number, address FROM Users WHERE role = 'client' AND trainer_id = ?`;
    const [rows] = await db.query(query, [trainerId]);
    return rows;
};

export const getAllVideosFromDB = async () => {
    const query = `
        SELECT
            fv.video_ID,
            fv.title,
            fv.video_url,
            u.name AS client_name
        FROM FitnessVideos fv
        LEFT JOIN Users u
            ON fv.To_ID = u.ID
        ORDER BY fv.video_ID DESC
    `;

    const [rows] = await db.query(query);
    return rows;
};