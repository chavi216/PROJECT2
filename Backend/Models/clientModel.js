import db from '../config/db.js';
import fs from 'fs/promises';
import path from 'path';

export const getClientInfoFromDB = async (client_ID) => {
    // שינוי profile_image_url ל-profile_image
    const query = `SELECT ID, name, email, role, address, phone_number, trainer_id, nutritionist_id, profile_image 
                   FROM Users WHERE ID = ?`;
    const [rows] = await db.query(query, [client_ID]);
    return rows[0];
};

export const updateClientProfileImageInDB = async (client_ID, imageUrl) => {
    // שינוי profile_image_url ל-profile_image
    const query = `UPDATE Users SET profile_image = ? WHERE ID = ?`;
    const [result] = await db.query(query, [imageUrl, client_ID]);
    return result;
};

export const getClientVideosFromDB = async (client_ID) => {
    const query = `SELECT * FROM FitnessVideos WHERE To_ID = ? OR To_ID IS NULL ORDER BY video_ID DESC`;
    const [rows] = await db.query(query, [client_ID]);
    return rows;
};

export const getAllBlogsFromDB = async () => {
    // SELECT * שולף גם את ה-file_path שהוספנו
    const query = `SELECT * FROM Blogs ORDER BY blog_ID DESC`;
    const [rows] = await db.query(query);

    // רצים על כל הבלוגים וקוראים את התוכן מהקובץ אם הוא קיים
    const blogsWithContent = await Promise.all(rows.map(async (blog) => {
        try {
            if (blog.file_path) {
                const fullPath = path.join(process.cwd(), blog.file_path);
                const textContent = await fs.readFile(fullPath, 'utf-8');
                return { ...blog, body: textContent };
            }
        } catch (fileError) {
            console.error(`שגיאה בקריאת הקובץ עבור בלוג ${blog.blog_ID}:`, fileError.message);
        }
        return { ...blog, body: blog.body || "התוכן לא זמין כעת." };
    }));

    return blogsWithContent;
};

export const getClientFoodPlanFromDB = async (client_ID) => {
    const query = `SELECT * FROM FoodLog WHERE To_ID = ? ORDER BY date DESC`;
    const [rows] = await db.query(query, [client_ID]);
    return rows;
};

export const updateTaskCompletionInDB = async (Task_ID, client_ID, completed) => {
    const val = completed ? 1 : 0; 
    const query = `UPDATE Tasks SET completed = ? WHERE Task_ID = ? AND client_ID = ?`;
    
    
    const [result] = await db.query(query, [val, Task_ID, client_ID]);
    return result;
};

export const fetchChatHistory = async (clientId, contactId) => {
    const [messages] = await db.query(
        `SELECT * FROM Messages 
         WHERE (from_ID = ? AND to_ID = ?) OR (from_ID = ? AND to_ID = ?) 
         ORDER BY created_at ASC`,
        [clientId, contactId, contactId, clientId]
    );
    return messages;
};

export const getProfessionalsFromDB = async () => {
    const query = `SELECT ID, name, role FROM Users WHERE role IN ('trainer', 'nutritionist')`;
    const [rows] = await db.query(query);
    return rows;
};

export const updateClientTeamInDB = async (client_ID, trainer_id, nutritionist_id) => {
    const query = `UPDATE Users SET trainer_id = ?, nutritionist_id = ? WHERE ID = ?`;
    const [result] = await db.query(query, [trainer_id, nutritionist_id, client_ID]);
    return result;
};
