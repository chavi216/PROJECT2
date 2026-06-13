import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDirectory = path.resolve(__dirname, '..', 'uploads');
fs.mkdirSync(uploadsDirectory, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDirectory);
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // השארתי את התמיכה בתמונות, וידאו, והוספתי קבצי טקסט
    const allowedTypes = [
        'video/mp4',
        'video/mov',
        'video/quicktime',
        'video/x-msvideo',
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
        'image/gif',
        'text/plain' // <-- הוספנו את זה בשביל הבלוגים
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        // עדכנו את הודעת השגיאה שתכלול גם טקסט
        cb(new Error('Only video, image, and text files are allowed'));
    }
};

// החזרנו את השם המקורי כדי שהפרויקט יעבוד בלי לשנות את כל ה-Routes
export const uploadVideoFile = multer({
    storage,
    fileFilter,
    limits: { fileSize: 25 * 1024 * 1024 }
});

const imageFileFilter = (req, file, cb) => {
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
    if (allowedImageTypes.includes(file.mimetype)) {
        cb(null, true);
        return;
    }
    cb(new Error('יש לבחור תמונה בפורמט JPG, PNG, WebP או GIF'));
};

export const uploadProfileImageFile = multer({
    storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 8 * 1024 * 1024 }
});
