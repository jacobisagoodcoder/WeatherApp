const elevationElement = document.getElementById('elevation');
const mainElement = document.getElementById('weatherForecastMain');

function getLocation(){
    try {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success, error)
        }
    } catch(err){
        console.error(err)
    }
}

function success(position){
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    console.log(typeof(lat), long);
    getWeather(lat, long);
}

function error(){
    console.log("Location Services Denied!")
}

async function getWeather(lat, long){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}`;

    try{
        const response = await fetch(url);
        const weather = await response.json();

        if(response){
            const elevationFt = weather.elevation * 3.28;
            mainElement.classList.remove('hide');
            elevationElement.innerHTML = `You are currently ${elevationFt} ft above sea level!`
        }
    } catch(err){
        console.error(err);
    }
}
getLocation();