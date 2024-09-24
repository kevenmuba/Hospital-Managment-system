const express = require('express');
const cors = require('cors');
const connectDB = require("./db/db");
const imageDownloader = require('image-downloader');
const fs = require('fs');
const path = require('path');
const Place = require('./models/Place');
const router = require('./routes/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
const jwtSecret = process.env.JWT_SECRET;
const cookieParser = require('cookie-parser');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));
app.use(express.json());
require('dotenv').config();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// Connect to MongoDB
connectDB();
app.use(router);

app.get("/try", (req, res) => {
    res.send("Great! You connected Node.js with MongoDB.");
});

app.get('/api/test', (req, res) => {
    res.json('Test OK');
});

// Endpoint to upload an image by link
app.post('/api/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    const dest = path.join(uploadsDir, newName);

    try {
        await imageDownloader.image({
            url: link,
            dest: dest,
        });
        const relativePath = `/uploads/${newName}`; // Create a relative URL for frontend access
        res.json({ message: 'Image downloaded successfully', filePath: relativePath });
    } catch (error) {
        res.status(500).json({ error: 'Failed to download image', details: error.message });
    }
});

// Set up multer for file uploads
const photosMiddleware = multer({ dest: uploadsDir });


app.post('/api/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = [];
    
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No files were uploaded.' });
    }

    for (let i = 0; i < req.files.length; i++) {
        const { path: tempPath, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path.join(uploadsDir, `${Date.now()}-${originalname}`); // Use a unique name

        // Rename the file to include its original extension
        fs.renameSync(tempPath, newPath);
        
        // Store relative path for response
        uploadedFiles.push(newPath.replace(`${uploadsDir}/`, ''));
    }

    // Respond with a list of uploaded files' paths
    res.json(uploadedFiles);
});


//     const uploadedFiles = [];
    
//     // Check if files were uploaded
//     if (!req.files || req.files.length === 0) {
//         return res.status(400).json({ error: 'No files were uploaded.' });
//     }

//     for (let i = 0; i < req.files.length; i++) {
//         const { path: tempPath, originalname } = req.files[i];
//         const parts = originalname.split('.');
//         const ext = parts[parts.length - 1];
//         const newPath = path.join(uploadsDir, `${Date.now()}-${originalname}`); // Use a unique name

//         // Rename the file to include its original extension
//         fs.renameSync(tempPath, newPath);
        
//         // Store relative path for response
//         uploadedFiles.push(newPath.replace(`${uploadsDir}/`, ''));
//     }

//     // Respond with a list of uploaded files' paths
//     res.json(uploadedFiles);
// });

// Start the webserver
app.listen(4000, () => {
    console.log(`Server running on port: ${4000}`);
});