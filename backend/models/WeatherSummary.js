const mongoose = require('mongoose');

const weatherSummarySchema = new mongoose.Schema({
  city: { type: String, required: true },
  date: { type: Date, required: true },
  averageTemperature: { type: Number, required: true },
  maxTemperature: { type: Number, required: true },
  minTemperature: { type: Number, required: true },
  dominantCondition: { type: String, required: true },
});

const WeatherSummary = mongoose.model('WeatherSummary', weatherSummarySchema);

module.exports = WeatherSummary;
