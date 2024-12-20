 
const apiKey = '4eb3703790b356562054106543b748b2'; 

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${(data.main.temp - 273.15).toFixed(1)}&deg;C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    `;
}

function getWeatherByLocation() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) throw new Error('Location not found');
                return response.json();
            })
            .then(data => displayWeather(data))
            .catch(error => alert(error.message));
    } else {
        alert('Please enter a location');
    }
}

function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
                .then(response => {
                    if (!response.ok) throw new Error('Unable to fetch weather data');
                    return response.json();
                })
                .then(data => displayWeather(data))
                .catch(error => alert(error.message));
        }, error => alert('Geolocation permission denied'));
    } else {
        alert('Geolocation is not supported by this browser');
    }
}
