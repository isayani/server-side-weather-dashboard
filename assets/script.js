// params:
// city name done
// date (may be easier to get from moment.js)
// icon rep of weather conditions done
// the temp done
// humidity done 
// the wind speed done
// uv index (color coded by favorable, moderate, or severe) - unavailable in 2.5
// bonus clear skies? done

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

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

    displayWeather: function (data) {
        var { name, dt } = data;
        var { icon, description } = data.weather[0];
        var { temp, humidity } = data.main;
        var { speed } = data.wind;
        // var { uvi } = data.current.uvi;
        console.log(name, dt, icon, description, temp, humidity, speed)
        document.getElementById("city").innerText = name;
        document.getElementById("temp").innerText = temp + "°F";
        document.getElementById("descr").innerText = description;
        document.getElementById("icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.getElementById("humid").innerText = "Humidity: " + humidity + "%";
        document.getElementById("speed").innerText = "Wind Speed: " + speed + "mph"; 
    }
};

// Curl href
// https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=f06df96322709f9b0254307f0735bb9c
// With units in imperial
// https://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=f06df96322709f9b0254307f0735bb9c
// weather.fetchWeather("denver")