import * as sharedModel from '../models/sharedModel.js';

export const getTasks = async (req, res) => {
    try {
        const managerId = req.user?.ID || req.user?.id;
        const clientId = req.params.clientId;
        const tasks = await sharedModel.getManagerTasksFromDB(managerId, clientId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const addTask = async (req, res) => {
    try {
        const taskData = {
            manager_ID: req.user?.ID || req.user?.id,
            ...req.body
        };
        await sharedModel.createTaskInDB(taskData);
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.taskId);
        const { Title, Body } = req.body;
        await sharedModel.updateTaskDetailsInDB(taskId, Title, Body);
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.taskId);
        await sharedModel.deleteTaskFromDB(taskId);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const getAllTasks = async (req, res) => {
    try {

        const managerId =
            req.user?.ID || req.user?.id;

        const tasks =
            await sharedModel.getAllManagerTasksFromDB(managerId);

        res.status(200).json(tasks);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }
};



