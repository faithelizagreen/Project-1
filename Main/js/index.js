let city = "";
// Modal
$(document).ready(function() {
    $(".modal").modal();
});


// Modal Selectors
$(document).ready(function() {
    $('select').formSelect();
});

function getCity(event) {
    event.preventDefault();
    if ($("#city-and-state").val().trim() !== "") {
        city = $("#city-and-state").val().trim();
        localStorage.setItem("searchCity", city);
        window.location.href = "searchresults.html";
        // currentWeather(city);
    }
}

$("#search-button").on("click", getCity);