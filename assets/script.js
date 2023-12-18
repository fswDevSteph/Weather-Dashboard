var weatherApiKey = '1e57f9cafb1f7d251058b6d4dccdc7c2'; //API key for openweathermap.org
var fiveDayWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='; //API url for openweathermap.org
var city; //variable for city name

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
  const data = await response.json(); //variable where data is stored
  console.log(data);
  var lat = data[0].lat; //extract latitude from data
  var lon = data[0].lon; //extract longitude from data
  let forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`; //create url for forecast
  const forecastResponse = await fetch(forecastUrl); //fetch forecast data
  const forecastData = await forecastResponse.json(); //extract JSON from the http response
  console.log(forecastData.list[0].main.temp); //print temperature
  console.log('string', forecastData.list);
  /*currentWeatherDiv area starts here*/
  const currentWeatherDiv = document.getElementById('currentWeather'); //creates a variable named currentWeatherDiv and sets it to the value of the element with the id of currentWeather

  //grabbing specific .dt_txt forecast data at index 0
  console.log(forecastData.list[0].dt_txt);
  console.log(forecastData.list[0].main.temp);
  console.log(forecastData.list[0].main.humidity);

  /*const currentWeather = document.createElement('div'); //creates a p element and stores it in the currentWeather variable

  const currentDate = createElement('p');
  currentDate.textContent = `Date: ${forecastData.list[0].main.dt_txt}`;
  currentWeather.appendChild(currentDate);

  const currentTemp = createElement('p');
  currentTemp.textContent = `Temperature: ${forecastData.list[0].main.temp}°C`;
  currentWeather.appendChild(currentTemp);

  const currentWeatherCity = createElement('p');

  const currentWind = createElement('p');

   currentWeatherDiv.appendChild(currentWeather); //appends currentWeather p to the currentWeatherDiv div
*/
  const forecastDiv = document.getElementById('forecast'); //creates a variable named forecastDiv and sets it to the value of the element with the id of forecast

  forecastData.list.forEach((forecast, index) => {
    // goes through each forecast entry in the list array with an arrow function that takes the returned forecast
    if (index % 8 === 0) {
      //this condition is true for every 8th entry in the list array
      const dayDiv = document.createElement('div'); //creates a div element and stores it in the dayDiv variable
      dayDiv.className = 'day'; // gives the dayDiv element a class of day

      const dateElement = document.createElement('p'); //creates a p element and stores it in the dateElement variable
      const tempElement = document.createElement('p'); // creates a p element and stores it in the tempElement variable
      const windElement = document.createElement('p'); // creates a p element and stores it in the windElement variable
      const humidityElement = document.createElement('p'); // creates a p element and stores it in the humidityElement variable

      const date = new Date(forecast.dt * 1000).toLocaleDateString(); // Convert unix timestamp to date
      const tempCelsius = forecast.main.temp - 273.15; // Convert Kelvin to Celsius

      dateElement.textContent = `Date: ${date}`; //sets text content of dateElement p to the value of date
      dayDiv.appendChild(dateElement); //appends dateElement p to the dayDiv div

      tempElement.textContent = `Temperature: ${tempCelsius.toFixed(2)}°C`; //sets text content of tempElement p to the value of temperature in celsius
      dayDiv.appendChild(tempElement); //
      windElement.textContent = `Wind Speed: ${forecast.wind.speed}m/s`; //sets text content of windElement p to the value of wind speed
      dayDiv.appendChild(windElement); //appends windElement p to the dayDiv div
      humidityElement.textContent = `Humidity: ${forecast.main.humidity}%`; //sets text content of humidityElement p to the value of humidity
      dayDiv.appendChild(humidityElement); //appends humidityElement p to the dayDiv div
      forecastDiv.appendChild(dayDiv); //appends dayDiv div to the forecastDiv div
      // Append the dayDiv to forecastDiv
    }
  });
}
