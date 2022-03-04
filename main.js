const inputplace = document.getElementById("inputplace");
const searchbtn = document.getElementById("searchbtn");
const displaytemp = document.getElementById("displaytemp");
const displayfahrenheit = document.getElementById("displayfahrenheit");
const weatherin = document.getElementById("weatherin");
let place;
let placecap;

searchbtn.addEventListener("click", getWeather);
searchbtn.addEventListener("click", getForecast);

function capitalize() {
  place = inputplace.value;
  placecap = place.charAt(0).toUpperCase() + place.slice(1);
}

async function getWeather() {
  capitalize();
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=25d5022cfee176b3d360b19a9f7b9b54`,
    { mode: "cors" }
  );
  let weatherData = await response.json();
  console.log(weatherData);
  displaytemp.textContent =
    (weatherData.main.temp - 273.15).toFixed(0) +
    "°C " +
    "/ " +
    ((weatherData.main.temp * 9) / 5 - 459.67).toFixed(0) +
    "°F";

  weatherin.textContent = `Weather in: ${placecap}`;
}

async function getForecast() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${place}&APPID=25d5022cfee176b3d360b19a9f7b9b54`,
    { mode: "cors" }
  );
  const forecastData = await response.json();
  console.log(forecastData);
  const tomorrowmin = forecastData.list[7].main.temp_min;
  const tomorrowfeels = forecastData.list[7].main.feels_like;
  const tomorrowwind = (forecastData.list[7].wind.speed * 3.6).toFixed(1);
  const daytwomin = forecastData.list[15].main.temp_min;
  const daytwofeels = forecastData.list[15].main.feels_like;
  const daytwowind = (forecastData.list[15].wind.speed * 3.6).toFixed(1);
}
