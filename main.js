const inputplace = document.getElementById("inputplace");
const searchbtn = document.getElementById("searchbtn");
const displaytemp = document.getElementById("displaytemp");
const displayfahrenheit = document.getElementById("displayfahrenheit");
const weatherin = document.getElementById("weatherin");
const feelslike = document.getElementById("feelslike");
const tomorrowtemp = document.getElementById("tomorrowtemp");
const tomorrowfeels = document.getElementById("tomorrowfeels");
const tomorrowwind = document.getElementById("tomorrowwind");
const wind = document.getElementById("wind");
const todaylogo = document.getElementById("todaylogo");
const tomorrowlogo = document.getElementById("tomorrowlogo");
const daytwologo = document.getElementById("daytwologo");

const daytwotemp = document.getElementById("daytwotemp");
const daytwofeels = document.getElementById("daytwofeels");
const daytwowind = document.getElementById("daytwowind");
let place;
let placecap;

searchbtn.addEventListener("click", getWeather);
searchbtn.addEventListener("click", getForecast);

function capitalize() {
  place = inputplace.value;
  if (place === "") {
    alert("Please enter a city!");
    return;
  }
  placecap = place.charAt(0).toUpperCase() + place.slice(1);
}

async function getWeather() {
  capitalize();
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=25d5022cfee176b3d360b19a9f7b9b54`,
    { mode: "cors" }
  );
  let weatherData = await response.json();

  if (weatherData.message === "city not found") {
    alert("City not found!");
    return;
  }
  displaytemp.textContent =
    `Temperature: ${(weatherData.main.temp - 273.15).toFixed(0)}` +
    "°C " +
    "/ " +
    ((weatherData.main.temp * 9) / 5 - 459.67).toFixed(0) +
    "°F";

  feelslike.textContent = `Feels like: ${
    (weatherData.main.feels_like - 273.15).toFixed(0) + "°C "
  }`;

  wind.textContent =
    `Wind speed: ${(weatherData.wind.speed * 3.6).toFixed(0)}` + " km/h";

  todaylogo.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
}

async function getForecast() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${place}&APPID=25d5022cfee176b3d360b19a9f7b9b54`,
    { mode: "cors" }
  );
  const forecastData = await response.json();

  tomorrowtemp.textContent =
    `Temperature: ${(forecastData.list[7].main.temp - 273.15).toFixed(0)}` +
    "°C ";
  tomorrowfeels.textContent =
    `Feels like: ${(forecastData.list[7].main.feels_like - 273.15).toFixed(
      0
    )}` + "°C";
  tomorrowwind.textContent =
    `Wind speed: ${(forecastData.list[7].wind.speed * 3.6).toFixed(0)}` +
    " km/h";
  tomorrowlogo.src = `http://openweathermap.org/img/wn/${forecastData.list[7].weather[0].icon}@2x.png`;

  daytwotemp.textContent =
    `Temperature: ${(forecastData.list[15].main.temp - 273.15).toFixed(0)}` +
    "°C ";
  daytwofeels.textContent =
    `Feels like: ${(forecastData.list[15].main.feels_like - 273.15).toFixed(
      0
    )}` + "°C ";
  daytwowind.textContent =
    `Wind speed: ${(forecastData.list[15].wind.speed * 3.6).toFixed(0)}` +
    " km/h";
  daytwologo.src = `http://openweathermap.org/img/wn/${forecastData.list[15].weather[0].icon}@2x.png`;
}
