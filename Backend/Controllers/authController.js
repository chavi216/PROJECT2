import * as authService from '../services/authService.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginData = await authService.authenticateUser(email, password);
        
        res.status(200).json({ 
            message: 'Login successful', 
            token: loginData.token,
            role: loginData.role,
            name: loginData.name,
            id: loginData.id
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUserData = await authService.register(userData);
        
        res.status(201).json({
            message: 'User registered successfully',
            token: newUserData.token,
            role: newUserData.role,
            name: newUserData.name,
            id: newUserData.id
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};