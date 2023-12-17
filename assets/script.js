var weatherApiKey = '1e57f9cafb1f7d251058b6d4dccdc7c2';

var userInputCity;
var userInputCountry;
// sample API call call using just city name
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// 1.
var today = dayjs(); //Creates a variable"var" named"today" & sets"=" it to the result of calling"()" the dayjs method"function" provided by using the dayjs library.

// 2.
var formatDate = today.format('MMMM D, YYYY'); //Creates a variable"formatDate" & sets"=" it to calling() the format method"function" on the today variable and passes it the formatting style argument"('MMMM D, YYYY')

// 3.
document.getElementById('currentDay').textContent = formatDate; // Grabs the HTML element with the id 'currentDay' and updates its text content with the formatted date stored in the variable "formatDate".

document.getElementById('searchBtn').addEventListener('click', function () {}); // Grabs the HTML element with the id 'searchBtn' and adds an event listener to it that listens for a click and then calls the function()
