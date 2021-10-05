const containerForWeatherData = document.querySelector('.weatherDetails');
const weatherHeadline = document.querySelector('.weatherHeadline');

export const cityAndLength = (forecastDays, cityName) => {
  weatherHeadline.innerHTML = `The weather in ${cityName} <br> for
  the next ${forecastDays} ${forecastDays < 2 ? 'Day' : 'Days'}`;
  weatherHeadline.insertAdjacentHTML(
    'beforeend',
    `<button class="clearButton" type="submit">Clear</button>`
  );
};

export const weatherDataDaily = (weatherData, forecastDays) => {
  let dayCount = 0;
  let filteredArray = weatherData.daily.filter(
    (e, index) => index < forecastDays
  );
  containerForWeatherData.innerHTML = '';
  filteredArray.forEach((day) => {
    const { max, min } = day.temp;
    const { main, description } = day.weather[0];
    const { wind_speed, humidity } = day;
    dayCount += 1;

    containerForWeatherData.insertAdjacentHTML(
      'beforeend',
      `<div class="infoByHour">
        <h3>${`day ${dayCount}`}</h3>
        <p>The temperature will vary from ${min}°C to ${max}°C</p>
        <p>The day will be ${
          main === 'Rain' ? `with ${description}` : 'without rain'
        } and the humidity will be at ${humidity}%</p>
        <p>The wind will be at ${wind_speed}m/s, which means a ${
        wind_speed < 3 ? 'weak' : wind_speed < 6 ? 'mild' : 'strong'
      } wind</p>
        
        </div>`
    );
  });
};

export const handleClear = (evt) => {
  evt.preventDefault();

  try {
    localStorage.setItem('cityName', JSON.stringify());
    localStorage.setItem('forecastDays', JSON.stringify());
    localStorage.setItem('weatherData', JSON.stringify());
  } catch (err) {
    alert('Cannot clear storage');
  }
  window.location.reload();
};
