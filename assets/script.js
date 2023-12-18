var weatherApiKey = '1e57f9cafb1f7d251058b6d4dccdc7c2';
var city;
var fiveDayWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

var userInputCity;
//userInputCity variable is set to the value of the input element with the id of "cityInput"

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// 1. Dayjs
var today = dayjs(); //Creates a variable"var" named"today" & sets"=" it to the result of calling"()" the dayjs method"function" provided by using the dayjs library.

// 2. Dayjs formatting
var formatDate = today.format('MMMM D, YYYY'); //Creates a variable"formatDate" & sets"=" it to calling() the format method"function" on the today variable and passes it the formatting style argument"('MMMM D, YYYY')

// 3.
document.getElementById('currentDay').textContent = formatDate; // Grabs the HTML element with the id 'currentDay' and updates its text content with the formatted date stored in the variable "formatDate".

// document.getElementById('searchBtn').addEventListener('click', function () {fetch(api.openweathermap.org/data/2.5/weather?q={userInputCity}&appid={weatherApikey})});
document.getElementById('searchBtn').addEventListener('click', latlongSearch);
async function latlongSearch() {
  userInputCity = document.getElementById('citySearch').value;
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
  console.log(forecastData);

  const forecastDiv = document.getElementById('forecast');

  // OpenWeatherMap provides weather data for every 3 hours, so we take one reading per day
  forecastData.list.forEach((forecast, index) => {
    // OpenWeatherMap provides weather data for every 3 hours, so we take one reading per day
    if (index % 8 === 0) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day';

      const dateElement = document.createElement('p');
      const tempElement = document.createElement('p');
      const windElement = document.createElement('p');
      const humidityElement = document.createElement('p');

      const date = new Date(forecast.dt * 1000).toLocaleDateString(); // Convert unix timestamp to date
      const tempCelsius = forecast.main.temp - 273.15; // Convert Kelvin to Celsius

      dateElement.textContent = `Date: ${date}`;
      dayDiv.appendChild(dateElement);

      tempElement.textContent = `Temperature: ${tempCelsius.toFixed(2)}°C`; //sets text content of tempElement p to the value of temperature in celsius
      dayDiv.appendChild(tempElement); //appends tempElement p to the dayDiv div
      windElement.textContent = `Wind Speed: ${forecast.wind.speed}m/s`;
      dayDiv.appendChild(windElement);
      humidityElement.textContent = `Humidity: ${forecast.main.humidity}%`;
      dayDiv.appendChild(humidityElement);
      forecastDiv.appendChild(dayDiv);
      // Append the dayDiv to forecastDiv
    }
  });
}
