const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your Discord webhook URL
const webhookURL = 'https://discord.com/api/webhooks/1416826208808603738/oEFQFWBBnjkhCT2myvwO_IG-lcmR6vwi3MEWxK3nbIl1f21UCcNQvFFFZ_YctdtmsPCP';

// Middleware
app.use(bodyParser.json());

// Enable CORS for your frontend origin (allow localhost during dev and OnRender in production)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://website-for-shan.onrender.com' // OnRender URL in production
    : 'http://localhost:3001', // Localhost for development
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running. POST visitor data to /send-location');
});

// POST route to handle visitor data
app.post('/send-location', async (req, res) => {
  const data = req.body;

  const content = `📡 **Visitor Info**
**IP:** ${data.ip || 'N/A'}
**City:** ${data.city || 'N/A'}
**Region:** ${data.region || 'N/A'}
**Country:** ${data.country || 'N/A'}
**User Agent:** ${data.userAgent || 'N/A'}
**Platform:** ${data.platform || 'N/A'}
**Screen:** ${data.screen || 'N/A'}
**Language:** ${data.language || 'N/A'}
**Timezone:** ${data.timezone || 'N/A'}`;

  try {
    await axios.post(webhookURL, { content });
    console.log('Visitor data sent to Discord:', content);
    res.status(200).json({ message: 'Visitor data sent to Discord!' });
  } catch (err) {
    console.error('Error sending data to Discord:', err.message);
    res.status(500).json({ error: 'Failed to send data to Discord' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
  