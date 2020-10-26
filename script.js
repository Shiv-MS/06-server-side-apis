$(document).ready(function () {
    const apiKey = "8cdcf354abe2770a64714b6da2b0775e";
    const userSearch = $(".cityInput");
    const userClick = $(".cityInputButton");


    function searchForWeather(inputReceived) {
        console.log(inputReceived)

        let queryURL = "http://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&units=imperial&q=" + inputReceived;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        });
    }

    userClick.on("click", function () {
        if (userSearch.val()) {
            searchForWeather(userSearch.val());
            userSearch.val("");
        }
    });

});