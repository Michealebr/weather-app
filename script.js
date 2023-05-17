document.addEventListener("DOMContentLoaded", function(){


const apikey = "f45e282121197355f5a20be2d8a6234e"
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&exclude=daily&q="

const input = document.querySelector(".searchbar")
const searchBtn = document.querySelector(".search-btn")
const weatherIcon = document.querySelector(".icons")


  
async function checkWeather (city){
    const response = await fetch(url + city + `&appid=${apikey}`)
    var data = await response.json()
    console.log(data)

    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = data.main.temp
    document.querySelector(".description").innerHTML = data.weather[0].main
    document.querySelector(".temp-highs").innerHTML = data.main.temp_max
    document.querySelector(".wind-speeds").innerHTML = data.wind.speed


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
//    getWeather(cityInput)    
searchBtn.addEventListener("click", ()=>{
    checkWeather(input.value)
})
})
