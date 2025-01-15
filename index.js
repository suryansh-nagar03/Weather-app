import { updateInfo } from './updateInfo.js';
import { displayDaily, displayHourly } from './forecast.js';
import { updatePage, initializeNavigation } from './updateInfo.js';

// Initialize navigation at the start
initializeNavigation();

const baseUrl = "https://api.weatherapi.com/v1/forecast.json?key=33ffbf55c9c04658acb193505251301&days=4&q=";
const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const error = document.getElementById('error');

const dailyBtn = document.getElementById('btn1');
const hourlyBtn = document.getElementById('btn2');
const navigationBar = document.querySelector('.navigation'); // Add this line

dailyBtn.classList.add('active');

async function getWeather(city){
    try {
        const url = baseUrl + city;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        console.log(data);

        updateInfo(data);
        if (hourlyBtn.matches(':focus')) {
            displayHourly(data, 'C', 0);
        } else {
            displayDaily(data, 'C', 0);
        }
        error.textContent = "";
        return data;
    } 
    catch (err) {
        console.log("hello");   
        console.error('Error fetching weather:', err);
        error.textContent = "*Invalid city name";   
    }
}

getWeather("Noida");
searchBtn.addEventListener('click', async () => {
    const city = searchBox.value;
    await getWeather(city);
    dailyBtn.classList.add('active');
    hourlyBtn.classList.remove('active');
    navigationBar.style.display = 'none';
    searchBox.value = "";
});

searchBox.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const city = searchBox.value;
        await getWeather(city);
        dailyBtn.classList.add('active');
        hourlyBtn.classList.remove('active');
        navigationBar.style.display = 'none';
        searchBox.value = "";
    }
});

dailyBtn.addEventListener('click', () => {
    dailyBtn.classList.add('active');
    hourlyBtn.classList.remove('active');
});

hourlyBtn.addEventListener('click', () => {
    hourlyBtn.classList.add('active');
    dailyBtn.classList.remove('active');
});
