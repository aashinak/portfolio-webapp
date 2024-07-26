import { Router } from "express";
import { adminLogin, createAdmin } from "../controllers/admin.controllers.js";

const router = Router();

router.route("/registerAdmin").post(createAdmin);
router.route("/adminLogin").post(adminLogin);

export default router ;
