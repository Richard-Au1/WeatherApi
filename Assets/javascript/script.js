// to display the current time on the app
var time = dayjs();

function find() {
    var optionRequest = {
        method: 'GET',
        redirect: 'follow'
    };
    // event listener for search button
    var searchButton = document.querySelector(".btn");
    searchButton.addEventListener("click", function () {
        var cityResponseField = document.getElementById("cityResponse");
        var cityName = cityResponseField.value.trim(); // Trim any leading/trailing spaces from the input
        var cityResponseorder = capitalizeCity(cityName); // Format the city name
        var cityName = cityResponseField.value.trim(); // Trim any leading/trailing spaces from the input
        var cityResponseorder = capitalizeCity(cityName); // Format the city name
        lookUp();
    });

    // get the value of the city and keep it in the url
    var cityResponse = document.getElementById('searchCity').value;
    var urlCurrent =

        // fetchs the response based off the users inputted city. if users request is not found they returns err else returns response from api.
        fetch(urlCurrent, optionRequest)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("Can not find city you are looking for");
                    } else {
                        throw new Error("Error fetching data");
                    }
                }
                // returns information from api based on users response.
                return response.json();
            })
            .then(result => {
                // gets the current weather status and places it into an element.
                var elStatusCurrent = document.querySelector(".statusCurrent");

                if (result.weather[0].main === 'Clouds') {
                    currentStatusElement.style = "color: white";
                    currentStatusElement.style.backgroundImage = "url('./Assets/image/Cloudy.jpg')";
                } else if (result.weather[0].main === 'Sunny') {
                    currentStatusElement.style = "color: white";
                    currentStatusElement.style.backgroundImage = "url('./Assets/image/Sunny.jpg')";
                } else if (result.weather[0].main === 'Wind') {
                    currentStatusElement.style = "color: white";
                    currentStatusElement.style.backgroundImage = "url('./Assets/image/Windy.jpg')";
                } else if (result.weather[0].main === 'Rain') {
                    currentStatusElement.style = "color: white";
                    currentStatusElement.style.backgroundImage = "url('./Assets/image/Rain.jpg')";
                } else currentStatusElement.style.backgroundImage = "url('./Assets/image/Snowy.jpg')";
            })

// myHeaders.append("X-RapidAPI-Key", "203d6f8221msh723786e2656b6a5p1512adjsn9cc9321e6473");

// //get apis
// function successCallback(position) {
//     var latitude = position.coords.latitude;
//     var longitude = position.coords.longitude;
//     // Now you have the latitude and longitude, you can make API requests using these coordinates

//     // Make API call to OpenWeatherMap
//     var weatherApiKey = 'b678393f509aecf946ac94ef01ec609e'; // Replace with your OpenWeatherMap API key
//     var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + weatherApiKey;

//     fetch(weatherApiUrl)
//         .then(response => response.json())
//         .then(weatherData => {
//             // Save the weather data in session storage
//             sessionStorage.setItem('weatherData', JSON.stringify(weatherData));
//         })
//         .catch(error => console.log('Error fetching weather data:', error));
// }


// //display current location being searched and it attributes


// //display previous search history that was used (save to local storage and retrieve it)


// //display 5 day future forecast