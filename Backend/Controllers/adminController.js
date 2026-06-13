import * as adminService from '../services/adminService.js';

// קונטרולר ליצירת משתמש
export const registerUserController = async (req, res) => {
    try {
        await adminService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// קונטרולר למחיקת משתמש
export const deleteUserController = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const currentAdminId = req.user.ID; // מגיע מהמידלוור
        
        await adminService.removeUser(userId, currentAdminId);
        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// קונטרולר למחיקת תוכן (בלוג/סרטון)
export const deleteContentController = async (req, res) => {
    try {
        const { type, id } = req.params; // למשל type='blog', id=5
        
        await adminService.removeContent(type, parseInt(id));
        res.status(200).json({ message: `${type} deleted successfully!` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// קונטרולר לקבלת כל המשתמשים
export const getAllUsersController = async (req, res) => {
    try {
        const users = await adminService.getUsersList();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// קונטרולר לקבלת כל התוכן (בלוגים/סרטונים)
export const getAllContentController = async (req, res) => {
    try {
        const { type } = req.params; // 'blog' או 'video'
        const content = await adminService.getContentList(type);
        res.status(200).json(content);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};