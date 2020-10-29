$(document).ready(function () {
    const apiKey = "8cdcf354abe2770a64714b6da2b0775e";
    const userSearch = $(".cityInput");
    const userClick = $(".cityInputButton");
    const searchHistory = $("searchHistory");
    const historyData = [];

    function getHistoryData() {
        let storedHistory = JSON.parse(localStorage.getItem("historyStore"));
        if (storedHistory) historyData = storedHistory;

        $(".searchHistory").find("a").remove();
        historyData.forEach(function (item) {
            console.log(item)
            $(".searchHistory").append(`<a href="#" class="list-group-item list-group-item-action searchedCity" data-search="` +item+ `">` +item+ `</a>`)
        });
    }


    function searchForWeather(inputReceived) {
        $('.weatherDashboard').empty();
        // console.log(inputReceived)
        let citySearched = $('<div class = "citySearched">');
        let currentDate = $('<div class = "currentDate">');
        let currentIcon = $('<img class = "currentIcon">')
        let temperature = $('<div class = "temperature">');
        let humidity = $('<div class = "humidity">');
        let wind = $('<div class = "wind">');
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${inputReceived}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            currentDate = moment.unix(response.dt).format('l')
            citySearched.text(`${inputReceived}`.toUpperCase());
            currentIcon.attr("src", "https://openweathermap.org/img/w/" + `${response.weather[0].icon}` + ".png");
            temperature.text(`Temperature: ${response.main.temp} °F`);
            humidity.text(`Humidity: ${response.main.humidity}%`);
            wind.text(`Wind Speed: ${response.main.humidity} MPH`);
            searchForUV(response.coord.lat, response.coord.lat);

            if(historyData.indexOf(inputReceived) < 0){
            historyData.push(inputReceived);
            localStorage.setItem("history", JSON.stringify(historyData));
            getHistoryData();
            }

            $(".weatherDashboard").append(citySearched).append(currentDate).append(currentIcon).append(temperature).append(humidity).append(wind);
            weatherForecast(inputReceived);
        });
    }

    function searchForUV(lat, lon) {
        let queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);

            $(".weatherDashboard").append(`<div class="uvIndex"> UV Index: <span>${response.value}<span></div>`);
            if (response.value > 8) {
                $(".weatherDashboard").find(".uvIndex span").addClass("red-color").addClass("text-white");
            } else if (response.value > 6) {
                $(".weatherDashboard").find(".uvIndex span").addClass("orange-color")
            } else {
                $(".weatherDashboard").find(".uvIndex span").addClass("green-color")
            }
        });
    }

    function weatherForecast(inputReceived) {
        $('.weatherForecast').empty();
        let queryURL = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${inputReceived}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
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
                let date = moment(current.dt_txt).format('l')
                if (!days.includes(day)) {
                    days.push(day)
                    $(".weatherForecast").append(`<div class="forecastCards card"><p>${date}</p><img src="https://openweathermap.org/img/w/${current.weather[0].icon}.png"><br>Temp: ${current.main.feels_like} °F</p><br><p>Humidity: ${current.main.humidity}%</p></div>`)
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

    searchHistory.on("click", ".searchedCity", function () {
        if ($(this).attr("data-search")) {
            searchForWeather($(this).attr("data-search"));
        }
    });

    getHistoryData();

});