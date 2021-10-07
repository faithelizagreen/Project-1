// let apiKey = '3d01b4e3041172e8bb324d16eafbdd67';
// let rootUrl = 'https://api.openweathermap.org';

// function getLatLon() {
//     var city = "Orlando"

//     var queryURL = rootUrl + '/geo/1.0/direct?q=' + city + '&limit=5&units=imperial&appid=' + apiKey;
//     console.log(city);

//     // Fetch's latitude and longitude
//     fetch(queryURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data)
//             getPlacesApi(data[0].lat, data[0].lon);
//         })
// }

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

// // Datepicker widget
// $(document).ready(function(){
//     $('.datepicker').datepicker();
//   });
