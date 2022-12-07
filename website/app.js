/* Global Variables */

const formE = document.getElementById("form");
const zipE = document.getElementById("zip");
const fillingE = document.getElementById("feelings");
const btnGenerateE = document.getElementById("generate");

const dateE = document.getElementById("date");
const tempE = document.getElementById("temp");
const contentE = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Define api url
const baseUrl = 'http://localhost:8000/project/data/'
const apiKey = "d0d621329803df021535d736b4c745ae"
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=`;

// handle api

const getMostRecent = () => {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            const { temp, date, content } = data;
            tempE.innerHTML =  temp ? `Temp: ${temp} Celius` : "";
            dateE.innerHTML = date ?`Date: ${date}`: "";
            contentE.innerHTML = content ? `Content: ${content}` : "";
        })
        .catch(e => console.log(e));
}

const postMostRecent = () => {
    console.log(zipE.value);
    if (zipE.value !== "") {
        fetch(weatherApiUrl + zipE.value)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                fetch(baseUrl, {
                    method: "POST",
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        temp: data.main.temp,
                        date: newDate,
                        content: fillingE.value
                    })
                })
                    .then(res => res.json())
                    .then(d => {
                        getMostRecent();
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }
}

btnGenerateE.addEventListener('click', postMostRecent);
getMostRecent();