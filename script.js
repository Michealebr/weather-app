document.addEventListener("DOMContentLoaded", function(){


const apikey = "f45e282121197355f5a20be2d8a6234e"
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const input = document.querySelector(".searchbar")
const searchBtn = document.querySelector(".search-btn")
const weatherIcon = document.querySelector(".icons")
const weatherContainer = document.querySelector('.waether-app-container');

  // gets the weather of the city inputed for the current day 
async function checkWeather (city){
    const response = await fetch(url + city + `&appid=${apikey}`)
    var data = await response.json()

    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = data.main.temp.toFixed(0) + "°"
    document.querySelector(".description").innerHTML = data.weather[0].main
    document.querySelector(".temp-highs").innerHTML = data.main.temp_max.toFixed(0)
    document.querySelector(".wind-speeds").innerHTML = data.wind.speed.toFixed(0)

    setTimeout(() => {
        // Expand the container smoothly
        weatherContainer.classList.add('expanded');
        // Wait for the expansion animation to finish
        setTimeout(() => {
          // Update weather information
  
          // Remove loading class
          document.querySelector('.weather').classList.remove('loading');
          setTimeout(() => {
            // makes the information appear smoothly 
          document.querySelector('.weather').classList.add('show');
          },50)
        }, 500)
      } ); 


    if(data.weather[0].main === "Clouds"){
        weatherIcon.src = "weather icons/overcast.png"
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "weather icons/sun.png"
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "weather icons/rain.png"
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "weather icons/drizzle.png"
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "weather icons/fog.png"
    }
    else if(data.weather[0].main == "Haze"){
        weatherIcon.src = "weather icons/fog.png"
    }
    else if(data.weather[0].main == "Thunderstorm"){
        weatherIcon.src = "weather icons/thunder.png"
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "weather icons/snow.png"
    }


}

// gets the forecast for the next 5 days 
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q="
async function checkWeatherForecast (city){
    const forecastResponse = await fetch(apiUrl + city + `&appid=${apikey}`)
    var forecastData = await forecastResponse.json()

    // Get the forecast list
    const forecastList = forecastData.list;

    // Group the forecast data by date
    const forecastByDate = {};
    forecastList.forEach(forecast => {
      const date = forecast.dt_txt.split(' ')[0];
      if (forecastByDate[date]) {
        forecastByDate[date].push(forecast);
      } else {
        forecastByDate[date] = [forecast];
      }
    });

//      Function to get the latest next 5 days
  function getLatestNext5Days() {
    const currentDate = new Date();
    const forecastDates = [];

    for (let i = 1; i <= 5; i++) {
      const nextDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
      const formattedDate = nextDate.toISOString().split('T')[0];
      forecastDates.push(formattedDate);
    }

    return forecastDates;
  }

  const forecastDates = getLatestNext5Days();

    const forecastInfo = {};

    // Iterate over the forecast data for each day
    forecastDates.forEach(date => {
      const forecasts = forecastByDate[date];

      // Extract the relevant information for each day
      const maxTemperature = forecasts.reduce((max, forecast) => {
        return Math.max(max, forecast.main.temp);
      }, -Infinity);

      const forecastDate = new Date(date);
      const forecastDay = forecastDate.toLocaleString('en-us', { weekday: 'long' }).substring(0, 3);


      forecastInfo[date] = {

        day: forecastDay,
        temperature: maxTemperature,
        Main: forecasts[0].weather[0].main,

      };
      const forecastAnswer = forecastDates.map((date) => {
        const forecast = forecastInfo[date];
        if (forecast && forecast.day && forecast.temperature) {
          return {
            date,
            day: forecast.day,
            temperature: forecast.temperature.toFixed(0),
          };
        } else {
          return {
            date,
            day: "N/A",
            temperature: "N/A",
          };
        }
      });
     

      document.querySelector(".first-date").innerHTML = forecastAnswer[0].day;
      document.querySelector(".first-date-temp").innerHTML = forecastAnswer[0].temperature + "°";
      document.querySelector(".second-date").innerHTML = forecastAnswer[1].day;
      document.querySelector(".second-date-temp").innerHTML = forecastAnswer[1].temperature + "°";
      document.querySelector(".third-date").innerHTML = forecastAnswer[2].day;
      document.querySelector(".third-date-temp").innerHTML = forecastAnswer[2].temperature + "°";
      document.querySelector(".fourth-date").innerHTML = forecastAnswer[3].day;
      document.querySelector(".fourth-date-temp").innerHTML = forecastAnswer[3].temperature + "°";
      document.querySelector(".fifth-date").innerHTML = forecastAnswer[4].day;
      document.querySelector(".fifth-date-temp").innerHTML = forecastAnswer[4].temperature + "°";




      const iconMappings = {
        Clouds: "weather icons/overcast.png",
        Clear: "weather icons/sun.png",
        Rain: "weather icons/rain.png",
        Drizzle: "weather icons/drizzle.png",
        Mist: "weather icons/fog.png",
        Haze: "weather icons/fog.png",
        Thunderstorm: "weatherunder icons/th.png",
        Snow: "weather icons/snow.png",
      };


      const firstForecastIcon = document.querySelector(".first-icon")
      const secondForecastIcon = document.querySelector(".second-icon")
      const thirdForecastIcon = document.querySelector(".third-icon")
      const fourthForecastIcon = document.querySelector(".fourth-icon")
      const fifthForecastIcon = document.querySelector(".fifth-icon")

    
      if (forecasts[0].weather[0].main in iconMappings) {
        firstForecastIcon.src = iconMappings[forecasts[0].weather[0].main];
      }
      if (forecasts[1].weather[0].main in iconMappings) {
        secondForecastIcon.src = iconMappings[forecasts[1].weather[0].main];
      }
      if (forecasts[2].weather[0].main in iconMappings) {
        thirdForecastIcon.src = iconMappings[forecasts[2].weather[0].main];
      }
      if (forecasts[3].weather[0].main in iconMappings) {
        fourthForecastIcon.src = iconMappings[forecasts[3].weather[0].main];
      }
      if (forecasts[4].weather[0].main in iconMappings) {
        fifthForecastIcon.src = iconMappings[forecasts[4].weather[0].main];
      }
    }
    );
}


searchBtn.addEventListener("click", ()=>{
    checkWeather(input.value)
    checkWeatherForecast(input.value)
})
document.querySelector(".searchbar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        checkWeather(input.value)
    checkWeatherForecast(input.value)
    }
})
})

