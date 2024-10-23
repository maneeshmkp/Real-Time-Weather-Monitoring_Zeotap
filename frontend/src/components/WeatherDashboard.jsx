import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/WeatherService'; // Assuming this service fetches from the backend API
import TemperatureChart from './TemperatureChart'; // Import the TemperatureChart component

// List of cities being monitored
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);       // Stores real-time weather data for each city
  const [dailySummary, setDailySummary] = useState(null);   // Stores the daily summary data (aggregated rollups)
  const [error, setError] = useState(null);                 // Error handling state

  // Function to calculate the daily summary based on the fetched weather data
  const calculateDailySummary = (weatherData) => {
    // Ensure there's data to process
    if (weatherData.length === 0) return null;

    // Extract temperatures and calculate aggregates (average, min, max)
    const temperatures = weatherData.map(data => data.main.temp);
    const avgTemp = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;
    const minTemp = Math.min(...temperatures);
    const maxTemp = Math.max(...temperatures);

    // Count occurrences of weather conditions to determine the dominant one
    const conditionOccurrences = weatherData.map(data => data.weather[0].main)
      .reduce((acc, condition) => {
        acc[condition] = (acc[condition] || 0) + 1;
        return acc;
      }, {});

    // Find the dominant weather condition
    const dominantCondition = Object.keys(conditionOccurrences).reduce((a, b) =>
      conditionOccurrences[a] > conditionOccurrences[b] ? a : b
    );

    // Return the computed daily summary
    return { avgTemp, minTemp, maxTemp, dominantCondition };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData(cities);  // Fetch weather data for multiple cities
        if (data.length > 0) {
          setWeatherData(data);                      // Store fetched data in state

          // Calculate daily summary and update state
          const summary = calculateDailySummary(data);
          setDailySummary(summary);
        } else {
          setError('Failed to fetch weather data');
        }
      } catch (error) {
        setError('An error occurred while fetching data');
      }
    };

    fetchData();  // Initial fetch

    // Fetch data every 5 minutes (300000 ms)
    const intervalId = setInterval(fetchData, 300000);

    return () => clearInterval(intervalId);  // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h1>Real-Time Weather Monitoring Dashboard</h1>

      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          {/* Render daily summary */}
          {dailySummary && (
            <div>
              <h2>Daily Summary</h2>
              <p>Average Temperature: {dailySummary.avgTemp.toFixed(2)}°C</p>
              <p>Minimum Temperature: {dailySummary.minTemp}°C</p>
              <p>Maximum Temperature: {dailySummary.maxTemp}°C</p>
              <p>Dominant Weather Condition: {dailySummary.dominantCondition}</p>
            </div>
          )}

          {/* Render real-time weather data for each city */}
          <ul>
            {weatherData.map((cityWeather, index) => (
              <li key={index}>
                <h2>{cityWeather.name}</h2>
                <p>Temperature: {cityWeather.main.temp}°C</p>
                <p>Feels Like: {cityWeather.main.feels_like}°C</p>
                <p>Condition: {cityWeather.weather[0].main}</p>
              </li>
            ))}
          </ul>

          {/* Render the TemperatureChart with weatherData */}
          <TemperatureChart weatherData={weatherData} />
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
