import express from 'express';
import { verifyToken, isClient } from '../Middleware/authMiddleware.js';
import { 
    getInfo, getVideos, getBlogs, getFoodPlan, getTasks,
    updateTask, getProfessionals, 
    updateTeam, uploadProfileImage 
} from '../controllers/clientController.js';
import { uploadProfileImageFile } from '../Middleware/uploadMiddleware.js';

const router = express.Router();


// 1. מחילים את ה-Middleware על כל הנתיבים הבאים
router.use(verifyToken);
router.use(isClient); 

// 2. הגדרת הנתיבים (כולל העלאת התמונה כעת נמצאת תחת המטריה של המאומתים)
router.post('/upload-image', (req, res, next) => {
    uploadProfileImageFile.single('profileImage')(req, res, (error) => {
        if (!error) return next();
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'התמונה גדולה מדי. הגודל המרבי הוא 8MB' });
        }
        return res.status(400).json({ error: error.message });
    });
}, uploadProfileImage);

router.get('/info', getInfo);
router.get('/videos', getVideos);
router.get('/blogs', getBlogs);
router.get('/food-plan', getFoodPlan);
router.get('/tasks', getTasks); 
router.put('/tasks/:id', updateTask);
router.get('/professionals', getProfessionals);
router.put('/team', updateTeam);

export default router;
