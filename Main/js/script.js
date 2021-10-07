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