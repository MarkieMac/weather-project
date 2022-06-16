function formatDate(timestamp) {


let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10){
  hours = `0${hours}`;
}
 
let minutes = date.getMinutes();
if (minutes < 10){
  minutes = `0${minutes}`;
}

let days = 
["Sunday", 
"Monday", 
"Tuesay", 
"Wednesday", 
"Thursday", 
"Friday", 
"Saturday"];
let day =days[date.getDay()];


return `${day} ${hours}:${minutes}`;
} 

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;
  
  days.forEach(function (day) {
 
  forecastHTML = forecastHTML + 
  `
    <div class="col-3">
      <div class="weather-forecast-date">
     ${day}    </div> 
      <img 
      src="http://openweathermap.org/img/wn/50d@2x.png"
      alt=""
      width="42"/>
      <div class-="weather-forecast-temperatures">
      <span class="weather-forecast-max">89°</span>
      <span  class="weather-forecast-min">73°</span>
     
   
    </div>
   </div>


`;
});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {

  let apKey = "2719487ee0b6b73046038ab7b2d43815";
  let apUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apKey}&units=imperial`;
  axios.get(apUrl).then(displayForecast);

}
function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let hum = response.data.main.humidity;
  let windy = Math.round(response.data.wind.speed);
 
  fahrenheitTemperature = response.data.main.temp;
  
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;

  let h3 = document.querySelector("h3");
  h3.innerHTML = `${city}`;
  
  let dateElement= document.querySelector("h5");
  dateElement.innerHTML = formatDate(response.data.dt * 1000); 
  
  let iconElement= document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  
  
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
 
  let humElement = document.querySelector("#hum");
  humElement.innerHTML = `${hum}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${windy}mph`;
  
  getForecast(response.data.coord);

}

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


function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
function  showCelseiusTemperature(event){
  event.preventDefault();
  let celseiusTemperature= (fahrenheitTemperature-32) / 1.8;
  let tElement = document.querySelector("#temperature");
  tElement.innerHTML = Math.round(celseiusTemperature);
  fahrenheitlink.classList.remove("active");
  celseiuslink.classList.add("active");

}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let tElement = document.querySelector("#temperature");
  tElement.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitlink.classList.add("active");
  celseiuslink.classList.remove("active");
  

}


let currentButton = document.querySelector("#location-button");
currentButton.addEventListener("click", getCurrentLocation);

let fahrenheitTemperature= null;


let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let celseiuslink= document.querySelector("#celseiuslink");
celseiuslink.addEventListener("click", showCelseiusTemperature);

let fahrenheitlink= document.querySelector("#fahrenheitlink");
fahrenheitlink.addEventListener("click", showFahrenheitTemperature);


