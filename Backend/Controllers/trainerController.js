import * as trainerService from '../services/trainerService.js';



export const uploadVideo = async (req, res) => {
    try {
        const videoData = {
            From_ID: req.user.ID,
            To_ID: req.body.To_ID,
            title: req.body.title,
            file: req.file
        };

        await trainerService.handleAddVideo(videoData);

        res.status(201).json({
            message: 'Video uploaded successfully'
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};
export const updateVideo = async (req, res) => {
    try {
        const videoId = parseInt(req.params.id);

        const { title, video_url } = req.body;

        await trainerService.handleUpdateVideo(
            videoId,
            title,
            video_url
        );

        res.status(200).json({
            message: 'Video updated successfully'
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

export const deleteVideo = async (req, res) => {
    try {
        const videoId = parseInt(req.params.id);
        await trainerService.handleDeleteVideo(videoId);
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const trackClient = async (req, res) => {
    try {
        const clientId = parseInt(req.params.clientId);
        const tasks = await trainerService.handleTrackClient(clientId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const messageData = { from_ID: req.user.ID, ...req.body };
        await trainerService.handleSendMessage(messageData);
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createBlog = async (req, res) => {
    try {
        const blogData = { User_ID: req.user.ID, ...req.body };
        await trainerService.handleCreateBlog(blogData);
        res.status(201).json({ message: 'Blog created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const assignTask = async (req, res) => {
    try {
        // משיכת ה-ID של המאמן המחובר בצורה בטוחה
        const trainerId = req.user?.id || req.user?.ID || 1;
        
        const taskData = {
            manager_ID: trainerId, 
            ...req.body // Body, Title, client_ID
        };
        
        await trainerService.handleAssignTask(taskData);
        res.status(201).json({ message: 'Task assigned successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getClients = async (req, res) => {
    try {
        const trainerId = req.user?.id || req.user?.ID;
        const clients = await trainerService.handleGetClients(trainerId);
        res.status(200).json(clients);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getVideos = async (req, res) => {
    try {
        const videos = await trainerService.handleGetVideos();
        res.status(200).json(videos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};