const mainElement = document.getElementById('weatherForecastMain');
const elevationElement = document.getElementById('elevation');
const tempMax = document.getElementById('tempMax');
const tempMin = document.getElementById('tempMin');
const rain = document.getElementById('rain');

function getLocation(){
    try {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success, error)
        }
    } catch(err){
        console.error(err)
        window.alert("Please accept location services to use this app!")
    }
}

function success(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    getWeather(lat, long);
}

function error(){
    console.log("Location Services Denied!")
    window.alert("Please accept location services to use this app!")
}

async function getWeather(lat, long){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,rain,showers,snowfall&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
    try{
        const response = await fetch(url);
        const weather = await response.json();
        if(response){
            const elevationFt = Math.floor(weather.elevation * 3.28);
            mainElement.classList.remove('hide');

            elevationElement.innerHTML = `You are currently ${elevationFt} ft above sea level!`
            tempMax.innerHTML = `Today the current high is ${Math.floor(weather.daily.temperature_2m_max[0])}\u00B0F!`
            tempMin.innerHTML = `Today the current low is ${Math.floor(weather.daily.temperature_2m_min[0])}\u00B0F!`

            rain.innerHTML = `You are currently expected to have ${Math.floor(weather.hourly.rain[0])} inches of rain!`

        }
    } catch(err){
        console.error(err);
    }
}
getLocation();