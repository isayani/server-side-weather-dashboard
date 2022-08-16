// TO-DO:
// date (may be easier to get from moment.js)
// color code UV Index
// display city array to searchHist
var dateEl = document.getElementById("date");
var moment = moment();
dateEl.innerText = moment.format("MMMM Do YYYY");

var cityArr = []
if (localStorage.getItem("Cities")) {
    cityArr = JSON.parse(localStorage.getItem("Cities"))
}

function generateListItems (cityArr) {
    var cities = "";
    for (let i = 0; i < cityArr.length; i++) {
        cities += `<li>${cityArr[i]}</li>`;
    }
    return cities;
}

// generateListItems(cityArr)
document.querySelector(".searchHist").innerHTML = `
<ul>
${generateListItems(cityArr)}
</ul>
`;


var weather = {
    "apiKey": "f06df96322709f9b0254307f0735bb9c",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=imperial&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    fetchUVI: function (data) {
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat="
        + data.coord.lat
        + "&lon="
        + data.coord.lon
        + "&units=imperial&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => {
            this.fiveDay(data)
            this.displayUVI(data)});
    },

    displayWeather: function (data) {
        var { name } = data;
        if (cityArr.includes(name) === false) {
            cityArr.push(name)
            localStorage.setItem("Cities", JSON.stringify(cityArr))
        }
        
        var { icon, description } = data.weather[0];
        var { temp, humidity } = data.main;
        var { speed } = data.wind;
        // console.log(name, dt, icon, description, temp, humidity, speed)
        document.getElementById("city").innerText = name;
        document.getElementById("temp").innerText = temp + "°F";
        document.getElementById("descr").innerText = description;
        document.getElementById("icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.getElementById("humid").innerText = "Humidity: " + humidity + "%";
        document.getElementById("speed").innerText = "Wind Speed: " + speed + "mph";
        this.fetchUVI(data)
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchBar").value); 
    },

    displayUVI: function (data) {
        var { uvi } = data.daily[0];
        document.getElementById("uvi").innerText = "UV Index: " + uvi;

        if (0 < uvi <= 5) {
            document.getElementById("uvi").setAttribute('style', "background-color: rgba(0, 128, 0, 0.419);");
        } else if (5 < uvi <= 7) {
            document.getElementById("uvi").setAttribute('style', "background-color: rgba(113, 128, 0, 0.419);")
        } else {
            document.getElementById("uvi").setAttribute('style', "background-color: rgba(128, 23, 0, 0.419);")
        }
    },

    fiveDay: function (data) {
        console.log("this is the data",data); 
        var day = document.querySelector(".fiveDay");
        day.innerHTML = "";
        for (var i = 1; i < 6; i++) {
            day.innerHTML += `<div class="day1 w-1/4  m-2 card">
            <span id="date">${data.daily[i].dt}</span>
            <h2 id="temp">${data.daily[i].temp.day}°</h2>
            <div class="flex">
                <p id="descr">${data.daily[i].weather[0].description}</p>
                <img id="icon" src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png" alt="">
            </div>
            <p id="humid">Humidity: ${data.daily[i].humidity}%</p>
            <p id="speed">Wind Speed: ${data.daily[i].wind_speed} mph</p>
        </div>`
        }

        // currentDay.text(today.format("dddd, MMMM Do YYYY"));
        

    }
};


// Color code for UV Index



document.querySelector(".btn").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".searchBar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});

// Ensures placeholder on load
weather.fetchWeather("Atlanta");

// Curl href
// https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=f06df96322709f9b0254307f0735bb9c
// With units in imperial
// https://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=f06df96322709f9b0254307f0735bb9c
// weather.fetchWeather("denver")
// UVI href
// https://api.openweathermap.org/data/2.5/onecall?lat=33.749&lon=-84.388&units=imperial&appid=f06df96322709f9b0254307f0735bb9c