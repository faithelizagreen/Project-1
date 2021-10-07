let apiKey = '3d01b4e3041172e8bb324d16eafbdd67';
let rootUrl = 'https://api.openweathermap.org';
let submitBtn = document.getElementById('submit-button');
let map;

function getLatLon() {
    let city = localStorage.getItem("savedCity");

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
            for (let i = 0; i < data.results.length; i++) {
                console.log(data.results[i].name)
                renderPlaces(data[0].results)
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

function renderPlaces() {
    
}


if (submitBtn !== null) {
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        console.log('#submit-button')
        locationInput = document.querySelector('#city-and-state')
        let city = locationInput.value.trim();

        localStorage.setItem("savedCity", city);
        window.open("searchresults.html", "_self")
    })
}

$(document).ready(function () {
    if ($("body").is("#searchresults")) {
        getLatLon();
    }
})


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

function initMap(lat, lon) {
    let cord = new google.maps.LatLng(lat, lon)
    map = new google.maps.Map(document.getElementById("map"), {
        center: cord,
        zoom: 11,
    });
}