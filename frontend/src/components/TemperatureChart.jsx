// Import necessary components from Chart.js
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,       // The scale you need to register
    CategoryScale,     // For the x-axis (categories)
    Tooltip,
    Legend,
    Title,
  } from 'chart.js';
  
  // Register the components globally
  ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,       // Registering the Linear scale
    CategoryScale,     // Registering the Category scale
    Tooltip,
    Legend,
    Title
  );
  
  import { Line } from 'react-chartjs-2';
  
  const TemperatureChart = ({ weatherData }) => {
    const data = {
      labels: weatherData.map(data => new Date(data.dt * 1000).toLocaleDateString()), // x-axis labels
      datasets: [
        {
          label: 'Temperature',
          data: weatherData.map(data => data.main.temp), // y-axis data
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  
    return <Line data={data} />;
  };
  
  export default TemperatureChart;
  