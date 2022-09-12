let searchBtn = document.querySelector("#btn");
let cityNameEl = document.querySelector("#state");
let cityName = " ";

let searchLocationHandler = function (event) {
  event.preventDefault();

  let city = cityNameEl.value.trim;
  if (city) {
    getWeatherRepo(city);
    cityNameEl.value = " ";
  } else {
    alert("Please enter valid Location.");
  }
};

let getWeatherRepo = function (lat, lon, name) {
  let weatherApi =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=9d0b4962f3190a47703e718c0e6b86a0";
  fetch(weatherApi).then(function (respone) {
    if (respone.ok) {
      respone.json().then(function (data) {
        displayWeather(data, name);
        console.log(data);
      });
    } else {
      alert("Cannot get weather for that location.");
    }
  });
};

function apiCall() {
  const cityInputEl = document.querySelector("#citySearch");
  const baseUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInputEl.value +
    "&limit=5&appid=9d0b4962f3190a47703e718c0e6b86a0";
  fetch(baseUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getWeatherRepo(data[0].lat, data[0].lon, data[0].name);
      //
    });
}

function displayWeather() {
    let 
}
searchBtn.addEventListener("click", apiCall);
