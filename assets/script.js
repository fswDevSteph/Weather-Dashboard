var weatherApiKey = '1e57f9cafb1f7d251058b6d4dccdc7c2';
var fiveDayWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
var city;
var userInputCity;

// Load saved inputs from local storage when the page loads
window.onload = function () {
  displaySavedInputs();
};

document.getElementById('searchBtn').addEventListener('click', latlongSearch);

async function latlongSearch() {
  userInputCity = document.getElementById('citySearchInput').value;
  console.log(userInputCity);
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${userInputCity}&appid=${weatherApiKey}`
  );
  const data = await response.json();
  console.log(data);

  var lat = data[0].lat;
  var lon = data[0].lon;

  let forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
  const forecastResponse = await fetch(forecastUrl);
  const forecastData = await forecastResponse.json();
  console.log(forecastData.list[0].main.temp);
  console.log('string', forecastData.list);
  console.log(forecastData.list[0]);

  const currentWeatherDiv = document.getElementById('currentWeather');
  const currentDay = document.getElementById('currentDay');

  currentWeatherDiv.innerHTML = `
    <p>City: ${userInputCity}</p>
    <p>Date: ${forecastData.list[0].dt_txt}</p>
    <p>Temperature: ${(forecastData.list[0].main.temp - 273.15).toFixed(
      2
    )}°C </p> 
    <p>Humidity: ${forecastData.list[0].main.humidity}%</p>
    <p>Wind: ${forecastData.list[0].wind.speed} m/s</p>
    `;

  const forecastDiv = document.getElementById('forecast');
  forecastDiv.innerHTML = '';

  forecastData.list.forEach((forecast, index) => {
    if (index % 8 === 0) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day';

      const dateElement = document.createElement('p');
      const tempElement = document.createElement('p');
      const windElement = document.createElement('p');
      const humidityElement = document.createElement('p');

      const date = new Date(forecast.dt * 1000).toLocaleDateString();
      const tempCelsius = forecast.main.temp - 273.15;

      dateElement.textContent = `Date: ${date}`;
      dayDiv.appendChild(dateElement);

      tempElement.textContent = `Temperature: ${tempCelsius.toFixed(2)}°C`;
      dayDiv.appendChild(tempElement);

      windElement.textContent = `Wind Speed: ${forecast.wind.speed}m/s`;
      dayDiv.appendChild(windElement);

      humidityElement.textContent = `Humidity: ${forecast.main.humidity}%`;
      dayDiv.appendChild(humidityElement);

      forecastDiv.appendChild(dayDiv);
    }
  });

  // Save the input to local storage
  saveToLocalStorage(userInputCity);
}

// user input storage
function saveToLocalStorage(userInput) {
  let savedInputs = JSON.parse(localStorage.getItem('savedInputs')) || [];
  savedInputs.push(userInput);
  localStorage.setItem('savedInputs', JSON.stringify(savedInputs));
  displaySavedInputs();
}

// function to display all saved inputs
function displaySavedInputs() {
  const savedInputDiv = document.getElementById('savedInput');
  let savedInputs = JSON.parse(localStorage.getItem('savedInputs')) || [];
  savedInputDiv.innerHTML = ` ${savedInputs.join(', ')}`;
}
