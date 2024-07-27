import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/temp");
    
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });


import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust the path to go up one level to reach 'public/temp'
const uploadPath = path.join(__dirname, '..', '..', 'public', 'temp');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

export default multer({ storage });



const upload =  multer({ storage });
export {upload}