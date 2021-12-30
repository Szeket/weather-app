let dateTime = document.querySelector("#time");
let today = new Date();
let hours = today.getHours();
hours = hours > 9 ? hours : "0" + hours;
let minutes = today.getMinutes();
minutes = minutes > 9 ? minutes : "0" + minutes;

let dayIndex = today.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

dateTime.innerHTML = `${days[dayIndex]}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col monday">
                <div class="day">${formatDay(forecastDay.dt)}</div>
              
                <div class="monday-icon">
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
              alt=""
              />  
                </div>
                <span class="monday-temp-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>/
                <span class="monday-temp-min">${Math.round(
                  forecastDay.temp.min
                )}°
                </span>
                </div>
                `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "0517d60033ca170380a3d6540e3a62e0";
  endpoint = `
  https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(endpoint);
  axios.get(endpoint).then(displayForecast);
}

function showTemperature(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".description").innerHTML =
    response.data.weather[0].description;

  document.querySelector(".humidity").innerHTML = response.data.main.humidity;

  document.querySelector("h1").innerHTML = response.data.name;
  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();

  let city = document.querySelector("#form-input").value;

  search(city);
}

function search(city) {
  let apiKey = "0517d60033ca170380a3d6540e3a62e0";
  let units = "metric";
  let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(endpoint).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

function getPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(endpoint).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

// Default is celsius
let isFahrenheit = false;

function convertToFahrenheit(event) {
  event.preventDefault();
  if (isFahrenheit !== true) {
    let temperature = document.querySelector("#temp");
    let fahrenheitTemperature = (temperature.innerHTML * 9) / 5 + 32;
    temperature.innerHTML = Math.round(fahrenheitTemperature);
    isFahrenheit = true;
  }
}

let fahrenheitTemperature = document.querySelector("#farenheit-link");
fahrenheitTemperature.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  if (isFahrenheit === true) {
    let temperature = document.querySelector("#temp");
    let celsiusTemperature = ((temperature.innerHTML - 32) * 5) / 9;
    temperature.innerHTML = Math.round(celsiusTemperature);
    isFahrenheit = false;
  }
}
let celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener("click", convertToCelsius);

search("Paredes de Coura");
