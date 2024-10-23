// backend/services/weatherService.js
const axios = require('axios');

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const fetchWeatherData = async (city) => {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
    return response.data;
};

const convertTemperature = (tempK) => {
    return tempK - 273.15; // Convert from Kelvin to Celsius
};

module.exports = { fetchWeatherData, convertTemperature };
