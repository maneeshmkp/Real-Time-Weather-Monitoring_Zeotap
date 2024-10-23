const express = require('express'); // Import Express framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB
const WebSocket = require('ws'); // Import the WebSocket library
const http = require('http'); // Import the http module
const axios = require('axios'); // Import Axios for API requests

const app = express(); // Create an Express application
const server = http.createServer(app); // Create an HTTP server using Express

const wss = new WebSocket.Server({ server }); // Set up WebSocket server

// Function to fetch current weather data
async function fetchWeatherData() {
    const API_KEY = process.env.API_KEY; // Ensure you have your API key in the .env file
    const city = 'Delhi'; // Example city
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    return response.data.main.temp; // Return current temperature in Celsius
}

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Optional: Send a welcome message to the client
    ws.send('Welcome to the Weather Monitoring WebSocket!');

    // Set the threshold for alerts
    const threshold = 35; // Set your threshold for alerting

    // Function to check the temperature and send alerts
    const checkTemperature = async () => {
        try {
            const temperature = await fetchWeatherData(); // Fetch current temperature
            console.log(`Current Temperature: ${temperature}°C`);

            // Check if the temperature exceeds the threshold
            if (temperature > threshold) {
                ws.send('Alert: Temperature threshold exceeded!'); // Send alert to client
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            ws.send('Error fetching weather data');
        }
    };

    // Call checkTemperature every 5 minutes (300000 milliseconds)
    const intervalId = setInterval(checkTemperature, 300000);

    // Clear the interval when the WebSocket connection is closed
    ws.on('close', () => {
        clearInterval(intervalId);
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
