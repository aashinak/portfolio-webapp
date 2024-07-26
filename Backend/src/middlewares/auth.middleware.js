import jwt from "jsonwebtoken";
import Admin from "../models/admin.models.js";

export const verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        if (!token)
            return res.status(401).json({ message: "Unauthorized access" });
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await Admin.findById(decodedToken._id).select(
            "-refreshToken -password"
        );
        if (!user)
            return res.status(401).json({ message: "Invalid access token" });

        next();
    } catch (error) {
        return res.sendError(500, "Couldn't authorize please try again later");
    }
};
