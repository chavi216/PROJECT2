import * as nutritionistService from '../services/nutritionistService.js';

// export const createFoodPlan = async (req, res) => {
//     try {
//         const planData = {
//             ...req.body,
//             From_ID: req.user.ID 
//         };
//         await nutritionistService.handleCreateFoodPlan(planData);
//         res.status(201).json({ message: 'Food plan created successfully' });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

export const createFoodPlan = async (req, res) => {
    // 🌟 זה יגלה לנו הכל:
    
    try {
        const planData = {
            ...req.body,
            From_ID: req.user?.ID || req.user?.id || 1 // הגנה משולבת
        };
        await nutritionistService.handleCreateFoodPlan(planData);
        res.status(201).json({ message: 'Food plan created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const updateFoodPlan = async (req, res) => {
    try {
        const Table_ID = parseInt(req.params.id);
        const { food, calories } = req.body;
        await nutritionistService.handleUpdateFoodPlan(Table_ID, food, calories);
        res.status(200).json({ message: 'Food plan updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteFoodPlan = async (req, res) => {
    try {
        const Table_ID = parseInt(req.params.id);
        await nutritionistService.handleDeleteFoodPlan(Table_ID);
        res.status(200).json({ message: 'Food plan deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const trackClient = async (req, res) => {
    try {
        const clientId = parseInt(req.params.clientId);
        const logs = await nutritionistService.handleClientTracking(clientId);
        res.status(200).json(logs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const messageData = { 
            from_ID: req.user.ID, 
            ...req.body 
        };
        await nutritionistService.handleSendMessage(messageData);
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createBlog = async (req, res) => {
    try {
        const blogData = { 
            User_ID: req.user.ID, 
            ...req.body 
        };
        await nutritionistService.handleCreateBlog(blogData);
        res.status(201).json({ message: 'Blog created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const assignTask = async (req, res) => {
    try {
        const taskData = {
            manager_ID: req.user.ID, 
            ...req.body
        };
        await nutritionistService.handleAssignTask(taskData);
        res.status(201).json({ message: 'Task assigned to client successfully by nutritionist' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getMyClients = async (req, res) => {
    try {
        const nutritionistId = req.user?.ID || req.user?.id;
        const clients = await nutritionistService.handleGetMyClients(nutritionistId);
        res.status(200).json(clients);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
