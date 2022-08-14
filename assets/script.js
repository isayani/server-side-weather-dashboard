var weather = {
    "apiKey": "f06df96322709f9b0254307f0735bb9c",
    fetchWeather: function () {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=f06df96322709f9b0254307f0735bb9c").then((response) => response.json()).then((data) => console.log(data));
    }
};

// Curl href
// https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=f06df96322709f9b0254307f0735bb9c
// With units in imperial
// https://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&appid=f06df96322709f9b0254307f0735bb9c
// name: Atlanta
// description: clear sky
