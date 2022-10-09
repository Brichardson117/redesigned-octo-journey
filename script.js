let searchBtn = document.querySelector("#btn");
let cityNameEl = document.querySelector("#state");

//function to get user input
let searchLocationHandler = function (event) {
  event.preventDefault();

  let city = cityNameEl.value.trim;
  if (city) {
    getWeatherRepo(city);
    cityNameEl.value = " ";
  } else {
    wiindow.alert("Please enter valid Location.");
  }
};

//function fot the api call to get the weather for users given location
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

//function for api call to get lat, log, and data from users given location
function apiCall() {
  const cityInputEl = document.querySelector("#citySearch");
  const baseUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInputEl.value}&limit=5&appid=9d0b4962f3190a47703e718c0e6b86a0`;
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

  let primaryDiv = document.createElement("div");
  if(data.current.weather[0].main === 'Clear'){
      primaryDiv.classList = "primaryCard sunny";
  } else if(data.current.weather[0].main === 'Clouds'){
    primaryDiv.classList = "primaryCard snow";
  } else if(data.current.weather[0].main === 'Rain'){
    primaryDiv.classList = "primaryCard rain";
  } else if(data.current.weather[0].main === 'Snow') {
    primaryDiv.classList = "primaryCard snow";
  }



  let cityName = document.createElement("h2");
  cityName.textContent = name;

  //create element for temperate and assign text content and class element
  let temperature = document.createElement("p");
  temperature.textContent = `Temp: ${data.current.temp} °F`;
  // temperature.classList = 'display-2 my-3'

  //create element for weather imageand assign text content and class element
  let weatherImg = document.createElement("img");
  weatherImg.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;
  weatherImg.classList = "width:100%";
  weatherImg.alt = "weather image";

  //create element for humidity and assign text content and class element
  let humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${data.current.humidity}%`;
  // humidity.classList = 'mb-2'

  //create element for uv and assign text content and class element
  let uv = document.createElement("p");
  uv.textContent = `Uv Index: ${data.current.uvi}`;

  //create element for wind speen and assign text content and class element
  let windSpeed = document.createElement("p");
  windSpeed.textContent = `Windspeed: ${data.current.wind_speed}mph`;


  for (let i = 0; i < data.daily.length; i++) {
    let forecastCard = document.createElement("div");
    forecastCard.classList = "secondaryCard col";

    let dailyName = document.createElement("h2");
    dailyName.textContent = name;
    // dailyName.classList = 'card'

    let dailyTemp = document.createElement("p");
    dailyTemp.textContent = `Temp: ${data.daily[i].temp.day} °F`;

    let dailyImg = document.createElement("img");
    dailyImg.src = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`;

    let dailyHumidity = document.createElement("p");
    dailyHumidity.textContent = ` Humidity: ${data.daily[i].humidity}%`;

    let dailyUV = document.createElement("p");
    dailyUV.textContent = `UV Index: ${data.daily[i].uvi}`;

    let dailyWindspeed = document.createElement("p");
    dailyWindspeed.textContent = `Windspeed: ${data.daily[i].wind_speed}mph`;

    forecastCard.append(
      dailyName,
      dailyImg,
      dailyTemp,
      dailyHumidity,
      dailyUV,
      dailyWindspeed
    );

    document.querySelector("#dailyForecast").append(forecastCard);
  }

  //append created elements to html

  primaryDiv.append(weatherImg, cityName, temperature, humidity, uv, windSpeed,);
  document.querySelector("#displayWeather").append(primaryDiv);
}

//event listener, runs function apiCall on 'click'
searchBtn.addEventListener("click", apiCall);
