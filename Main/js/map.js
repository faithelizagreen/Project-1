let apiKey = '3d01b4e3041172e8bb324d16eafbdd67';
let rootUrl = 'https://api.openweathermap.org';
let submitBtn = document.getElementById('submit-button');
let historyContainer = document.querySelector('#searches');
let locationInput = document.querySelector('#city-and-state');
let dateInput = document.querySelector(".datepicker");
let clearButton = document.querySelector("#clear-button");
let map;

// Pulling desired location from weather api
function getLocation() {
    let savedCities = JSON.parse(localStorage.getItem("savedCity"));
    let city = savedCities[savedCities.length-1].city;

    let queryURL = rootUrl + '/geo/1.0/direct?q=' + city + '&limit=5&units=imperial&appid=' + apiKey;
    console.log(city);

    // Fetch's latitude and longitude
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            initMap(data[0].lat, data[0].lon);
            getPlacesApi(data[0].lat, data[0].lon);

        })
}

// Google Places Api call to get trail data and map markers
function getPlacesApi(lat, lon) {
    let googleKey = "AIzaSyBs094KFbn1VNf7g8NEjgVeCZapYcbfT08";
    let mapUrl =
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lon + '&radius=50000&type=park&keyword=hiking&key=' +
        googleKey;

    fetch("https://cors-anywhere.herokuapp.com/" + mapUrl, {
            method: "GET",
            dataType: "jsonp",
            headers: {},
        })
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < 5; i++) {
                getPlaceDetails(data.results[i].place_id)
            }
            data.results.forEach(place => {
                console.log(place)
                new google.maps.Marker({
                    position: place.geometry.location,
                    map,
                    title: place.name,
                });
            });

        });
}

// Google Details Api call to get formatted places data
function getPlaceDetails(placeId) {
    let googleKey = "AIzaSyBs094KFbn1VNf7g8NEjgVeCZapYcbfT08";
    let detailsUrl =
        'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placeId + '&key=' + googleKey;

    // Fetch's latitude and longitude
    fetch("https://cors-anywhere.herokuapp.com/" + detailsUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var searchResults = $(`
            <div class="row">
                <div class="col s12">
                    <div class="card blue-grey darken-1">                            
                        <div class="card-content white-text">
                            <span class="card-title"><a href=${data.result.url}>${data.result.name}</a></span>
                            <p>${data.result.formatted_address}</p>
                        </div>
                    </div>
                </div>
            </div>
            `);
            $('#search-results').append(searchResults);
        })
}

// Local storage to store previous city searches
function storeCity() {
    let searchedCities;
    if (locationInput == "") {
        return;
    } else {
        searchedCities = JSON.parse(localStorage.getItem("savedCity"))
    }

    if (searchedCities == null) {
        searchedCities = [];
    }

    searchedCities = searchedCities.filter(element => element.city != locationInput.value)
    searchedCities.push({
        city: locationInput.value,
        date: dateInput.value
    });
    localStorage.setItem("savedCity", JSON.stringify(searchedCities));
    window.open("searchresults.html", "_self");
}

// Create buttons from local storage
if (historyContainer !== null) {

    searchedCities = JSON.parse(localStorage.getItem("savedCity"));
    for (let i = searchedCities.length-1; i >= 0; i--) {
        let previousSearch = document.createElement("button");
        previousSearch.setAttribute("class", "previous-searches");

        previousSearch.textContent = searchedCities[i].city;
        historyContainer.appendChild(previousSearch);
    }

}

// Clears local storage
function clearCities() {
    localStorage.clear();
    historyContainer.textContent = "";
}
// Initializes map on page based on desired location
function initMap(lat, lon) {
    let latitude = parseFloat(lat)
    let longitude = parseFloat(lon)
    console.log(latitude, longitude)
    // let cord = new google.maps.LatLng(lat, lon)
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: latitude, lng: longitude},
        zoom: 11,
    });
}

// Event Listeners
if (submitBtn !== null) {
    submitBtn.addEventListener("click", storeCity);
}

if (clearButton !== null) {
    clearButton.addEventListener("click", clearCities);
}
//  Only calls getLocation when on searchresults.html
$(document).ready(function () {
    if ($("body").is("#searchresults")) {
        getLocation();
    }
})

// Only calls modal when on index.html
$(document).ready(function () {
    if ($("body").is('#index')) {
        $(".modal").modal();
    }
});


// Modal Selectors
$(document).ready(function () {
    if ($("body").is('#index')) {
        $('select').formSelect();
    }
});
