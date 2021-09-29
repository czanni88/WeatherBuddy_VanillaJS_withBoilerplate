const containerForWeatherData = document.querySelector('.weatherDetails');

export const weatherDataEach3Hours = (dayTimeWeatherData) => {
  dayTimeWeatherData.forEach((periodOf3hs) => {
    const { all } = periodOf3hs.clouds;
    const { feels_like, humidity, temp, temp_max, temp_min } = periodOf3hs.main;
    const { main, description } = periodOf3hs.weather[0];
    const { speed } = periodOf3hs.wind;
    const { dt_txt } = periodOf3hs;

    containerForWeatherData.insertAdjacentHTML(
      'beforeend',
      `<div class="infoByHour">
        <h3>${dt_txt}</h3>
        <p>Temp: ${temp}°C varying from ${temp_min}°C to ${temp_max}°C</p>
        <p>The sky will have ${all}% of clouds ${
        main === 'Rain' ? `with ${description}` : 'without rain'
      } and the humidity will be at ${humidity}%</p>
        <p>The wind will be at ${speed}m/s, which means a ${
        speed < 3 ? 'weak' : speed < 6 ? 'mild' : 'strong'
      } wind</p>
          <p>The temperature feeling will be: ${feels_like}°C</p>
        </div>`
    );
  });
};

export const weatherDataDaily = (weatherData) => {
  let dayCount = 0;
  weatherData.daily.forEach((day) => {
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
