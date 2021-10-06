var npsKey = 'jWkeYbbVnmq03Oy2hhCYC6rXV7GUQlVtL46HooYG';
var rootUrl = 'https://developer.nps.gov/api/v1';
var stateName = 'FL';

// Modal
$(document).ready(function () {
  $(".modal").modal();
});


// Modal Selectors
$(document).ready(function(){
    $('select').formSelect();
  });


// NPS Api
var queryURL = 'https://developer.nps.gov/api/v1/parks?stateCode=' + stateName + "&api_key=" + npsKey;
fetch(queryURL)

// resultspage
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}



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

