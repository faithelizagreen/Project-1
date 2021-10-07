var npsKey = "jWkeYbbVnmq03Oy2hhCYC6rXV7GUQlVtL46HooYG";
var rootUrl = "https://developer.nps.gov/api/v1";
var stateName = "FL";

// NPS Api
var queryURL =
    "https://developer.nps.gov/api/v1/parks?stateCode=" +
    stateName +
    "&api_key=" +
    npsKey;
fetch(queryURL)
    // resultspage
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // console.log(data);
    });

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}

var searchButton = document.getElementById("search-button");
var sCity = [];

//API key for weather
var APIKey = "6da21109c2a2f51f89c7bb1442e09e36";

// Display the curent and future weather to the user after grabing the city form the input text box.
let city = localStorage.getItem("searchCity") || "";
currentWeather(city);
console.log("city", city);

function currentWeather(city) {
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&APPID=" +
        APIKey;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        // UVIndex(response.coord.lon, response.coord.lat);
        forecast(response.id);
        // var weathericon = response.weather[0].icon;
        // var iconurl =
        //     "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
        // // The date format method is taken from the  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
        // var date = new Date(response.dt * 1000).toLocaleDateString();

        // $(currentCity).html(
        //     response.name + "(" + date + ")" + "<img src=" + iconurl + ">"
        // );

        // var tempF = (response.main.temp - 273.15) * 1.8 + 32;
        // $(currentTemperature).html(tempF.toFixed(2) + "&#8457");
        // // Display the Humidity
        // $(currentHumidty).html(response.main.humidity + "%");
        // //Display Wind speed and convert to MPH
        // var ws = response.wind.speed;
        // var windsmph = (ws * 2.237).toFixed(1);
        // $(currentWSpeed).html(windsmph + "MPH");

        // if (response.cod == 200) {
        //     sCity = JSON.parse(localStorage.getItem("cityname"));
        //     console.log(sCity);
        //     if (sCity == null) {
        //         sCity = [];
        //         sCity.push(city.toUpperCase());
        //         localStorage.setItem("cityname", JSON.stringify(sCity));
        //         addToList(city);
        //     } else {
        //         if (find(city) > 0) {
        //             sCity.push(city.toUpperCase());
        //             localStorage.setItem("cityname", JSON.stringify(sCity));
        //             addToList(city);
        //         }
        //     }
        // }
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
            var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
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
// function UVIndex(ln, lt) {
//     //uvindex.
//     var uvqURL =
//         "https://api.openweathermap.org/data/2.5/uvi?appid=" +
//         APIKey +
//         "&lat=" +
//         lt +
//         "&lon=" +
//         ln;
//     $.ajax({
//         url: uvqURL,
//         method: "GET",
//     }).then(function(response) {
//         $(currentUvindex).html(response.value);
//     });
// }

//Click Handlers

// Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }