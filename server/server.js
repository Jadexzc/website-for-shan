const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3000; // Use dynamic port for production

// Replace with your Discord webhook URL
const webhookURL = 'https://discord.com/api/webhooks/1416826208808603738/oEFQFWBBnjkhCT2myvwO_IG-lcmR6vwi3MEWxK3nbIl1f21UCcNQvFFFZ_YctdtmsPCP';

// Middleware for parsing JSON bodies
app.use(express.json()); // Use express.json() instead of body-parser

// CORS Configuration (local and production)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://website-for-shan.onrender.com'  // OnRender URL for production
    : 'http://localhost:3001', // Local development URL
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

// Basic route to test if server is running
app.get('/', (req, res) => {
  res.send('Server is running. POST visitor data to /send-location');
});

// POST route to handle visitor data
app.post('/send-location', async (req, res) => {
  const { ip, city, region, country } = req.body;

  // Check if essential fields are missing
  if (!ip || !city || !region || !country) {
    return res.status(400).json({ error: 'Missing required visitor data' });
  }

  const content = `📡 **Visitor Info**
  **IP:** ${ip}
  **City:** ${city}
  **Region:** ${region}
  **Country:** ${country}
  **User Agent:** ${req.body.userAgent || 'N/A'}
  **Platform:** ${req.body.platform || 'N/A'}
  **Screen:** ${req.body.screen || 'N/A'}
  **Language:** ${req.body.language || 'N/A'}
  **Timezone:** ${req.body.timezone || 'N/A'}`;

  try {
    // Send the content to Discord webhook
    await axios.post(webhookURL, { content });
    console.log('Visitor data sent to Discord:', content);
    res.status(200).json({ message: 'Visitor data sent to Discord!' });
  } catch (err) {
    console.error('Error sending data to Discord:', err); // Log full error object
    res.status(500).json({ error: 'Failed to send data to Discord' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
