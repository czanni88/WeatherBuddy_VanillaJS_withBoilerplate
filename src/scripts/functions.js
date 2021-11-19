const weatherDailyDetails = document.querySelector('.weatherDailyDetails');
const weatherHeadline = document.querySelector('.weatherHeadline');
const searchFormContainer = document.querySelector('.searchFormContainer');
const weatherContainer = document.querySelector('.forecastContainer');
const itemsListContainer = document.querySelector('.itemsListContainer');

export const weatherHeadlineRendering = (forecastDays, cityName) => {
  searchFormContainer.style.display = 'none';
  let cityNameSanitized = cityName
    .split(' ')
    .map((str) => str[0].toUpperCase() + str.slice(1).toLowerCase())
    .join(' ');
  weatherHeadline.innerHTML = `The weather in ${cityNameSanitized} <br> for
  the next ${forecastDays} ${forecastDays < 2 ? 'Day' : 'Days'}`;
  weatherHeadline.insertAdjacentHTML(
    'beforeend',
    `<button class="button" type="submit">New Search</button>`
  );
};

export const weatherDailyDataRendering = (
  filteredWeatherDataByDesiredLengthOfStay
) => {
  let dayCount = 0;

  weatherDailyDetails.innerHTML = '';
  filteredWeatherDataByDesiredLengthOfStay.forEach((day) => {
    const { max, min } = day.temp;
    const { main, description, icon } = day.weather[0];
    const { wind_speed, humidity } = day;
    dayCount += 1;
    // console.log(day.weather[0]);
    weatherDailyDetails.insertAdjacentHTML(
      'beforeend',
      `<div class="infoByDay">
        <h3>${`day ${dayCount}`}</h3>
        <img class="weatherIcon" src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
        <p class="temp">The temperature will vary from ${min}°C to ${max}°C</p>
        <p class  ="rain"> The day will be ${
          main === 'Rain'
            ? `with ${description}`
            : `with ${description} but without rain`
        } and the humidity will be at ${humidity}%</p>
        <p class="wind">The wind will be at ${wind_speed}m/s, which means a ${
        wind_speed < 3 ? 'weak' : wind_speed < 6 ? 'mild' : 'strong'
      } wind</p>
        
        </div>`
    );
  });
};

export const handleNewSearch = (evt) => {
  evt.preventDefault();
  weatherContainer.style.display = 'none';
  itemsListContainer.style.display = 'none';
  searchFormContainer.style.display = 'block';
  localStorage.clear();
  window.location.reload();
};
