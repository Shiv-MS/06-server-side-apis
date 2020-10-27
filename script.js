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
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${inputReceived}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            temperature.text(`Temperature: ${response.main.temp} °F`);
            humidity.text(`Humidity: ${response.main.humidity}%`);
            wind.text(`Wind Speed: ${response.main.humidity} MPH`);

            $(".weatherDashboard").append(temperature).append(humidity).append(wind);
            weatherForecast(inputReceived);
        });
    }

    function weatherForecast(inputReceived) {
        $('.weatherForecast').empty();
        let queryURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${inputReceived}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            let five_day = response.list
            let index = 0;
            let days = [];

            // five_day.forEach(e => {
            //     let day = moment(e.dt_txt).format("dddd")
            //     if (!days.includes(day) && days.length < 5) {
            //         days.push(day)
            //         $(".weatherForecast").append(`<p>${day}: ${e.main.feels_like}</p>`)
            //     }
            // })


            do {
                index = index + 1
                let current = five_day[index]
                let day = moment(current.dt_txt).format("dddd")
                if (!days.includes(day)) {
                    days.push(day)
                    $(".weatherForecast").append(`<p>${day}: ${current.main.feels_like}</p>`)
                }
            } while (days.length < 5)

        });
    }


    userClick.on("click", function () {
        if (userSearch.val()) {
            searchForWeather(userSearch.val());
            userSearch.val("");
        }
    });

});