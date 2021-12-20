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

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  let fahrenheitTemperature = (temperature.innerHTML * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = document.querySelector("#farenheit-link");
fahrenheitTemperature.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  let celsiusTemperature = ((temperature.innerHTML - 32) * 5) / 9;
  temperature.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener("click", convertToCelsius);

search("Paredes de Coura");
