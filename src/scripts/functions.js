const containerForWeatherData = document.querySelector(".weatherDetails");
const actualLocation = document.querySelector(".actualLocation");

export const weatherDataEach3Hours = (dayTimeWeatherData) => {
  dayTimeWeatherData.forEach((periodOf3hs) => {
    const { all } = periodOf3hs.clouds;
    const { feels_like, humidity, temp, temp_max, temp_min } = periodOf3hs.main;
    const { main, description } = periodOf3hs.weather[0];
    const { speed } = periodOf3hs.wind;
    const { dt_txt } = periodOf3hs;

    containerForWeatherData.insertAdjacentHTML(
      "beforeend",
      `<div class="infoByHour">
        <h3>${dt_txt}</h3>
        <p>Temp: ${temp}°C varying from ${temp_min}°C to ${temp_max}°C</p>
        <p>The sky will have ${all}% of clouds ${
        main === "Rain" ? `with ${description}` : "without rain"
      } and the humidity will be at ${humidity}%</p>
        <p>The wind will be at ${speed}m/s, which means a ${
        speed < 3 ? "weak" : speed < 6 ? "mild" : "strong"
      } wind</p>
          <p>The temperature feeling will be: ${feels_like}°C</p>
        </div>`
    );
  });
};

export const weatherDataByDay = (
  dayAndNightWeatherData,
  dayTimeWeatherData
) => {
  const date = parseInt(dayAndNightWeatherData.list[0].dt_txt.substring(8, 10));

  let bundleDays = {
    dayOne: [],
    dayTwo: [],
    dayThree: [],
    dayFour: [],
    dayFive: [],
    daySix: [],
  };

  for (let obj of dayTimeWeatherData) {
    if (date === parseInt(obj.dt_txt.substring(8, 10))) {
      bundleDays.dayOne = [...bundleDays.dayOne, obj];
    } else if (date + 1 === parseInt(obj.dt_txt.substring(8, 10))) {
      bundleDays.dayTwo = [...bundleDays.dayTwo, obj];
    } else if (date + 2 === parseInt(obj.dt_txt.substring(8, 10))) {
      bundleDays.dayThree = [...bundleDays.dayThree, obj];
    } else if (date + 3 === parseInt(obj.dt_txt.substring(8, 10))) {
      bundleDays.dayFour = [...bundleDays.dayFour, obj];
    } else if (date + 4 === parseInt(obj.dt_txt.substring(8, 10))) {
      bundleDays.dayFive = [...bundleDays.dayFive, obj];
    } else {
      bundleDays.daySix = [...bundleDays.daySix, obj];
    }
  }
  console.log(bundleDays);
  return bundleDays;
};
