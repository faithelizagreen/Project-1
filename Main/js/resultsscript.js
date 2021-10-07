var googleKey = 'AIzaSyBs094KFbn1VNf7g8NEjgVeCZapYcbfT08';
var stateName = 'FL';
var submitBtn = document.getElementById('submit-button');
var historyContainer = document.querySelector('#searches');

function getLatLon() {
    let currentCity = localStorage.getItem("savedCity");

    let queryURL = rootUrl + '/geo/1.0/direct?q=' + currentCity + '&limit=5&units=imperial&appid=' + apiKey;
    console.log(currentCity);

    // Fetch's latitude and longitude
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            getPlacesApi(data[0].lat, data[0].lon);
        })
}

var locationInput = document.querySelector('#city-and-state');
var dateInput = document.querySelector(".datepicker");

function storeCity() {
    if (locationInput == "") {
        return;
    } else {
        var searchedCities = JSON.parse(localStorage.getItem("cities"))
    }

    if (searchedCities == null) {
        searchedCities = [];
    }

    searchedCities.push( {
        city: locationInput.value,
        date: dateInput.value
    });

    localStorage.setItem("cities", JSON.stringify(searchedCities));
    window.open("searchresults.html", "_self");
}

if (historyContainer !== null) {

    searchedCities = JSON.parse(localStorage.getItem("cities"));

    for (var i = 0; i < searchedCities.length; i++) {
        var previousSearch = document.createElement("button");
        previousSearch.setAttribute("class", "previous-searches");

        previousSearch.textContent = searchedCities[i].city;
        historyContainer.appendChild(previousSearch);
    }

}

var clearButton = document.querySelector("#clear-button");
function clearHighScores() {
    localStorage.clear();
    historyContainer.textContent = "";
}

if (submitBtn !== null) {
    submitBtn.addEventListener("click", storeCity);
}

if (clearButton !== null) {
    clearButton.addEventListener("click", clearHighScores);
}