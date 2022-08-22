// current date
var dateEl = document.getElementById("date");
dateEl.innerText = moment().format("MMMM Do YYYY");


// create an array in local storage from Cities
var cityArr = []
if (localStorage.getItem("Cities")) {
    cityArr = JSON.parse(localStorage.getItem("Cities"))
}

// loop through cities and create list items
function generateListItems (cityArr) {
    var cities = "";
    for (let i = 0; i < cityArr.length; i++) {
        cities += `<button class="prevCities">${cityArr[i]}</button>`;
    }
    return cities;
}

// generateListItems(cityArr) and put it in unordered list
document.querySelector(".searchHist").innerHTML = `
<ul>
${generateListItems(cityArr)}
</ul>
`;

// fetch and dislay functions for all weather
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
        document.getElementById("uvi").innerText = uvi;


        // color code based on uv index
        if ( uvi > 0 && uvi < 5) {
            document.getElementById("uvi").setAttribute('style', "background-color: rgba(0, 128, 0, 0.419);");
        } else if (uvi > 5 && uvi < 7) {
            document.getElementById("uvi").setAttribute('style', "background-color: rgba(113, 128, 0, 0.419);")
        } else {
            document.getElementById("uvi").setAttribute('style', "background-color: rgba(128, 23, 0, 0.419);")
        }
    },

    // for loop for five day weather
    fiveDay: function (data) {
        console.log("this is the data",data); 
        var day = document.querySelector(".fiveDay");
        
        day.innerHTML = "";
        for (var i = 1; i < 6; i++) {
            console.log(moment(data.daily[i].dt,"X").format("MMMM Do YYYY"));
            day.innerHTML += `<div class="day1 w-1/4  m-2 card">
            <div id="fiveDate">${moment(data.daily[i].dt,"X").format("MMMM Do YYYY")}</div>
            <h2 id="temp">${data.daily[i].temp.day}°</h2>
            <div class="flex">
                <p class="iconDescr" id="descr">${data.daily[i].weather[0].description}
                <img class="iconDescr" id="icon" src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png" alt=""></p>
            </div>
            <p id="humid">Humidity: ${data.daily[i].humidity}%</p>
            <p id="speed">Wind Speed: ${data.daily[i].wind_speed} mph</p>
        </div>`
        }
        
    }
};

// add Event Listener to search hist
var searchCities = $(".prevCities")
searchCities.on("click", function() {
    var cityName = $(this).text()
    weather.fetchWeather(cityName)
})

// key and click event listeners
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