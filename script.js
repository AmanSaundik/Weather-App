const apiKey = "4ead0a1c3fdc44825f1d16279cfbf625";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input")
const searchButton = document.querySelector(".search button")
weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiURL+city+`&appid=${apiKey}`)
    if (response.status==404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else{
        var data = await response.json()
        console.log(data);
        document.querySelector(".city").innerHTML = data.name ;
        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".feel").innerHTML = `Feels like: ${Math.round(data.main.feels_like)}°C`
        document.querySelector(".wind").innerHTML = data.wind.speed;
        document.querySelector(".humidity").innerHTML = data.main.humidity;
        if(data.weather[0].main=='Mist'){
            weatherIcon.src = "img/mist.png"
        }
        else if(data.weather[0].main=='Rain'){
            weatherIcon.src = "img/rain.png"
        }
        else if(data.weather[0].main=='Snow'){
            weatherIcon.src = "img/snow.png"
        }
        else if(data.weather[0].main=='Clouds'){
            weatherIcon.src = "img/Clouds.png"
        }
        else if(data.weather[0].main=='Drizzle'){
            weatherIcon.src = "img/drizzle.png"
        }
        else{
            weatherIcon.src = "img/clear.png"
        }
        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
    }
}
searchButton.addEventListener("click",()=>{

    checkWeather(searchBox.value)
})