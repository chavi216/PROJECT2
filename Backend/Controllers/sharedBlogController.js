import * as sharedModel from '../models/sharedModel.js';

export const getBlogs = async (req, res) => {
    try {
        const userId = req.user?.ID || req.user?.id;
        const blogs = await sharedModel.getManagerBlogsFromDB(userId);
        res.status(200).json(blogs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createBlog = async (req, res) => {
    try {
        const blogData = {
            User_ID: req.user?.ID || req.user?.id,
            ...req.body
        };
        await sharedModel.createBlogInDB(blogData);
        res.status(201).json({ message: 'Blog created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const blogId = parseInt(req.params.blogId);
        const { Title, body, audience_type, recipient_client_id } = req.body;
        await sharedModel.updateBlogInDB(blogId, Title, body, audience_type, recipient_client_id);
        res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const blogId = parseInt(req.params.blogId);
        await sharedModel.deleteBlogFromDB(blogId);
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};