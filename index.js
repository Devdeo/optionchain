const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

let cachedData = null;
let lastFetched = null;
const CACHE_DURATION_MS = 5000; // 5 seconds

app.get('/api/option-chain-indices', async (req, res) => {
  try {
    const now = Date.now();

    // Serve from cache if it's still valid
    if (cachedData && (now - lastFetched) < CACHE_DURATION_MS) {
      return res.status(200).json(cachedData);
    }

    const { key } = req.query;
    const response = await axios.get(
      `https://www.nseindia.com/api/option-chain-indices?symbol=${key}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      }
    );

    cachedData = response.data;
    lastFetched = now;

    res.status(200).json(cachedData);
  } catch (error) {
    console.error('Error fetching data from NSE:', error);
    res.status(500).json({ error: 'Error fetching data from NSE' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
