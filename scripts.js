
const app = document.getElementById('root');

const weatherSec = document.createElement('div');
weatherSec.setAttribute('id', 'weather');

const place = document.createElement('h2');
const icon = document.createElement('img');
const temp = document.createElement('h2');
const desc = document.createElement('h2');

let unit = document.createElement('span');
unit.setAttribute('id', 'unit');
unit.textContent = 'C';



function toDeg(temp){
  return (temp - 273.15).toFixed(1);
}

function toFah(temp){
  return ((temp - 273.15) * (9 / 5) + 32).toFixed(1);
}

if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
} 
else {
  alert("Geolocation is not supported by this browser.");
}

function geoSuccess(position) {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;


  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=a901400632ba1ebe09f0417879d7fea4`;

  fetch(url)
  .then(resp => resp.json())
  .then( data => {
    
    place.textContent = `${data.name}, ${data.sys.country}`;


    temp.innerHTML = `${toDeg(data.main.temp)} &deg;&#160;`;
    temp.append(unit);

    unit.addEventListener('click', ()=>{
      if(unit.textContent === 'C'){
        unit.textContent = 'F';
        temp.innerHTML = `${toFah(data.main.temp)} &deg;`;
        temp.append(unit);

      }
      else{
        unit.textContent = 'C';
        temp.innerHTML = `${toDeg(data.main.temp)} &deg;`;
        temp.append(unit);
      }
    });

    desc.textContent = data.weather[0].main;
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`

  })
  weatherSec.appendChild(place);
  weatherSec.appendChild(temp);
  weatherSec.appendChild(desc);
  weatherSec.appendChild(icon);

  app.appendChild(weatherSec);


}

function geoError() {
    alert("Unable to determine Location");
}

console.log('Hello');



