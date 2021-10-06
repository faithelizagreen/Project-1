var npsKey = 'jWkeYbbVnmq03Oy2hhCYC6rXV7GUQlVtL46HooYG';
var rootUrl = 'https://developer.nps.gov/api/v1';
var stateName = 'FL';

var queryURL = 'https://developer.nps.gov/api/v1/parks?stateCode=' + stateName + "&api_key=" + npsKey;
fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })

    $(document).ready(function(){
        $('.modal').modal();
      });