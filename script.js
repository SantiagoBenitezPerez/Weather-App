// global variables 

API_KEY = '4f75f92f899f23b113c7887eb16317a6'

const input = document.getElementById('input');
const searchBtn = document.getElementById("search-btn");
const clearBtn = document.getElementById('clear-btn');
const cityNameDiv = document.getElementById("city-name");
const weatherField = document.getElementById("weather");
const temp = document.getElementById("tempt");
const maxTemp = document.getElementById("max-temp");
const minTemp = document.getElementById("min-temp");


// set what will happen when the window loads
 
window.onload = () => {
    searchBtn.addEventListener('click', main);
    clearBtn.addEventListener('click', clear);
}

// set the start function, the main logic function of the weather app

const main = () => {

   let userInput = getUserInput();
   getWeatherData(userInput);
      
}


// set the function that will clear the app

const clear = () => {
    input.value = "";
    cityNameDiv.innerText = "---";
    weatherField.innerText = "----";
    weatherField.classList.remove("weather-color");
    temp.innerText = "Temp  --°";
    maxTemp.innerText = "Max Temp  --°";
    minTemp.innerText = "Min Temp  --°";
}

// get access to the weather api via a fetch request

const getWeatherData = async (cityName) => {
    try {
     let requestResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}` )
    
     let data = await requestResponse.json();  // data is the object of each particula cityName
    //  console.log(data)
     showWeatherInfo(data);
    } catch(err) {
     console.log({err});
    }
    
 }

// get the user input

const getUserInput = () => {
    return input.value;
}

// function to update the weather info in the DOM
// this function will receive the data object from the fetch promise as an argument

const showWeatherInfo = weatherData => {
    // city name
    cityNameDiv.innerHTML = `<h5 id="city">${weatherData.name}</h5>`;
    
    // weather in that city
    let weather = weatherData.weather[0].main;
    weatherField.innerText = weather;
    weatherField.classList.add("weather-color");
    
    // setting temps
    let {main: {temp:temperature, temp_max: maxTemperature, temp_min: minTemperature}} = weatherData;
    temp.innerText = `Temp: ${Math.round(temperature -273.15)}° C`;
    maxTemp.innerText = `Max Temp: ${Math.round(maxTemperature - 273.15)}° C`;
    minTemp.innerText = `Min Temp: ${Math.round(minTemperature - 273.15)}° C`;

}
