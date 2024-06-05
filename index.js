function showImage() {
    const weatherIcon = document.getElementById('Weather_icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}

function getweather() {
    const apiKey = '3d59f0c712d4b54d7dbf417cd0ccbdbd';
    const city = document.getElementById('input').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data){
    const divweathericon = document.getElementById('Weather_icon');
    const divtempinfo = document.getElementById('temp_div');
    const divweatherinfo = document.getElementById('weather_info');
    const divhourlyforecast = document.getElementById('hourly_forecast');
    divweatherinfo.innerHTML = '';
    divtempinfo.innerHTML = '';
    divhourlyforecast.innerHTML = '';

    if(data.cod === '404'){
        divweatherinfo.innerHTML = `<p>${data.message}</p>`;
    }
    else {
        const city = data.name;
        const temp = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description; // Corrected property name
        const iconcode = data.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;

        const temphtml = `<p>${temp}°C</p>`;
        const weatherhtml = `<p>${city}</p><p>${description}</p>`; // Corrected variable name

        divtempinfo.innerHTML = temphtml;
        divweatherinfo.innerHTML = weatherhtml;
        divweathericon.src = iconurl;
        divweathericon.alt = description; // Corrected variable name
        showImage();
    }
}

function displayHourlyForecast(hourlydata) {
    const hourlyforecastdata = document.getElementById('hourly_forecast');
    const next24hrs = hourlydata.slice(0, 24);

    next24hrs.forEach(item => {
        const datetime = new Date(item.dt * 1000);
        const hour = datetime.getHours();
        const temp = Math.round(item.main.temp - 273.15);
        const iconcode = item.weather[0].icon;
        const iconurl = `https://openweathermap.org/img/wn/${iconcode}.png`;

        const hourlyitemhtml = `
            <div class="hourly_item">
                <span>${hour}:00</span>
                <img src="${iconurl}" alt="hourly weather icon">
                <span>${temp}°C</span>
            </div>`;
        
        hourlyforecastdata.innerHTML += hourlyitemhtml;
    });
}
