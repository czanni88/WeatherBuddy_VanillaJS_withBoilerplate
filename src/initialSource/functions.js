// DOM SELECTORS

const actualLocation = document.querySelector(".actualLocation");
const containerForWeatherData = document.querySelector(".weatherDetails");
const containerForItensSuggested = document.querySelector(
  ".listOfItensSuggested"
);
const weatherResume = document.querySelector(".weatherResume");

// FUNCTIONS

// Weather details
// export const renderWeatherData = (shortList) => {
//   //   const shortList = data.list.filter((data) => {
//   //     const time = data.dt_txt.substring(11, 13);
//   //     const timeAsNumber = parseInt(time);
//   //     return timeAsNumber >= 9 && timeAsNumber <= 21;
//   //   });

//   ////////////////////
//   // CODE BELLOW WAS HERE
//   /////////////////////

//   shortList.forEach((periodOf3hs) => {
//     const { all } = periodOf3hs.clouds;
//     const { feels_like, humidity, temp, temp_max, temp_min } = periodOf3hs.main;
//     const { main, description } = periodOf3hs.weather[0];
//     const { speed } = periodOf3hs.wind;
//     const { dt_txt } = periodOf3hs;

//     containerForWeatherData.insertAdjacentHTML(
//       "beforeend",
//       `<li>
//       <h3>${dt_txt}</h3>
//       <p>Temp: ${temp}°C varying from ${temp_min}°C to ${temp_max}°C</p>
//       <p>The sky will have ${all}% of clouds ${
//         main === "Rain" ? `with ${description}` : "without rain"
//       } and the humidity will be at ${humidity}%</p>
//       <p>The wind will be at ${speed}m/s, which means a ${
//         speed < 3 ? "weak" : speed < 6 ? "mild" : "strong"
//       } wind</p>
//         <p>The temperature feeling will be: ${feels_like}°C</p>
//       </li>`
//     );
//   });
// };

// Weather resume and Liste of Itens
export const renderItensSuggested = (shortList) => {
  //   const shortList = data.list.filter((data) => {
  //     const time = data.dt_txt.substring(11, 13);
  //     const timeAsNumber = parseInt(time);
  //     return timeAsNumber >= 9 && timeAsNumber <= 21;
  //   });

  ////////////////////////////////// THIS PIECE OF CODE CAME FROM UP THERE /////////////////////////////////////////////
  let skyStatus = [];
  shortList.forEach((period) => {
    skyStatus.push(period.weather[0].main);
  });

  let skyStatusCountPerType = skyStatus.reduce((acc, status) => {
    if (status in acc) {
      acc[status]++;
    } else {
      acc[status] = 1;
    }
    return acc;
  }, {});

  const percentOfClearSky =
    (skyStatusCountPerType.Clear / skyStatus.length) * 100;
  const percentOfCloudSky =
    (skyStatusCountPerType.Clouds / skyStatus.length) * 100;
  const percentOfRainySky =
    (skyStatusCountPerType.Rain / skyStatus.length) * 100;

  //   const { name } = data.city;
  //   const { lat, lon } = data.city.coord;

  //   actualLocation.innerHTML = `${name}`;

  weatherResume.innerHTML = `During the period of your stay, the sky in CITY will be clear of clouds ${
    percentOfClearSky ? percentOfClearSky : 0
  }% of the time, will have clouds ${
    percentOfCloudSky ? percentOfCloudSky : 0
  }% of the time and ${
    percentOfRainySky
      ? `you will face rain ${percentOfRainySky}% of the time`
      : "will not rain."
  } 
  ** CITY is located at: Latitude: LAT Longitude: LON`;
  ////////////////////////////////// THIS PIECE OF CODE CAME FROM UP THERE /////////////////////////////////////////////
};
