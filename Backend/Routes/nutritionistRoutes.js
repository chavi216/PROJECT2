import express from 'express';
import {verifyToken, isNutritionist } from '../Middleware/authMiddleware.js';
import { getTasks, addTask, updateTask, deleteTask } from '../controllers/sharedTaskController.js';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../controllers/sharedBlogController.js';
import { 
    createFoodPlan, 
    updateFoodPlan, 
    deleteFoodPlan, 
    trackClient, 
    sendMessage, 
    assignTask,
    getMyClients
} from '../controllers/nutritionistController.js';

const router = express.Router();

router.use(verifyToken);
router.use(isNutritionist);

router.post('/food-plan', createFoodPlan);
router.put('/food-plan/:id', updateFoodPlan);
router.delete('/food-plan/:id', deleteFoodPlan);

router.get('/track/:clientId', trackClient);

router.post('/messages', sendMessage);
router.get('/blogs', getBlogs);
router.post('/blogs', createBlog);
router.put('/blogs/:blogId', updateBlog);    
router.delete('/blogs/:blogId', deleteBlog);
router.get('/tasks/:clientId', getTasks);
router.post('/tasks', addTask);
router.put('/tasks/:taskId', updateTask);
router.delete('/tasks/:taskId', deleteTask);

router.get('/clients', getMyClients);

export default router;