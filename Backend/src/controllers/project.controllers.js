import Project from "../models/project.models.js";
import asyncHandler from "../utils/asyncHandler.js";


// Helper function to validate project data
const validateProjectData = (data) => {
    const errors = [];
    
    if (!data.projectName || typeof data.projectName !== 'string') {
        errors.push('Project name is required and must be a string.');
    }

    if (!Array.isArray(data.tags) || data.tags.length === 0) {
        errors.push('Tags are required and must be a non-empty array.');
    }
    
    if (data.redirectLink && !/^https?:\/\/.+/.test(data.redirectLink)) {
        errors.push('Redirect link, if provided, must be a valid URL.');
    }

    return errors;
};

const createProject = asyncHandler(async(req,res) => {
    const errors = validateProjectData(req.body);
    const projectAvatar = req.file
    if (!projectAvatar || !/^https?:\/\/.+/.test(projectAvatar)) {
        errors.push('Project avatar is required and must be a valid URL.');
    }
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    const { projectName, tags, redirectLink } = req.body;
    
    const newProject = new Project({ projectName, projectAvatar, tags, redirectLink });
    const savedProject = await newProject.save();
    res.status(201).json({savedProject, success: true});
})