const apiKey = "bd63b41c4c58cd3ab801e871daae6296";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener("click", () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        alert("Please enter a City name");
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Weather data not available or invalid city");
            }
            return response.json();
        
        })
        .then((data) => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;

        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}