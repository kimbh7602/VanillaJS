const weather = document.querySelector(".weather");

const API_KEY = "49dbe9b7e905363452bec10728080bf7";
const COORDS = "coords";
function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const place = json.name;
        const tem = json.main.temp;
        weather.innerText = `${tem}ºC @${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const coordsObj = {
        lat,
        lon
    };

    saveCoords(coordsObj);
    getWeather(lat, lon);
}

function handleGeoError(){

}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.lat, parsedCoords.lon);
    }
}

function init(){
    loadCoords();
}

init();