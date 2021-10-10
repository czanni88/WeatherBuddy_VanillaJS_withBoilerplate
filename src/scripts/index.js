//Standalone runtime for Regenerator-compiled generator and async functions.
import regeneratorRuntime from 'regenerator-runtime';
import '../styles/main.scss';
import { handleSearch } from './fetch.js';
import { weatherDataDaily, cityAndLength, handleClear } from './functions';

const form = document.querySelector('.form');
const clear = document.querySelector('.weatherHeadline');

form.addEventListener('submit', handleSearch); // Fetch file
clear.addEventListener('submit', handleClear); // Function file

const savedData = JSON.parse(localStorage.getItem('data'));

if (savedData) {
  const { cityName, forecastDays, filteredWeatherData } = savedData;
  weatherDataDaily(filteredWeatherData);
  cityAndLength(forecastDays, cityName);
}

// HALL OF SHAME /// :D
// const savedName = localStorage.getItem('cityName');
// const savedDays = localStorage.getItem('forecastDays');
// const savedWeather = localStorage.getItem('weatherData');
// const storagedCityName = JSON.parse(savedName);
// const storagedForecastDays = JSON.parse(savedDays);
// const storagedWeatherData = JSON.parse(savedWeather);

// if (savedName) {
//   weatherDataDaily(storagedWeatherData, storagedForecastDays);
//   cityAndLength(storagedForecastDays, storagedCityName);
// }
