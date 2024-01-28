document.addEventListener('DOMContentLoaded', function () {
  displaySavedInputs();

  document
    .getElementById('citySearchForm')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      latlongSearch();
    });
});

const searchForm = document.querySelector('.citySearch');
const citySearchInput = document.querySelector('#citySearchInput');

async function latlongSearch() {
  const weatherApiKey = '1e57f9cafb1f7d251058b6d4dccdc7c2';
  userInputCity = document.getElementById('citySearchInput').value;
  console.log(userInputCity);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${userInputCity}&appid=${weatherApiKey}`
    );
    const data = await response.json();
    console.log(data);

    const lat = data[0].lat;
    const lon = data[0].lon;

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`;
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

    saveToLocalStorage(userInputCity);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function saveToLocalStorage(userInput) {
  let savedInputs = JSON.parse(localStorage.getItem('savedInputs')) || [];
  savedInputs.push(userInput);
  localStorage.setItem('savedInputs', JSON.stringify(savedInputs));
  displaySavedInputs();
}
//function to display city searches history
function displaySavedInputs() {
  const savedInputDiv = document.getElementById('savedInput');
  //const createAttribute = `data-search=${input}`;
  let savedInputs = JSON.parse(localStorage.getItem('savedInputs')) || [];

  savedInputDiv.innerHTML = '';

  if (savedInputs.length === 0) {
    savedInputDiv.innerHTML = ' No saved inputs.';
  } else {
    savedInputs = savedInputs.filter(
      (input) => input !== null && input !== undefined
    );

    savedInputs.forEach((input, index) => {
      if (index > 0) {
        savedInputDiv.innerHTML += '<br>';
      }
      //savedInputDiv.innerHTML += `<p>${input}</p>`;
      savedInputDiv.innerHTML += `<button>${input}</button>`;
    });
  }
}

function seachFormSubmit(e) {
  if (!citySearchInput.value) {
    return;
  }
  e.preventDefault();
  const search = citySearchInput.value.trim();
  fetchCoords(search);
  citySearchInput.value = '';
}

function cityHistoryClickable(e) {
  //the e just represents an event
  if (!e.target.matches(savedInput)) {
    return;
  }
  const button = e.target;
  const search = button.getAttribute(savedInput);
  latlongSearch();
}
saveToLocalStorage();
//searchForm.addEventListener('submit', seachFormSubmit);
//savedInputDiv.addEventListener('click', cityHistoryClickable);
//const searchForm = document.querySelector('#citySearch');
//const citySearchInput = document.querySelector('#citySearchInput');
