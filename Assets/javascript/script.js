// to display the current time on the app
var time = dayjs();

function find(){
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

    
}



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