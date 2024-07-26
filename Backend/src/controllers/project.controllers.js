import Project from "../models/project.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import fs from "fs";

// Helper function to validate project data
const validateProjectData = (data) => {
    const errors = [];

    if (!data.projectName || typeof data.projectName !== "string") {
        errors.push("Project name is required and must be a string.");
    }

    if (!tags || tags === undefined) {
        errors.push("Tags are required and must be a non-empty array.");
    }

    if (data.redirectLink && !/^https?:\/\/.+/.test(data.redirectLink)) {
        errors.push("Redirect link, if provided, must be a valid URL.");
    }

    if (data.githubLink && !/^https?:\/\/.+/.test(data.githubLink)) {
        errors.push("Github link, if provided, must be a valid URL.");
    }

    return errors;
};

const createProject = asyncHandler(async (req, res) => {
    const errors = validateProjectData(req.body);
    const localProjectAvatar = req.file?.path;
    if (!localProjectAvatar) {
        errors.push("Project avatar is required");
    }
    if (errors.length > 0) {
        fs.unlinkSync(localProjectAvatar);
        return res.status(400).json({ errors });
    }
    const { projectName, tags, redirectLink, githubLink } = req.body;
    const cloudinaryResponse = await uploadOnCloudinary(localProjectAvatar);

    if (!cloudinaryResponse)
        return res.status(400).json({
            message: "Something went wrong while uploading projectAvatar",
            success: false,
        });
    const projectAvatar = cloudinaryResponse.url;
    const newProject = new Project({
        projectName,
        projectAvatar,
        tags: tags.split(","),
        redirectLink,
        githubLink,
    });
    const savedProject = await newProject.save();
    res.status(201).json({ savedProject, success: true });
});

const getAllProjects = asyncHandler(async (req, res) => {
    const allProjects = await Project.find()
    return res.status(200).json({allProjects, success: true})
})

const deleteProject = asyncHandler(async (req,res) => {
    const {projectId} = req.body
    if(!projectId) return res.status(400).json({message: "projectId required", success: false})
    await Project.findByIdAndDelete(projectId)
    return res.status(200).json({message: "Project deleted successfully", success: true})
})

export { createProject, getAllProjects, deleteProject };
