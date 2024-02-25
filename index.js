function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000)
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formateDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity + " "+ "%";
  windSpeedElement.innerHTML = response.data.wind.speed + " "+ "km/h";
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);

}
function formateDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  return day + " "+hours + ":"+ (date.getMinutes() < 10 ? '0': '') + minutes + "," + " ";
}

function searchCity(city) {
    let apiKey = "125bf6o454dd320dtf3a85f9830bacf6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);

}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);

}

function getForecast(city) {
  let apiKey = "125bf6o454dd320dtf3a85f9830bacf6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);


}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tues", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function(day){

forecastHtml = 
   forecastHtml + `<div class="weather-forecast">
            <div class="row">
                <div class="col-2">
                    <p class="forecast-date">${day}</p>
                    <img id="forecast-icon" src=" http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png">
                    <div class="weather-forecast-temperature">
                        <p>
                            <span class=" weather-forecast-temperature-max">
                                <strong>27°</strong>
                            </span>
                            <span class="weather-forecast-temperature-min">
                            12°
                        </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `;
  });

  forecastElement.innerHTML = forecastHtml;
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

displayForecast();

