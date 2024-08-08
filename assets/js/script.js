console.log("script.js is loaded");
const searchBut = document.querySelector('#searchBut');
const input1 = document.querySelector('#input1');
const searchHist = document.querySelector('history')
const currentWe = document.querySelector('current')
const fiveDayWe = document.querySelector('fiveday')
const locDay = document.getElementById('locDay');
const tempDiv = document.getElementById('temp');
const windDiv = document.getElementById('wind');
const humidDiv = document.getElementById('humid');
const apiKey = "8ee239f6dc48e439a334d7769d0ad502"//idk about this ill make a new one if something happens to it
const currentDate = new Date().toDateString();
const recent = document.getElementById('recent')
console.log(currentDate)

function handleSearchFormSubmit(event) {
  event.preventDefault();
  const userInput = input1.value
  localStorage.setItem(grimbus,userInput)
  getCurrentWeather(userInput)
  if(localStorage.grimbus)
    
};

async function getCurrentWeather(city) {// this function retreives the data from openweathermap as a json
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
  const response = await fetch(url)
  const data = await response.json()
  //console log to ensure data was retrieved succesfully
  if (data)// if the datta was retrieved successfully, get the 
console.log(data)
const name = data.name 
const main = data.main
  const temp = main.temp
  const humid = main.humidity
const wind = data.wind
  const windSpeed = wind.speed
locDay.textContent = `${name}, ${currentDate}`
tempDiv.textContent = `Temperature: ${temp}`
windDiv.textContent = `WindSpeed: ${windSpeed} Mph` 
humidDiv.textContent = `Humidity: ${humid}%` 
const coords =  data.coord
const lat = coords.lat
const lon = coords.lon 
console.log(lat,lon)
getForcast(lat,lon)
}
async function getForcast(lat,lon) {
  await lon 
 const url =  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
 const response = await fetch(url)
 const data = await response.json()
 console.log(data)
 for (let i = 1; i < 6; i++) {
  // let day = document.getElementById(`day${[i]}`)
  let date =document.getElementById (`${[i]}date`)
  let temp = document.getElementById(`${[i]}temp`)
  let wind =document.getElementById(`${[i]}wind`)
  let humid =document.getElementById(`${[i]}humid`)
  // let grimbus = [day,date,temp,wind,humid]
  const list = data.list
  // const iList = list[i]; 
  console.log(list)
  let scrubed = hourToDaily(list)
  console.log(scrubed)
  const scrubbed = scrubed[i] 
  const main = scrubbed.main
  console.log(main)
  const forTemp = main.temp
  const forHumid = main.humidity
const forWind = scrubbed.wind
  const windSpeed = forWind.speed
  const forDate = scrubbed.dt_txt
  console.log(forDate)
  // day.textContent = 
  forcastDate =dateCleanup(forDate);
  date.textContent =forcastDate;
  temp.textContent =`Temp: ${forTemp}°F`;
  wind.textContent= `Wind: ${windSpeed} mph`;
  humid.textContent= `Humidity: ${forHumid}%`;
  // console.log(grimbus)
  
 }
 return;
}
searchBut.addEventListener('click',handleSearchFormSubmit);
// history.addEventListener('click',handleSearchFormSubmit)
// console.log( cleanupFilename("Fashion_Yellow_Beach.jpg") );
// console.log( cleanupFilename("Architecture_On_a_hill.jpg") );

// function cleanupDate(str) {
//   return str            // "Fashion_Yellow_Beach.jpg"
//           // "Fashion_Yellow_Beach"
//          .split('_')    // ["Fashion", "Yellow", "Beach"]
//          .slice(1)      // ["Yellow", "Beach"]
//          .join(' ');    // "Yellow Beach"
// }
const dateCleanup =(string)=>{ 
  const array =string.split(' ')
  array.pop()
  const retString =array.join()
  return retString;
} 
const hourToDaily =(array)=>{
  const newArray = ["ik i could change the names of the ids to 0-4 but i dont feel like it"];
for (let i = 2; i < 41; i+=8) {
  const day = array[i];
  newArray.push(day) 
}
  return newArray;
} 
 