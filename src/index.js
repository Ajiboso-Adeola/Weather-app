let apiKey = "8b3c2188b1fe57f318bdcd6231e30d94";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";

let searchBox = document.querySelector(".search input");
let searchButton = document.querySelector(".search button");
let weather_icon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  //   const response = await fetch(apiUrl + `&appid=${apiKey}`);
  const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".err").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".pressure").innerHTML = data.main.pressure;

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

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".err").style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});
