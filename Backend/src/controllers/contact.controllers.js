import Contact from "../models/contact.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const createContactMessage = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!message) {
        return res
            .status(400)
            .json({ error: "Message is required", success: false });
    }

    const newContact = new Contact({
        name,
        email,
        message,
    });

    const savedContact = await newContact.save();
    res.status(201).json({
        message: "Contact message created successfully",
        success: true,
    });
});

const getAllContactMessages = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json({ data: contacts, success: true });
});

export { createContactMessage, getAllContactMessages };
