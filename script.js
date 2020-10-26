$(document).ready(function () {
    const apiKey = "8cdcf354abe2770a64714b6da2b0775e";
    const userSearch = $(".cityInput");
    const userClick = $(".cityInputButton");


    function searchForWeather(inputReceived) {
        $('.weatherDashboard').empty();
        console.log(inputReceived)
        let temperature = $('<div class = "temperature">');
        let humidity = $('<div class = "humidity">');
        let wind = $('<div class = "wind">');
        let queryURL = `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${inputReceived}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            temperature.text(`Temperature: ${response.main.temp} °F`);
            humidity.text(`Humidity: ${response.main.humidity}%`);
            wind.text(`Wind Speed: ${response.main.humidity} MPH`);


            $(".weatherDashboard").append(temperature).append(humidity).append(wind);
        });
    }
    

    userClick.on("click", function () {
        if (userSearch.val()) {
            searchForWeather(userSearch.val());
            userSearch.val("");
        }
    });

});