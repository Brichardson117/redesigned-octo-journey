let searchBtn = document.querySelector("#btn");
let cityNameEl = document.querySelector("#state");
let cityName = " ";

//function to get user input
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
  let weatherApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=9d0b4962f3190a47703e718c0e6b86a0`;
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
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityInputEl.value}&limit=5&appid=9d0b4962f3190a47703e718c0e6b86a0`;
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

//function to display weather information for current weather
function displayWeather(data, name) {
    //create element for city name and assign text content and class element
    let cityName = document.createElement('h2');
    cityName.textContent = name;
    cityName.classList = 'uk-card-title'

    //create element for temperate and assign text content and class element
    let temperature = document.createElement('p');
    temperature.textContent = `Temp: ${data.current.temp} °F`;
    temperature.classList = 'uk-card-body'

    //create element for weather imageand assign text content and class element
    let weatherImg = document.createElement('img');
    weatherImg.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`
    weatherImg.classList = 'uk-card-media-top'

    //create element for humidity and assign text content and class element
    let humidity = document.createElement('p')
    humidity.textContent = `Humidity: ${data.current.humidity}%`
    humidity.classList = 'uk-card-body'

    //create element for uv and assign text content and class element
    let uv = document.createElement('p')
    uv.textContent = `Uv Index: ${data.current.uvi}`;
    uv.classList = 'uk-card-body'

    //create element for wind speen and assign text content and class element
    let windSpeed = document.createElement('p');
    windSpeed.textContent = `Windspeed: ${data.current.wind_speed}`
    windSpeed.classList = 'uk-card-body'

    //append created elements to html 
    document.querySelector('#displayWeather').append(weatherImg, cityName, temperature, humidity, uv, windSpeed)
}


//when user clicks find button, run apiCall function
searchBtn.addEventListener("click", apiCall);
