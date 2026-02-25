// server.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Create uploads directory if not exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use(cors());
app.use(express.json());

// Multer storage configuration - save files to disk with unique names
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

// Multer upload instance supporting two files: vehicleImage, idCardImage
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
    fileFilter: function(req, file, cb) {
        // Accept images only
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error("Only JPG, JPEG, PNG images are allowed"));
    },
}).fields([
    { name: "vehicleImage", maxCount: 1 },
    { name: "idCardImage", maxCount: 1 },
]);

// Sample hardcoded ID card record for mock verification
const sampleIdRecord = {
    name: "John Doe",
    idNumber: "123456",
    organization: "Campus Security",
    expirationDate: "2030-12-31",
};

// In-memory access logs
const accessLogs = [];

// Endpoint: Upload images and verify access (mock OCR)
app.post("/api/access-check", (req, res) => {
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.files || !req.files.vehicleImage || !req.files.idCardImage) {
            return res.status(400).json({ error: "Both vehicle and ID card images are required." });
        }

        // Mock OCR output from ID card image
        // In real system, you'd call OCR here to extract text from the idCardImage file
        const ocrOutput = {
            name: "John Doe", // mocked data matching sample record for granted access
            idNumber: "123456",
            organization: "Campus Security",
            expirationDate: "2030-12-31",
        };

        // Verification logic - mock simple match for demo
        const accessGranted =
            ocrOutput.name === sampleIdRecord.name &&
            ocrOutput.idNumber === sampleIdRecord.idNumber &&
            ocrOutput.expirationDate >= new Date().toISOString().slice(0, 10);

        // Record log entry
        const logEntry = {
            timestamp: new Date(),
            vehicleImage: req.files.vehicleImage[0].filename,
            idCardImage: req.files.idCardImage[0].filename,
            accessGranted,
            user: ocrOutput.name,
            idNumber: ocrOutput.idNumber,
        };
        accessLogs.unshift(logEntry); // latest first

        // Keep logs array size reasonable, e.g., last 50 entries
        if (accessLogs.length > 50) {
            accessLogs.pop();
        }

        // Return access decision
        res.json({ accessGranted });
    });
});

// Endpoint: Get access logs for dashboard
app.get("/api/access-logs", (req, res) => {
    // Return simplified data for frontend UI
    res.json(
        accessLogs.map(({ timestamp, accessGranted, user, idNumber, vehicleImage }) => ({
            timestamp,
            accessGranted,
            user,
            idNumber,
            vehicleImage,
        }))
    );
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});