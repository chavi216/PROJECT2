import * as authModel from '../models/authModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authenticateUser = async (email, password) => {
    const user = await authModel.getUserByEmail(email);
    
    if (!user) {
        throw new Error('משתמש זה אינו קיים במערכת');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('סיסמה או איימיל שגויים');
    }

 const token = jwt.sign(
        { id: user.ID, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return { token, role: user.role, name: user.name, id: user.ID }; 
};


export const register = async (userData) => {
    const existingUser = await authModel.getUserByEmail(userData.email);
    if (existingUser) {
        throw new Error('כתובת האימייל הזו כבר רשומה במערכת');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const finalUserData = {
        ...userData,
        password: hashedPassword
    };

    await authModel.createUser(finalUserData);

    const token = jwt.sign(
        { id: finalUserData.ID, role: finalUserData.role || 'client' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        token,
        role: finalUserData.role || 'client',
        name: finalUserData.name,
        id: finalUserData.ID
    };
};