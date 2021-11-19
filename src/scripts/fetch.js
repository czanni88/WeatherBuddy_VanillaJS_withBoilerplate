import {
  weatherHeadlineRendering,
  weatherDailyDataRendering,
} from './functions.js';

export async function handleSearch(evt) {
  evt.preventDefault();

  const weatherContainer = document.querySelector('.forecastContainer');
  const itemsListContainer = document.querySelector('.itemsListContainer');

  //
  // Form values
  let cityName = evt.target.elements.locationSearch.value;
  const forecastDays = evt.target.elements.period.value;

  //
  // FETCH
  try {
    // FIRST FETCH - Extracting parameters: In order to be able to Fetch using "City Name", we need to first extract "Latitude" and "Longitude" from the first Fetch. The SECOND FETCH is the one that we want but it wont accept "City Name" as valid parameter.

    const response1 = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=5be60d4872c3eae278822b9856894ca8`
    );
    const cityLatLon = await response1.json();
    if (response1.status === 404 || cityLatLon.length === 0) {
      throw new Error('City not found');
    }

    const lat = cityLatLon[0].lat;
    const lon = cityLatLon[0].lon;

    //
    // SECOND FETCH

    const response2 = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=5be60d4872c3eae278822b9856894ca8`
    );
    const weatherData = await response2.json();

    let filteredWeatherDataByDesiredLengthOfStay = weatherData.daily.filter(
      (e, index) => index < forecastDays
    );

    //
    // Local Storage

    try {
      localStorage.setItem(
        'data',
        JSON.stringify({
          cityName,
          forecastDays,
          filteredWeatherDataByDesiredLengthOfStay,
        })
      );
    } catch (err) {
      alert('Cannot write to storage');
    }

    //
    // Rendering functions

    weatherContainer.style.display = 'flex';
    itemsListContainer.style.display = 'flex';

    weatherHeadlineRendering(forecastDays, cityName);
    weatherDailyDataRendering(filteredWeatherDataByDesiredLengthOfStay);

    const compiledWeatherData = filteredWeatherDataByDesiredLengthOfStay.reduce(
      (acc, obj) => {
        const { max, min } = obj.temp;
        const { main, description } = obj.weather[0];

        return {
          sumOfMax: acc.sumOfMax + max,
          sumOfMin: acc.sumOfMin + min,
          arrayOfMain: [...acc.arrayOfMain, main],
          arrayOfDescription: [...acc.arrayOfDescription, description],
        };
      },
      {
        sumOfMax: 0,
        sumOfMin: 0,
        arrayOfMain: [],
        arrayOfDescription: [],
      }
    );
  } catch (err) {
    alert(err);
  }

  const form = document.querySelector('.searchForm');
  form.reset();
}
