var npsKey = 'jWkeYbbVnmq03Oy2hhCYC6rXV7GUQlVtL46HooYG';
var googleKey = 'AIzaSyBs094KFbn1VNf7g8NEjgVeCZapYcbfT08';
var npsUrl = 'https://developer.nps.gov/api/v1';
var stateName = 'FL';

// NPS Api
//var queryURL = npsUrl + '/trails?stateCode=' + stateName + "&api_key=" + npsKey;
//fetch(queryURL)

// Call response in console
//   .then(function (response) {
 //       return response.json();
 //   })
 //   .then(function (data) {
 //       console.log(data);
 //   })

// Google Places Api
// var mapURL = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/js?key=AIzaSyBs094KFbn1VNf7g8NEjgVeCZapYcbfT08&libraries=places&callback=initMap';
// fetch(mapURL)
// .then(function (response) {
//     return response.json();

// })

// function getPlacesApi(lat, lon) {
//     let googleKey = "AIzaSyBs094KFbn1VNf7g8NEjgVeCZapYcbfT08";
//     let mapUrl =
//         'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lon + '&radius=50000&type=park&keyword=hiking&key=' +
//         googleKey;

//     fetch("https://cors-anywhere.herokuapp.com/" + mapUrl, {
//             method: "GET",
//             dataType: "jsonp",
//             headers: {},
//         })
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data)
//         });
// }

function initMap() {
    var location = {
        lat: 40.000,
        lng: -79.000
    }
    var options = {
        center: location,
        zoom: 8
    }

    if(navigator.geolocation) {
        console.log('geolocation is on');

        navigator.geolocation.getCurrentPosition((loc) => {
            location.lat = loc.coords.latitude;
            location.lng = loc.coords.longitude;

            //Create the Map
            map = new google.maps.Map(document.getElementByID("map", options))
        },
        (err) => {
            console.log("user chose no");
            map = new google.maps.Map(document.getElementById("map"), options)
        }
        )
    } else {
        console.log("geolocation not supported");
        map = new google.maps.Map(document.getElementById("map"), options)
    }

    autocomplete = new google.maps.places.Autocomplete(document.getElementById("city-and-state"), 
    {
        componentRestrictions: {'country': ['us']},
        fields: ['geometry', 'name', 'place_id', 'url', 'vicinity', 'formatted-address'],
        type: ['trail'],
    });

    submitButton = document.getElementById("submit-btn");
    submitButton.addListener("click", () => {
        var place = autocomplete.getPlace();
        new google.maps.Marker({
            position: place.geometry.location,
            title: place.name,
            map: map
        })
    });
}