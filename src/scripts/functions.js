const weatherDailyDetails = document.querySelector('.weatherDailyDetails');
const weatherHeadline = document.querySelector('.weatherHeadline');
const searchFormContainer = document.querySelector('.searchFormContainer');
const weatherContainer = document.querySelector('.forecastContainer');
const itemsListContainer = document.querySelector('.itemsListContainer');
const form = document.querySelector('.searchForm');
const itemsList = document.querySelector('.itemsList');

let listOfItems;
let arrOfItems;

const itemsSuggestions = {
  rain: ['Umbrella', 'Rubber Boot'],
  clouds: ['Jacket', 'Scarf'],
  clear: ['Short', 'Sunscreen'],
};

export async function handleSearch(e) {
  e.preventDefault();

  let cityName = e.target.elements.locationSearch.value;
  const lengthOfStay = e.target.elements.period.value;

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

    // SECOND FETCH

    const response2 = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=5be60d4872c3eae278822b9856894ca8`
    );
    const weatherData = await response2.json();

    let arrayOfDailyData_LengthOfStay = weatherData.daily.filter(
      (e, index) => index < lengthOfStay
    );

    // Local Storage

    try {
      localStorage.setItem(
        'data',
        JSON.stringify({
          cityName,
          lengthOfStay,
          arrayOfDailyData_LengthOfStay,
        })
      );
    } catch (err) {
      alert('Cannot write to storage');
    }

    // Rendering functions

    weatherContainer.style.display = 'flex';
    itemsListContainer.style.display = 'flex';

    weatherDailyDataRendering(arrayOfDailyData_LengthOfStay);
    weatherHeadlineRendering(lengthOfStay, cityName);

    const compiledWeatherData = arrayOfDailyData_LengthOfStay.reduce(
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

    const { sumOfMax, sumOfMin, arrayOfMain } = compiledWeatherData;
    const averageMaxTemp = sumOfMax / lengthOfStay;
    const averageMinTemp = sumOfMin / lengthOfStay;
    const typesOfSky = arrayOfMain.filter(
      (sky, index) => arrayOfMain.indexOf(sky) === index
    );

    typesOfSky.map((sky) => {
      if (sky === 'Rain') {
        itemsSuggestions.rain.map((item) => {
          return itemsList.insertAdjacentHTML(
            'beforeend',
            `<li> ${item} <button class="itemButton">x</button></li>`
          );
        });
      } else if (sky === 'Clouds') {
        itemsSuggestions.clouds.map((item) => {
          return itemsList.insertAdjacentHTML(
            'beforeend',
            `<li> ${item} <button class="itemButton">x</button></li>`
          );
        });
      } else if (sky === 'Clear') {
        itemsSuggestions.clear.map((item) => {
          return itemsList.insertAdjacentHTML(
            'beforeend',
            `<li> ${item} <button class="itemButton">x</button></li>`
          );
        });
      }
      document.querySelectorAll('.itemButton').forEach((item) => {
        item.addEventListener('click', removeItem);
      });
    });
  } catch (err) {
    alert(err);
  }

  // Populate array with Items suggestions to be saved in LocalStorage
  listOfItems = document.getElementsByTagName('li');
  arrOfItems = Array.from(listOfItems);
  console.log(arrOfItems);
  saveToLocalStorage();
  form.reset();
}

export const weatherHeadlineRendering = (lengthOfStay, cityName) => {
  searchFormContainer.style.display = 'none'; // Having the "display none" here instead of inside the handleSearch function, avoids having a blank page while the fetching is not completed.
  let cityNameSanitized = cityName
    .split(' ')
    .map((str) => str[0].toUpperCase() + str.slice(1).toLowerCase())
    .join(' ');
  weatherHeadline.innerHTML = `The weather in ${cityNameSanitized} <br> for
  the next ${lengthOfStay} ${lengthOfStay < 2 ? 'Day' : 'Days'}`;
  weatherHeadline.insertAdjacentHTML(
    'beforeend',
    `<button class="button newSearch" type="button">New Search</button>`
  );
  const newSearchButton = document.querySelector('.newSearch');
  newSearchButton.addEventListener('click', handleNewSearch);
};

export const weatherDailyDataRendering = (arrayOfDailyData_LengthOfStay) => {
  let dayCount = 0;

  weatherDailyDetails.innerHTML = '';
  arrayOfDailyData_LengthOfStay.forEach((day) => {
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
            : main === 'Clouds'
            ? `with ${description} but without rain`
            : `with ${description}`
        } and the humidity will be at ${humidity}%</p>
        <p class="wind">The wind will be at ${wind_speed}m/s, which means a ${
        wind_speed < 3 ? 'weak' : wind_speed < 6 ? 'mild' : 'strong'
      } wind</p>
        </div>`
    );
  });
};

export const addItem = (e) => {
  e.preventDefault();
  let itemValue = e.target.elements.addItems.value;

  itemsList.insertAdjacentHTML(
    'beforeend',
    `<li> ${itemValue} <button class="itemButton">x</button></li>`
  );
  document.querySelectorAll('.itemButton').forEach((item) => {
    item.addEventListener('click', removeItem);
  });
  listOfItems = document.getElementsByTagName('li');
  arrOfItems = Array.from(listOfItems);
  saveToLocalStorage();
  e.target.elements.addItems.value = '';
  console.log(arrOfItems);
};

const removeItem = (e) => {
  const toRemove = e.target.parentElement.firstChild.data;

  arrOfItems.map((item) => {
    if (item.firstChild.data.includes(toRemove)) {
      item.remove();
      arrOfItems.splice(arrOfItems.indexOf(item), 1);
      console.log(arrOfItems);
    }
    saveToLocalStorage();
  });
};

export const handleNewSearch = (e) => {
  e.preventDefault();
  weatherContainer.style.display = 'none';
  itemsListContainer.style.display = 'none';
  searchFormContainer.style.display = 'block';
  arrOfItems;
  localStorage.clear();
  window.location.reload();
};

const saveToLocalStorage = () => {
  let arrOfValues = [];
  arrOfItems.map((item) => {
    arrOfValues.push(item.firstChild.data);
  });
  try {
    localStorage.setItem('items', JSON.stringify(arrOfValues));
  } catch (err) {
    alert('Cannot write to storage');
  }
};

export const handleLocalStorage = (savedData, savedItems) => {
  const { cityName, lengthOfStay, arrayOfDailyData_LengthOfStay } = savedData;
  weatherDailyDataRendering(arrayOfDailyData_LengthOfStay);
  weatherHeadlineRendering(lengthOfStay, cityName);
  weatherContainer.style.display = 'flex';
  itemsListContainer.style.display = 'flex';
  savedItems.map((item) => {
    return itemsList.insertAdjacentHTML(
      'beforeend',
      `<li> ${item} <button class="itemButton">x</button></li>`
    );
  });

  document.querySelectorAll('.itemButton').forEach((item) => {
    item.addEventListener('click', removeItem);
  });
  listOfItems = document.getElementsByTagName('li');
  arrOfItems = Array.from(listOfItems);
};
