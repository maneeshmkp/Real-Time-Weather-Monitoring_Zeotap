// backend/routes/weather.js
const express = require('express');
const router = express.Router();
const WeatherSummary = require('../models/WeatherSummary');

router.post('/summary', async (req, res) => {
  const { city, date, averageTemperature, maxTemperature, minTemperature, dominantCondition } = req.body;

  try {
    const weatherSummary = new WeatherSummary({
      city,
      date,
      averageTemperature,
      maxTemperature,
      minTemperature,
      dominantCondition,
    });

    await weatherSummary.save();
    res.status(201).json(weatherSummary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
