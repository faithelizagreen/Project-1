//API key for weather
var APIKey = "6da21109c2a2f51f89c7bb1442e09e36";
var forecastWeather = $('#forecast')

// Display the curent and future weather to the user after grabing the city form the input text box.
city = localStorage.getItem("savedCity") || "";
currentWeather(city);
console.log("city", city);

function currentWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appID=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        forecast(response.id);
    });
}

function forecast(cityid) {
    var dayover = false;
    var queryforcastURL =
        "https://api.openweathermap.org/data/2.5/forecast?id=" +
        cityid +
        "&appid=" +
        APIKey;
    $.ajax({
        url: queryforcastURL,
        method: "GET",
    }).then(function(response) {
        console.log(response);
        for (i = 0; i <= 5; i++) {
            var date = new Date(
                response.list[(i + 1) * 8 - 1].dt * 1000
            ).toLocaleDateString();
            var iconcode = response.list[(i + 1) * 8 - 1].weather[0].icon;
            var iconurl = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png";
            var tempK = response.list[(i + 1) * 8 - 1].main.temp;
            var tempF = ((tempK - 273.5) * 1.8 + 32).toFixed(2);
            var humidity = response.list[(i + 1) * 8 - 1].main.humidity;
            console.log(date, iconurl, tempK, tempF, humidity);
            $("#fDate" + i).html(date);
            $("#fImg" + i).html("<img src=" + iconurl + ">");
            $("#fTemp" + i).html(tempF + "&#8457");
            $("#fHumidity" + i).html(humidity + "%");

        }
    });
}

console.log("loaded");
