import { updateInfo } from './updateInfo.js';  // Note the .js extension is required

const baseUrl = "https://api.weatherapi.com/v1/forecast.json?key=33ffbf55c9c04658acb193505251301&days=4&q=";
const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const error = document.getElementById('error');

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
    searchBox.value = "";
});

// function getCityName() {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
          
//           try {
//             // Using OpenStreetMap's Nominatim service for reverse geocoding
//             const response = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//             );
//             const data = await response.json();
            
//             // The address object contains city/town/village info
//             const city = data.address.city || 
//                         data.address.town || 
//                         data.address.village || 
//                         'City not found';
                        
//             console.log('Current city:', city);
//           } catch (error) {
//             console.error('Error getting city name:', error);
//           }
//         },
//         (error) => {
//           console.error('Geolocation error:', error);
//         }
//       );
//     } else {
//       console.log('Geolocation is not supported by this browser');
//     }
//   }

//   console.log(getCityName());
