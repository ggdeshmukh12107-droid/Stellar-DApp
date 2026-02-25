const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

// Setup multer for file uploads (memory storage for simplicity)
const upload = multer({ storage: multer.memoryStorage() });

// Hardcoded sample record to verify against
const sampleRecord = {
  name: "John Doe",
  id: "123456",
  dob: "1990-01-01"
};

// Mock OCR function: Pretend to extract text from uploaded file buffer
function mockOCR(fileBuffer) {
  // For demo, just return a fixed object simulating OCR output
  // In real case, you'd process fileBuffer with OCR library
  return {
    name: "John Doe",
    id: "123456",
    dob: "1990-01-01"
  };
}

// Verification logic comparing OCR output with sample record
function verifyData(ocrData, sample) {
  return (
    ocrData.name === sample.name &&
    ocrData.id === sample.id &&
    ocrData.dob === sample.dob
  );
}

// API endpoint to accept uploads
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  // Mock OCR output from uploaded file
  const ocrOutput = mockOCR(req.file.buffer);

  // Verify OCR output against sample record
  const isVerified = verifyData(ocrOutput, sampleRecord);

  // Return success/failure response
  res.json({ success: isVerified });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});