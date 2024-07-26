import { Schema, model } from "mongoose";

const projectSchema = new Schema(
    {
        projectName: {
            type: String,
            required: true,
            unique: true
        },
        projectAvatar: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
        },
        redirectLink: {
            type: String,
        },
    },
    { timestamps: true }
);

const Project = model("Project", projectSchema);
export default Project;
