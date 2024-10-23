import axios from 'axios';

const API_KEY = '1b2d77afb1fc083593c8516aeb843eec'; // Add your OpenWeatherMap API key here

// Fetch weather data for multiple cities
export const fetchWeatherData = async (cities) => {
  try {
    const cityRequests = cities.map(city =>
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    );
    const weatherResponses = await Promise.all(cityRequests);
    return weatherResponses.map(response => response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return [];
  }
};
