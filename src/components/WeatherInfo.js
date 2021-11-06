export const WeatherInfo=(dayCount, min, max, main, description, humidity, wind_speed)=>{
    
    `<div class="infoByDay">
      <h3>${`day ${dayCount}`}</h3>
      <p class="temp">The temperature will vary from ${min}°C to ${max}°C</p>
      <p class  ="rain">The day will be ${
        main === 'Rain' ? `with ${description}` : 'without rain'
      } and the humidity will be at ${humidity}%</p>
      <p class="wind">The wind will be at ${wind_speed}m/s, which means a ${
      wind_speed < 3 ? 'weak' : wind_speed < 6 ? 'mild' : 'strong'
    } wind</p>
      
      </div>`
}