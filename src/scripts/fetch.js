// import { weatherDataEach3Hours } from './functions.js';

// export async function handleSearch(evt) {
//   evt.preventDefault();

//   // Form values
//   const cityName = evt.target.elements.locationSearch.value;
//   const periodOfStay = evt.target.elements.period.value;

//   // DOM elements
//   const actualLocation = document.querySelector('.actualLocation');

//   try {
//     const response = await fetch(
//       `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=5be60d4872c3eae278822b9856894ca8`
//     );
//     const dayAndNightWeatherData = await response.json();
//     if (response.status === 404) {
//       throw new Error('City not found');
//     }
//     actualLocation.innerHTML = cityName;

//     const dayTimeWeatherData = dayAndNightWeatherData.list.filter((data) => {
//       const time = parseInt(data.dt_txt.substring(11, 13));
//       return time >= 9 && time <= 21;
//     });

//     weatherDataEach3Hours(dayTimeWeatherData);

//     console.log(dayAndNightWeatherData);
//   } catch (err) {
//     alert(err);
//   }
// }
