import { Router } from "express";
import { createProject, deleteProject, getAllProjects } from "../controllers/project.controllers.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/createProject").post(verifyJwt, upload.single("projectAvatar"), createProject);
router.route("/getAllProjects").get(verifyJwt, getAllProjects);
router.route("/deleteProject").get(verifyJwt, deleteProject);
 
export default router;
 