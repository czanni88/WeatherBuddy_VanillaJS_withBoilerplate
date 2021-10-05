//Standalone runtime for Regenerator-compiled generator and async functions.
import regeneratorRuntime from 'regenerator-runtime';
import '../styles/main.scss';
import { handleSearch } from './fetch.js';
import { weatherDataDaily, cityAndLength } from './functions';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSearch);

const savedName = localStorage.getItem('cityName');
const savedDays = localStorage.getItem('forecastDays');
const savedWeather = localStorage.getItem('weatherData');
const storagedCityName = JSON.parse(savedName);
const storagedForecastDays = JSON.parse(savedDays);
const storagedWeatherData = JSON.parse(savedWeather);

if (savedName) {
  weatherDataDaily(storagedWeatherData, storagedForecastDays);
  cityAndLength(storagedForecastDays, storagedCityName);
}
