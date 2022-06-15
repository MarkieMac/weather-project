let now = new Date();
let h5 = document.querySelector("h5");

let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];

h5.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${searchInput.value}`;

  let apiKey = "2719487ee0b6b73046038ab7b2d43815";
  let unit = "imperial";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${unit}`;

  axios.get(url).then(showTemp);
}

function currentLocation(position) { 
  let api = "2719487ee0b6b73046038ab7b2d43815";
  let uni = "imperial";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=${uni}`;

  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let hum = response.data.main.humidity;
  let windy = response.data.wind.speed;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let h3 = document.querySelector("h3");
  h3.innerHTML = `${city}`;

  let humElement = document.querySelector("#hum");
  humElement.innerHTML = `${hum}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${windy}mph`;
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentButton = document.querySelector("#location-button");
currentButton.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);


