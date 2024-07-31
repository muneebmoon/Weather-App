const apiKey = '070ab17e9e771004224224fb7f270f65';

function fetchWeather() {
    const locationInput = document.getElementById('locationInput').value.trim();
    if (!locationInput) {
        alert('Please enter a location');
        return;
    }
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}&units=metric`;

    console.log(`Fetching weather data from: ${apiUrl}`);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data); // Debug line
            if (data.cod !== 200) {
                alert(`Error: ${data.message}. Please try again.`);
                return;
            }

            document.getElementById('cityName').textContent = data.name;
            document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
            document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
            document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity} %`;
            document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
        })
        .catch(error => {
            alert('An error occurred while fetching the data. Please try again later.');
            console.error('Error fetching weather data:', error);
        });
}

function fetchWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
            
            console.log(`Fetching weather data from: ${apiUrl}`);

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log('API Response:', data); // Debug line
                    if (data.cod !== 200) {
                        alert(`Error: ${data.message}. Please try again.`);
                        return;
                    }

                    document.getElementById('cityName').textContent = data.name;
                    document.getElementById('description').textContent = `Weather: ${data.weather[0].description}`;
                    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
                    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity} %`;
                    document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
                })
                .catch(error => {
                    alert('An error occurred while fetching the data. Please try again later.');
                    console.error('Error fetching weather data:', error);
                });
        }, error => {
            alert('Unable to retrieve your location');
            console.error('Error getting geolocation:', error);
        });
    } else {
        alert('Geolocation is not supported by your browser');
    }
}
