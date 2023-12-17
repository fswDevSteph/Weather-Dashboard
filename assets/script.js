var weatherApiKey = '1e57f9cafb1f7d251058b6d4dccdc7c2';
var fiveDayWeatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

var userInputCity;
//userInputCity variable is set to the value of the input element with the id of "cityInput"
userInputCity = document.getElementById('cityInput').value;
//userInputCountry variable is set to the value of the input element with the id of "countryInput"
var userInputCountry;
userInputCountry= document.getElementById('countryInput').value;


// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// 1. Dayjs
var today = dayjs(); //Creates a variable"var" named"today" & sets"=" it to the result of calling"()" the dayjs method"function" provided by using the dayjs library.

// 2. Dayjs formatting
var formatDate = today.format('MMMM D, YYYY'); //Creates a variable"formatDate" & sets"=" it to calling() the format method"function" on the today variable and passes it the formatting style argument"('MMMM D, YYYY')

// 3.
document.getElementById('currentDay').textContent = formatDate; // Grabs the HTML element with the id 'currentDay' and updates its text content with the formatted date stored in the variable "formatDate".

document.getElementById('searchBtn').addEventListener('click', function () {fetch(api.openweathermap.org/data/2.5/weather?q={userInputCity}&appid={weatherApikey})}); 
api.openweathermap.org/data/2.5/weather?q={cityName}&appid={weatherApiKey};
// Grabs the HTML element with the id 'searchBtn' and adds an event listener to it that listens for a click and then calls the function()
