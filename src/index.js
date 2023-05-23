// API key and endpoint URL
let apiKey = "8b3c2188b1fe57f318bdcd6231e30d94";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";

// DOM elements
let searchBox = document.querySelector(".search input");
let searchButton = document.querySelector(".search button");
let weather_icon = document.querySelector(".weather-icon");

// Variable to store Celsius value
let cel;

// Function to check weather for a city
async function checkWeather(city) {
  // Fetch weather data from the API
  const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);

  // Handle 404 (city not found) response
  if (response.status === 404) {
    document.querySelector(".err").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    // Parse the response data
    const data = await response.json();

    // Update the HTML with weather information
    document.querySelector(".city").innerHTML = data.name;
    const tempCelcius = Math.round(data.main.temp);
    document.querySelector(".temp").innerHTML = tempCelcius + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".pressure").innerHTML = data.main.pressure;

    // Update weather icon based on weather condition
    if (data.weather[0].main === "Clouds") {
      weather_icon.src = "../images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weather_icon.src = "../images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weather_icon.src = "../images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weather_icon.src = "../images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weather_icon.src = "../images/mist.png";
    }

    // Show weather section and hide error message
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".err").style.display = "none";

    // Store the Celsius value
    cel = tempCelcius;
  }
}

// Event listener for search button click
searchButton.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    // Call checkWeather function with the entered city
    checkWeather(city);
  }
});

// Event listener for Fahrenheit button click
document.getElementById("farenheit").addEventListener("click", () => {
  // Convert Celsius to Fahrenheit and update the HTML
  if (cel !== undefined) {
    let fer = Math.floor(cel * 1.8 + 32);
    document.querySelector(".temp").innerHTML = fer + "°F";
  }
});

// Event listener for Celsius button click
document.getElementById("celcius").addEventListener("click", () => {
  // Restore the Celsius value and update the HTML
  if (cel !== undefined) {
    document.querySelector(".temp").innerHTML = cel + "°C";
  }
});
