const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const iconElement = document.getElementById("weatherIcon"); // Add this line

searchButton.addEventListener("click", () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `/weather?location=${location}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                console.error(data.error);
                alert('Error fetching weather data: ' + data.error);
                return;
            }

            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;

            // Update weather icon
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            iconElement.setAttribute('src', iconUrl);
            iconElement.setAttribute('alt', data.weather[0].description);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            alert('Error fetching weather data');
        });
}
