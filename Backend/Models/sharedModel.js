import db from '../config/db.js';
import fs from 'fs/promises';
import path from 'path';

// --- הודעות ---
export const createMessageInDB = async (messageData) => {
    const { from_ID, to_ID, body } = messageData;
    const query = `INSERT INTO Messages (from_ID, to_ID, body, is_read) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(query, [from_ID, to_ID, body, false]);
    return result;
};

// --- משימות ---
export const createTaskInDB = async (taskData) => {
    const { Body, Title, manager_ID, client_ID } = taskData;
    const query = `INSERT INTO Tasks (Body, Title, manager_ID, client_ID, completed) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [Body, Title, manager_ID, client_ID, false]);
    return result;
};

// שליפת משימות של לקוח ספציפי שנוצרו על ידי איש צוות ספציפי
export const getManagerTasksFromDB = async (manager_ID, client_ID) => {
    const query = `SELECT * FROM Tasks WHERE manager_ID = ? AND client_ID = ? ORDER BY Task_ID DESC`;
    const [rows] = await db.query(query, [manager_ID, client_ID]);
    return rows;
};

// עדכון תוכן משימה
export const updateTaskDetailsInDB = async (Task_ID, Title, Body) => {
    const query = `UPDATE Tasks SET Title = ?, Body = ? WHERE Task_ID = ?`;
    const [result] = await db.query(query, [Title, Body, Task_ID]);
    return result;
};

// מחיקת משימה
export const deleteTaskFromDB = async (Task_ID) => {
    const query = `DELETE FROM Tasks WHERE Task_ID = ?`;
    const [result] = await db.query(query, [Task_ID]);
    return result;
};

// --- בלוגים (מעודכן עם תמיכה בקבצי טקסט וקהל יעד) ---

// יצירת בלוג
export const createBlogInDB = async (blogData) => {
    const { User_ID, Title, body, audience_type, recipient_client_id } = blogData;

    // 1. יצירת קובץ טקסט ושמירת התוכן
    const fileName = `blog_${Date.now()}_${Math.round(Math.random() * 1E9)}.txt`;
    const filePath = `/uploads/${fileName}`;
    const fullPath = path.join(process.cwd(), 'uploads', fileName);

    await fs.writeFile(fullPath, body, 'utf-8');

    // 2. שמירת הרשומה ב-DB עם הנתיב לקובץ. (אפשר לשמור מחרוזת ריקה ב-body כדי לחסוך מקום ב-DB)
    const query = `INSERT INTO Blogs (User_ID, Title, body, audience_type, recipient_client_id, file_path) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [User_ID, Title, "", audience_type, recipient_client_id || null, filePath]);
    return result;
};

// שליפת כל הבלוגים שכתב מנהל ספציפי 
export const getManagerBlogsFromDB = async (userId) => {
    const query = `SELECT * FROM Blogs WHERE User_ID = ? ORDER BY blog_ID DESC`;
    const [rows] = await db.query(query, [userId]);

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

// עדכון בלוג קיים
export const updateBlogInDB = async (blog_ID, Title, body, audience_type, recipient_client_id) => {
    // 1. נבדוק אם לבלוג כבר יש קובץ מקושר
    const [existing] = await db.query(`SELECT file_path FROM Blogs WHERE blog_ID = ?`, [blog_ID]);
    let filePath = existing[0]?.file_path;

    if (filePath) {
        // אם יש קובץ קיים, פשוט נדרוס את התוכן שלו
        const fullPath = path.join(process.cwd(), filePath);
        await fs.writeFile(fullPath, body, 'utf-8');
    } else {
        // אם זה בלוג ישן שעדיין אין לו קובץ, ניצור אחד
        const fileName = `blog_${Date.now()}_${Math.round(Math.random() * 1E9)}.txt`;
        filePath = `/uploads/${fileName}`;
        const fullPath = path.join(process.cwd(), 'uploads', fileName);
        await fs.writeFile(fullPath, body, 'utf-8');
    }

    // 2. עדכון ה-DB (נשאיר את body ריק כי הוא נשמר בקובץ)
    const query = `UPDATE Blogs SET Title = ?, body = ?, audience_type = ?, recipient_client_id = ?, file_path = ? WHERE blog_ID = ?`;
    const [result] = await db.query(query, [Title, "", audience_type, recipient_client_id || null, filePath, blog_ID]);
    return result;
};

// מחיקת בלוג
export const deleteBlogFromDB = async (blog_ID) => {
    // ניסיון למחוק גם את קובץ הטקסט הפיזי כדי שלא יצטברו סתם קבצים בשרת
    try {
        const [existing] = await db.query(`SELECT file_path FROM Blogs WHERE blog_ID = ?`, [blog_ID]);
        if (existing[0]?.file_path) {
            const fullPath = path.join(process.cwd(), existing[0].file_path);
            await fs.unlink(fullPath); // פקודת מחיקת קובץ
        }
    } catch (err) {
        console.error("קובץ הבלוג לא נמצא למחיקה או שהייתה שגיאה:", err.message);
    }

    // מחיקת השורה מה-DB
    const query = `DELETE FROM Blogs WHERE blog_ID = ?`;
    const [result] = await db.query(query, [blog_ID]);
    return result;
};

// שליפת כל המשימות שאיש צוות (מאמן/תזונאי) יצר עבור כל הלקוחות שלו
export const getAllManagerTasksFromDB = async (manager_ID) => {
    const query = `SELECT * FROM Tasks WHERE manager_ID = ? ORDER BY Task_ID DESC`;
    const [rows] = await db.query(query, [manager_ID]);
    return rows;
};


