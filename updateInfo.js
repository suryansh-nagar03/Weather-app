const weather = document.getElementById('weather');
const city = document.getElementById('location');
const date = document.getElementById('date');
const updated = document.getElementById('last-updated');
const temperature = document.getElementById('temp');
const maxTemp = document.getElementById('val1');
const minTemp = document.getElementById('val2');
const feels = document.getElementById('val3');
const precipitation = document.getElementById('val4');
const humidity = document.getElementById('val5');
const wind = document.getElementById('val6');
const pressure = document.getElementById('val7');
const sunrise = document.getElementById('val8');
const sunset = document.getElementById('val9');
const moon = document.getElementById('val10');
const weatherIcon = document.getElementById('weather-icon');

export function updateInfo(data) {
    const { current, daily, hourly,location,forecast } = data;

    const dateObj = new Date(current.last_updated);
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric' };

    weather.textContent = current.condition.text;
    city.textContent = `${location.name}, ${location.country}`;
    date.textContent = dateObj.toLocaleDateString('en-US', dateOptions);
    updated.textContent = `Last updated: ${dateObj.toLocaleTimeString('en-US', timeOptions)}`;
    temperature.textContent = `${(current.temp_c)}°C`;
    weatherIcon.src = current.condition.icon;
    maxTemp.textContent = `${(forecast.forecastday[0].day.maxtemp_c)}°C`;
    minTemp.textContent = `${(forecast.forecastday[0].day.mintemp_c)}°C`;
    feels.textContent = `${(current.feelslike_c)}°C`;
    precipitation.textContent = `${(current.precip_mm)} mm`;
    humidity.textContent = `${current.humidity}%`;
    wind.textContent = `${current.wind_mph}mph ${current.wind_dir}`;
    pressure.textContent = `${current.pressure_mb}mb`;
    sunrise.textContent = forecast.forecastday[0].astro.sunrise;
    sunset.textContent = forecast.forecastday[0].astro.sunset;
    moon.textContent = forecast.forecastday[0].astro.moon_phase;

}


