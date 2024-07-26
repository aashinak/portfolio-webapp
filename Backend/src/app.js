import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/admin.routes.js";
import { serverErrorHandler } from "./middlewares/serverErrorHandler.js";
import projectRouter from "./routes/project.routes.js";
const app = express();

app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(cookieParser());

// routes 
app.use("/admin", adminRouter);
app.use("/project", projectRouter)

app.use(serverErrorHandler)

export { app };
