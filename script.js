const apiKey = "4ead0a1c3fdc44825f1d16279cfbf625";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error");
const weatherSection = document.querySelector(".weather");

async function checkWeather(city) {
    weatherSection.style.display = "none";
    errorMessage.style.display = "none";

    const loadingMessage = document.createElement("p");
    loadingMessage.className = "loading";
    loadingMessage.textContent = "Loading...";
    weatherSection.parentElement.appendChild(loadingMessage);

    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    loadingMessage.remove();

    if (response.status == 404) {
        errorMessage.style.display = "block";
        weatherSection.style.display = "none";
    } else {
        const data = await response.json();
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".feel").textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
        document.querySelector(".wind").textContent = `${data.wind.speed} KMPH`;
        document.querySelector(".humidity").textContent = `${data.main.humidity}%`;

        const weatherCondition = data.weather[0].main;
        if (weatherCondition === 'Mist') {
            weatherIcon.src = "img/mist.png";
        } else if (weatherCondition === 'Rain') {
            weatherIcon.src = "img/rain.png";
        } else if (weatherCondition === 'Snow') {
            weatherIcon.src = "img/snow.png";
        } else if (weatherCondition === 'Clouds') {
            weatherIcon.src = "img/clouds.png";
        } else if (weatherCondition === 'Drizzle') {
            weatherIcon.src = "img/drizzle.png";
        } else {
            weatherIcon.src = "img/clear.png";
        }

        weatherSection.style.display = "block";
        errorMessage.style.display = "none";
    }
}
searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
