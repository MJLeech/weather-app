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
const recent1 = document.getElementById('recent1')
const recent2 = document.getElementById('recent2')
const recent3 = document.getElementById('recent3')
const recent4 = document.getElementById('recent4')
const shButton = document.getElementsByClassName("lebutton")
console.log(currentDate)
const bing =localStorage.getItem("cityArray")

if (bing !== null){
  const woah =bing.split(',');
let huh = [woah]
localStorage.setItem("cityArray", huh)
console.log(huh)
} else{
let huh =[]
localStorage.setItem("cityArray",huh)
console.log(huh)
}

function searchHistoryButton(event){
  event.preventDefault();
  let grimbus = localStorage.getItem("cityArray")
  if(grimbus){
  let babydor =grimbus.split(',')
let city = babydor[0]
  getCurrentWeather(city)
}}
function searchHistoryButton1(event){
  event.preventDefault();
  let grimbus = localStorage.getItem('cityArray')
  let babydor =grimbus.split(',')
let city = babydor[1]
  getCurrentWeather(city)
}
function searchHistoryButton2(event){
  event.preventDefault();
  let grimbus = localStorage.getItem('cityArray')
  let babydor =grimbus.split(',')
 let city = babydor[2]
  getCurrentWeather(city)
}
function searchHistoryButton3(event){
  event.preventDefault();
  let grimbus = localStorage.getItem(cityArray)
  let babydor =grimbus.split(',')
let city = babydor[3]
  getCurrentWeather(city)
}
function searchHistoryButton4(event){
  event.preventDefault();
  let grimbus = localStorage.getItem(cityArray)
  let babydor =grimbus.split(',')
let city = babydor[4]
  getCurrentWeather(city)
}

function handleSearchFormSubmit(event) {
  event.preventDefault();
  const userInput = input1.value
  const letMeGo = localStorage.getItem("cityArray")
  huh = letMeGo.split(',')
  console.log(huh)
  getCurrentWeather(userInput)
  console.log(huh)
  if(userInput && huh.length < 5 && huh){
    killMe =huh.split(',')
    killMe.push(userInput)
    console.log(killMe)
    localStorage.setItem("cityArray",killMe)
    
   } else if(userInput && huh.length === 5) {
    huh.shift()
    huh.push(userInput)
    console.log(huh)
    localStorage.setItem("cityArray",huh)
    }
  else if(huh[0] == '')
    localStorage.clear("cityArray")
     const losingmyshit = [userInput]
    localStorage.setItem("cityArray",losingmyshit)
    }
;

// const globalArrayStr = localStorage.getItem("cityArray")
// console.log(globalArrayStr)
// if(globalArrayStr){
// const globalArray = globalArrayStr.split(',')
// console.log(globalArray)
// recent.textContent = globalArray[0] 
// recent1.textContent = globalArray[1] 
// recent2.textContent = globalArray[2] 
// recent3.textContent = globalArray[3] 
// recent4.textContent = globalArray[4] 
// }
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
// console.log(lat,lon)
getForcast(lat,lon)
}
async function getForcast(lat,lon) {
  await lon 
 const url =  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
 const response = await fetch(url)
 const data = await response.json()
//  console.log(data)
 for (let i = 1; i < 6; i++) {
  // let day = document.getElementById(`day${[i]}`)
  let date =document.getElementById (`${[i]}date`)
  let temp = document.getElementById(`${[i]}temp`)
  let wind =document.getElementById(`${[i]}wind`)
  let humid =document.getElementById(`${[i]}humid`)
  // let grimbus = [day,date,temp,wind,humid]
  const list = data.list
  // const iList = list[i]; 
  // console.log(list)
  let scrubed = hourToDaily(list)
  // console.log(scrubed)
  const scrubbed = scrubed[i] 
  const main = scrubbed.main
  // console.log(main)
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
recent.addEventListener('click',searchHistoryButton);
recent1.addEventListener('click',searchHistoryButton1);
recent2.addEventListener('click',searchHistoryButton2);
recent3.addEventListener('click',searchHistoryButton3);
recent4.addEventListener('click',searchHistoryButton4);
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
