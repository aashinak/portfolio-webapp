// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/temp");
    
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });


// Import necessary modules
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

// Convert import.meta.url to __filename
const __filename = fileURLToPath(import.meta.url);

// Get __dirname from __filename
const __dirname = path.dirname(__filename);

// Define multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'public', 'temp');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});


const upload =  multer({ storage });
export {upload}