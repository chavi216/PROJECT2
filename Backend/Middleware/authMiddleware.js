import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
  
};


export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

export const isClient = (req, res, next) => {
    if (!req.user || (req.user.role !== 'client' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: 'Access denied. Clients only.' });
    }
    next();
};

export const isNutritionist = (req, res, next) => {
    if (!req.user || (req.user.role !== 'nutritionist' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: 'Access denied. Nutritionists only.' });
    }
    next();
};

export const isTrainer = (req, res, next) => {
    if (!req.user || (req.user.role !== 'trainer' && req.user.role !== 'admin')) {
        return res.status(403).json({ message: 'Access denied. Trainers only.' });
    }
    next();
};