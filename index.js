const express = require('express');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Serve static HTML file
app.use(express.static(path.join(__dirname)));

// Route to generate QR Code as an image
app.get('/generate', async (req, res) => {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    res.setHeader('Content-Type', 'image/png');
    QRCode.toFileStream(res, text);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`QR Code generator API is running on http://localhost:${port}`);
});