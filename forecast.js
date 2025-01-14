const dailyForecast = document.querySelector('.daily-forecast');
const hourlyForecast = document.querySelector('.hourly-forecast');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function displayDaily(object,unit,slide){
    dailyForecast.textContent = "";
    hourlyForecast.textContent = "";

    for(let i=0;i<4;i++){
        const card = document.createElement('div');
        const day = document.createElement('div');
        const maxTemp = document.createElement('div');
        const minTemp = document.createElement('div');
        const icon = document.createElement('img');
        
        day.classList.add('day');
        maxTemp.classList.add('day-max-temp');
        minTemp.classList.add('day-min-temp');
        icon.classList.add('day-icon');

        day.textContent = days[new Date(object.forecast.forecastday[i].date).getDay()];
        maxTemp.textContent = `${object.forecast.forecastday[i].day.maxtemp_c}°C`;
        minTemp.textContent = `${object.forecast.forecastday[i].day.mintemp_c}°C`;
        icon.src = object.forecast.forecastday[i].day.condition.icon;

        card.appendChild(day);
        card.appendChild(maxTemp);
        card.appendChild(minTemp);
        card.appendChild(icon);

        dailyForecast.appendChild(card);
    }
}

function displayHourly(object,unit, slide) {
    // Fade out existing cards
    const existingCards = hourlyForecast.querySelectorAll('div');
    existingCards.forEach(card => {
        card.style.opacity = '0';
    });

    // Clear and add new cards after fade out
    setTimeout(() => {
        dailyForecast.textContent = "";
        hourlyForecast.textContent = "";

        const hoursPerPage = 6;
        const startHours = [0, 6, 12, 18];
        const startHour = startHours[slide];
        
        // Create container for smooth transitions
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('hour-cards-container');
        
        for(let i = 0; i < hoursPerPage; i++) {
            const currentHour = startHour + i;
            const hourData = object.forecast.forecastday[0].hour[currentHour];
            
            const card = document.createElement('div');
            card.style.opacity = '0';
            card.style.transform = 'translateX(20px)';
            card.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-out';
            
            const hour = document.createElement('div');
            const temp = document.createElement('div');
            const icon = document.createElement('img');
            
            hour.classList.add('hour');
            temp.classList.add('hour-temp');
            icon.classList.add('hour-icon');

            const time = new Date(hourData.time);
            hour.textContent = time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
            temp.textContent = `${hourData.temp_c}°C`;
            icon.src = hourData.condition.icon;

            card.appendChild(hour);
            card.appendChild(temp);
            card.appendChild(icon);

            cardContainer.appendChild(card);
            
            // Stagger the fade in of new cards
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, i * 100);
        }

        hourlyForecast.appendChild(cardContainer);
    }, 300);
}

export { displayDaily, displayHourly };