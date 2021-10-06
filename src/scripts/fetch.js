import { weatherDataDaily } from './functions.js';
import { cityAndLength } from './functions.js';

// DOM Element
const form = document.querySelector('.form');

export async function handleSearch(evt) {
  evt.preventDefault();

  // Form values
  let cityName = evt.target.elements.locationSearch.value;
  const forecastDays = evt.target.elements.period.value;

  // FETCH
  try {
    // Data extraction, needed in the next fetch
    const response1 = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=5be60d4872c3eae278822b9856894ca8`
    );
    const cityLatLon = await response1.json();
    if (response1.status === 404 || cityLatLon.length === 0) {
      throw new Error('City not found');
    }

    const lat = cityLatLon[0].lat;
    const lon = cityLatLon[0].lon;

    const response2 = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=5be60d4872c3eae278822b9856894ca8`
    );
    const weatherData = await response2.json();

    // Local Storage

    try {
      localStorage.setItem(
        'data',
        JSON.stringify({ cityName, forecastDays, weatherData })
      );
    } catch (err) {
      alert('Cannot write to storage');
    }

    // Rendering functions
    cityAndLength(forecastDays, cityName);
    weatherDataDaily(weatherData, forecastDays);

    //
  } catch (err) {
    alert(err);
  }
  form.elements.locationSearch.value = '';
  form.elements.period.value = 1;
}
