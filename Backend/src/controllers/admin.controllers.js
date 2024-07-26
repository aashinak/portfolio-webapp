import Admin from "../models/admin.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const createAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Manual validation
    if (
        !username ||
        typeof username !== "string" ||
        username.trim().length < 3
    ) {
        return res
            .status(400)
            .json({
                message: "Username must be at least 3 characters long.",
                success: false,
            });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
        return res
            .status(400)
            .json({
                message: "Password must be at least 6 characters long.",
                success: false,
            });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
        return res
            .status(400)
            .json({ message: "Username already exists.", success: false });
    }

    const newAdmin = await Admin.create({
        username: username.toLocaleLowerCase(),
        password, // raw password will be hashed by the pre-save hook
    });
    res.status(201).json({
        message: "Admin created successfully.",
        success: true,
    });
});

const adminLogin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Basic input validation
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username and password are required." });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
        return res.status(400).json({ message: "Invalid credentials." });
    }

    // Check if password matches
    const isMatch = await admin.isPasswordCorrect(password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid password." });
    }

    // Generate tokens
    const accessToken = await admin.generateAccessToken();
    const refreshToken = await admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    const loggedInAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    );
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };
    return res
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .status(200)
        .json({
            admin: loggedInAdmin,
            message: "Login successful",
            success: true,
        });
});

export { createAdmin, adminLogin };
