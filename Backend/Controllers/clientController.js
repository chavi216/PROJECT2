import * as clientService from '../services/clientService.js';
import db from '../config/db.js';

export const getInfo = async (req, res) => {
    try {
        const info = await clientService.handleGetClientInfo(req.user.id);
        if (!info) {
            return res.status(404).json({ message: "המשתמש לא נמצא במסד הנתונים" });
        }
        res.status(200).json(info);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM Tasks WHERE client_ID = ?`, [req.user.id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getFoodPlan = async (req, res) => {
    try {
        const plan = await clientService.handleGetFoodPlan(req.user.id);
        res.status(200).json(plan);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const updateTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const completed = req.body.completed;         
        await clientService.handleUpdateTask(taskId, req.user.id, completed);
        res.status(200).json({ message: 'Task status updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getVideos = async (req, res) => {
    try {
        const videos = await clientService.handleGetClientVideos(req.user.id);
        res.status(200).json(videos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBlogs = async (req, res) => {
    try {
        const blogs = await clientService.handleGetBlogs();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getProfessionals = async (req, res) => {
    try {
        const professionals = await clientService.handleGetProfessionals();
        res.status(200).json(professionals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateTeam = async (req, res) => {
    try {
        const { trainer_id, nutritionist_id } = req.body;
        // אנו מקבלים את תעודת הזהות של הלקוח המחובר ישירות מהטוקן
        const clientId = req.user.id; 
        
        await clientService.handleUpdateTeam(clientId, trainer_id, nutritionist_id);
        res.status(200).json({ message: 'Team updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "לא נבחר קובץ להעלאה" });
        }
        
        // יצירת הנתיב שיישמר בבסיס הנתונים (השרת מגיש את התיקייה הזו סטטית)
        const imageUrl = `/uploads/${req.file.filename}`;
        
        // קריאה לשירות לעדכון ה-DB
        await clientService.handleUpdateProfileImage(req.user.id, imageUrl);
        
        res.status(200).json({ 
            message: 'תמונת הפרופיל עודכנה בהצלחה', 
            imageUrl 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
