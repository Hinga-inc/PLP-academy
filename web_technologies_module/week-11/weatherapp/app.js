const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const path = require('path'); // Import path module

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const apiKey = process.env.APIKEY;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Server-side endpoint to fetch weather data
app.get('/weather', async (req, res) => {
    const location = req.query.location;
    if (!location) {
        return res.status(400).send({ error: 'Location is required' });
    }

    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            res.json(data);
        } else {
            res.status(data.cod).json({ error: data.message });
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});