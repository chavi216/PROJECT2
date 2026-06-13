import express from 'express';
import { verifyToken, isTrainer } from '../Middleware/authMiddleware.js';
import { 
    uploadVideo, 
    updateVideo, 
    deleteVideo, 
    trackClient, 
    sendMessage, 
    getClients,
    getVideos,
    
} from '../controllers/trainerController.js';

import * as sharedTaskController from '../Controllers/sharedTaskController.js';
import * as sharedBlogController from '../Controllers/sharedBlogController.js';
import { uploadVideoFile } from '../Middleware/uploadMiddleware.js';

const router = express.Router();
    
router.use(verifyToken);
router.use(isTrainer); // הגנה - רק מאמנים נכנסים

// --- ראוטים של לקוחות ---
router.get('/clients', getClients);

// --- ראוטים של סרטונים ---
router.post(
    '/videos',
    uploadVideoFile.single('video'),
    uploadVideo
);
router.put('/videos/:id', updateVideo);
router.delete('/videos/:id', deleteVideo);
router.get('/videos', getVideos);

// --- ראוטים של מעקב והודעות ---
router.get('/track/:clientId', trackClient);
router.post('/messages', sendMessage);

// --- משימות (Shared) ---
router.get('/tasks/:clientId', sharedTaskController.getTasks);
router.post('/tasks', sharedTaskController.addTask); 
router.put('/tasks/:taskId', sharedTaskController.updateTask);
router.delete('/tasks/:taskId', sharedTaskController.deleteTask);
router.get(
    '/all-tasks',
    sharedTaskController.getAllTasks
);
// --- בלוגים (Shared) ---
router.get('/blogs', sharedBlogController.getBlogs);
router.post('/blogs', sharedBlogController.createBlog);
router.put('/blogs/:blogId', sharedBlogController.updateBlog);
router.delete('/blogs/:blogId', sharedBlogController.deleteBlog);

export default router;


