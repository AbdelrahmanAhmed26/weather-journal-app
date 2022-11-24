/* Global Variables */
const ZIP = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const generate = document.getElementById("generate");
const API_KEY = "dba1f86b78ab5926ef1051756757acff";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?zip=";
// Create a new date instance dynamically with JS
let day = new Date();
let newDate = `${day.getMonth() + 1}.${day.getDate()}.${day.getFullYear()}`;

generate.addEventListener("click", async function () {
  if (ZIP.value == "" || feelings.value == "") {
    alert("Please Enter Zip Code and Your Feeling");
  }
  const weatherData = await myWeatherData(BASE_URL, ZIP.value, API_KEY);
  console.log(weatherData);
  await postData({
    date: newDate,
    temp: weatherData.main.temp,
    felling: feelings.value,
  });
  await updateUI();
});

// HTTP GET request
async function myWeatherData(BASE_URL, ZIP, API_KEY) {
  const request = await fetch(
    `${BASE_URL}${ZIP}&appid=${API_KEY}&units=metric`
  );
  try {
    const response = await request.json();
    return response;
  } catch (error) {
    console.log("error", error);
  }
}
// HTTP POST request
async function postData(myData = {}) {
  const request = await fetch("/sendPost", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myData),
  });
  try {
    const response = await request.json();
    return response;
  } catch (error) {
    console.log("error", error);
  }
}
// UpdateUI
async function updateUI() {
  const request = await fetch("/get");
  try {
    const response = await request.json();
    document.getElementById(
      "content"
    ).innerHTML = `I feeling ${response.felling}`;
    document.getElementById("date").innerHTML = `Today is ${response.date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `temperature is ${response.temp}`;
  } catch (error) {
    console.log("error", error);
  }
}
