function getweather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }

    fetch(`/api/weather?city=${city}`)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data);
            // weather property
            
            
            // Display weather data
            displayWeather(data.weather);

            // Display agricultural recommendations
            displayAgriculturalRecommendations(data.agriculture);

            // Pass the weather condition for background update
            const maincondition=data.weather.weather[0].main;
            console.log(maincondition);
            updateWeatherBackground(maincondition);
            setTimeout(() => {
                document.getElementById('city').style.display = 'none'; 
                document.getElementById('getWeatherbutton').style.display = 'none'; },
               0);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error, please try again');
        });
}

function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    const tempDivInfo = document.getElementById('temp-div');
    const weatherIcon = document.querySelector('img');

    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    tempDivInfo.innerHTML =`<p>${temperature}°C</p>`;
    weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    weatherIcon.style.display = 'block';
}


function updateWeatherBackground(condition) {
    const weatherBackgrounds = {
        Rain: 'lightRain-background',
        Clouds: 'fewClouds-background',
        Snow: 'lightSnow-background',
        Clear: 'clearSky-background',
        Thunderstorm: 'thunderstormWithLightRain-background',
        Drizzle: 'lightIntensityDrizzle-background',
        Mist: 'mist-background',
        Haze: 'haze-background',
        Fog: 'fog-background',
        // Add any other weather conditions as needed
    };
   
       
        console.log("Weather Condition:", condition); // Debug: log the condition

        const backgroundClass = weatherBackgrounds[condition] || 'default-background';
        console.log("applying background class",backgroundClass);
        document.body.className = ''; // Clear existing background classes
        document.body.classList.add(backgroundClass);
    
}

// Agricultural recommendations (keeping this code from previous example)
function displayAgriculturalRecommendations(data) {
    const recommendationsDiv = document.getElementById('agricultural-recommendations');
    recommendationsDiv.innerHTML = `
        <div id="water-level">
            <h4>Water Level:</h4>
            <p>${data.waterLevel}</p>
        </div>
        <div id="pesticides">
            <h4>Pesticides:</h4>
            <p>${data.pesticides}</p>
        </div>
        <div id="fertilizers">
            <h4>Fertilizers:</h4>
            <p>${data.fertilizers}</p>
        </div>
    `;
}