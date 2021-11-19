//Standalone runtime for Regenerator-compiled generator and async functions.
import regeneratorRuntime from 'regenerator-runtime';
import '../styles/main.scss';
import { handleSearch } from './fetch.js';
import {
  weatherDailyDataRendering,
  weatherHeadlineRendering,
  handleNewSearch,
} from './functions';

const form = document.querySelector('.searchForm');
const clear = document.querySelector('.weatherHeadline');

form.addEventListener('submit', handleSearch); // Fetch file
clear.addEventListener('submit', handleNewSearch); // Function file

const savedData = JSON.parse(localStorage.getItem('data'));

if (savedData) {
  const { cityName, forecastDays, filteredWeatherDataByDesiredLengthOfStay } =
    savedData;
  weatherDailyDataRendering(filteredWeatherDataByDesiredLengthOfStay);
  weatherHeadlineRendering(forecastDays, cityName);
  const weatherContainer = document.querySelector('.forecastContainer');
  weatherContainer.style.display = 'flex';
  const itemsListContainer = document.querySelector('.itemsListContainer');
  itemsListContainer.style.display = 'flex';
}
