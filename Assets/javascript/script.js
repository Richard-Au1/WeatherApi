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
        var searchCityField = document.getElementById("searchCity");
        var nameCity = searchCityField.value.trim(); // Trim any leading/trailing spaces from the input
        var searchCityorder = cityCap(nameCity); // Format the city name
        find();
    });

    // get the value of the city and keep it in the url
    var nameCity = document.getElementById('searchCity').value;
    var urlCurrent = 'https://api.openweathermap.org/data/2.5/weather?q=' + nameCity + '&appid=2c1f6b1890ed255c8dd889ff29fcafc0';

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
                    elStatusCurrent.style = "color: white";
                    elStatusCurrent.style.backgroundImage = "url('./Assets/image/Cloudy.jpg')";
                } else if (result.weather[0].main === 'Sunny') {
                    elStatusCurrent.style = "color: white";
                    elStatusCurrent.style.backgroundImage = "url('./Assets/image/Sunny.jpg')";
                } else if (result.weather[0].main === 'Wind') {
                    elStatusCurrent.style = "color: white";
                    elStatusCurrent.style.backgroundImage = "url('./Assets/image/Windy.jpg')";
                } else if (result.weather[0].main === 'Rain') {
                    elStatusCurrent.style = "color: white";
                    elStatusCurrent.style.backgroundImage = "url('./Assets/image/Rain.jpg')";
                } else elStatusCurrent.style.backgroundImage = "url('./Assets/image/Snowy.jpg')";

                // set time to certain format
                var timeFormatted = time.format('dddd, DD MM YYYY');

                var elementH1 = document.createElement('h1');

                //setting h1 to city and time
                elementH1.textContent = result.name + ' ' + timeFormatted;

                elStatusCurrent.textContent = "";

                elStatusCurrent.appendChild(elementH1);

                var divInfo = document.createElement("div");

                var minTemp = parseFloat(result.main.temp_min);
                var convertedLowTemp = (minTemp - 273.15) * 9 / 5 + 32;
                var roundedLowTemp = convertedLowTemp.toFixed(1);

                var maxTemp = parseFloat(result.main.temp_max);
                var convertedHighTemp = (maxTemp - 273.15) * 9 / 5 + 32;
                var roundedHighTemp = convertedHighTemp.toFixed(1);

                var temperaturePara = document.createElement("p");
                temperaturePara.textContent = "Temperature (Hi/Lo): " + roundedHighTemp + "° F" + " / " + roundedLowTemp + "° F";
                divInfo.appendChild(temperaturePara);

                var windDirection = parseFloat(result.wind.deg);
                if (11.25 <= windDirection && windDirection < 33.75) {
                    windDirection = ' NNE';
                } else if (33.75 <= windDirection && windDirection < 56.25) {
                    windDirection = ' NE';
                } else if (56.25 <= windDirection && windDirection < 78.75) {
                    windDirection = ' ENE';
                } else if (78.75 <= windDirection && windDirection < 101.25) {
                    windDirection = ' E';
                } else if (101.25 <= windDirection && windDirection < 123.75) {
                    windDirection = ' ESE';
                } else if (123.75 <= windDirection && windDirection < 146.25) {
                    windDirection = ' SE';
                } else if (146.25 <= windDirection && windDirection < 168.75) {
                    windDirection = ' SSE';
                } else if (168.75 <= windDirection && windDirection < 191.25) {
                    windDirection = ' S';
                } else if (191.25 <= windDirection && windDirection < 213.75) {
                    windDirection = ' SSW';
                } else if (213.75 <= windDirection && windDirection < 236.25) {
                    windDirection = ' SW';
                } else if (236.25 <= windDirection && windDirection < 258.75) {
                    windDirection = ' WSW';
                } else if (258.75 <= windDirection && windDirection < 281.25) {
                    windDirection = ' W';
                } else if (281.25 <= windDirection && windDirection < 303.75) {
                    windDirection = ' WNW';
                } else if (303.75 <= windDirection && windDirection < 326.25) {
                    windDirection = ' NW';
                } else if (326.25 <= windDirection && windDirection < 348.75) {
                    windDirection = ' NNW';
                } else {
                    windDirection = ' N';
                }

                var speedWind = parseFloat(result.wind.speed);
                var convertedspeedWind = speedWind * 2.237;
                var roundedspeedWind = convertedspeedWind.toFixed(1);
                var windMph = document.createElement("p");
                windMph.textContent = "Wind Speed: " + roundedspeedWind + " MPH" + windDirection;
                divInfo.appendChild(windMph);


                var humidity = result.main.humidity;
                var humidityPercent = document.createElement("p");
                humidityPercent.textContent = "Humidity: " + humidity + " %";
                divInfo.appendChild(humidityPercent);

                elStatusCurrent.appendChild(divInfo);

                storeCity(nameCity);
                handleFiveDayStatus(result.name); //display 5 day forecast
            })
            .catch(error => {
                console.log('error', error);
                // display message if error not found.
                var elStatusCurrent = document.querySelector(".statusCurrent");
                elStatusCurrent.textContent = "City can not be found! Please try again";
            });
}

// capitalize city name
function cityCap(city) {
    var spell = city.split(" ");
    var capitalizedWords = spell.map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return capitalizedWords.join(" ");
}

// store nameCity locally
function storeCity(nameCity) {
    // see if nameCity is store locally
    if (nameCity === "") {
        return;
    }

    var searchCityorder = cityCap(nameCity);

    // put existing cities in array
    var cities = JSON.parse(localStorage.getItem("cities")) || [];

    // see if searchCityorder exist
    var index = cities.indexOf(searchCityorder);
    if (index !== -1) {
        // If searchCityorder exists, remove the older entry
        cities.splice(index, 1);
    }

    cities.push(searchCityorder);

    if (cities.length > 6) {
        cities.shift();
    }

    // store cities in local storage
    localStorage.setItem("cities", JSON.stringify(cities));

    // display history
    displayHistory(cities);
}
// --------------------------------------------------------------------------------------------------------------
// Function to display the five-day forecast
function handleFiveDayStatus(nameCity) {

    var tempHighArrays = [];
    var tempLowArrays = [];
    var windSpeedArrays = [];
    var humidityArrays = [];
    var emojiArray = [];

    var requestOptionsForecast = {
        method: 'GET',
        redirect: 'follow'
    };

    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + nameCity + '&appid=2c1f6b1890ed255c8dd889ff29fcafc0';

    fetch(forecastUrl, requestOptionsForecast)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error fetching forecast data");
            }
            return response.json();
        })
        .then(result => {
            var emoji = [];

            for (let i = 0; i < result.list.length; i++) {
                var element = result.list[i];

                var originalString = element.dt_txt;
                var parts = originalString.split(/-|\s/);

                var dayOfMonth = parseInt(parts[2]);
                var tomorrowDay = parseFloat(dayjs().format('DD')) + 1;

                if (dayOfMonth < tomorrowDay) {
                    continue; 
                }
                var chunkIndex = Math.floor(i / 8); 
                if (!tempHighArrays[chunkIndex]) {
                    tempHighArrays[chunkIndex] = []; 
                }
                tempHighArrays[chunkIndex].push(element.main.temp_max);

                var chunkIndex = Math.floor(i / 8); 
                if (!tempLowArrays[chunkIndex]) {
                    tempLowArrays[chunkIndex] = []; 
                }
                tempLowArrays[chunkIndex].push(element.main.temp_min);

                var chunkIndex = Math.floor(i / 8); 
                if (!windSpeedArrays[chunkIndex]) {
                    windSpeedArrays[chunkIndex] = []; 
                }
                windSpeedArrays[chunkIndex].push(element.wind.speed);

                var chunkIndex = Math.floor(i / 8); 
                if (!humidityArrays[chunkIndex]) {
                    humidityArrays[chunkIndex] = []; 
                }
                humidityArrays[chunkIndex].push(element.main.humidity);

                var hourString = element.dt_txt;
                var hour = hourString.charAt(11) + hourString.charAt(12)
                if (hour === '15') {
                    var weather = element.weather[0].main;
                    var emoji;

                    switch (weather) {
                        case 'Clouds':
                            emoji = '🌥';
                            break;
                        case 'Rain':
                            emoji = '🌧';
                            break;
                        case 'Clear':
                            emoji = '😎';
                            break;
                        case 'Snow':
                            emoji = '⛄️';
                            break;
                        case 'Fog':
                            emoji = '😶‍🌫️';
                            break;
                        case 'Wind':
                            emoji = '💨';
                            break;
                        case 'Smoke':
                            emoji = '🔥💨';
                            break;
                        default:
                            emoji = undefined; 
                    }

                    var dayIndex = Math.floor(i / 8);
                    if (!emojiArray[dayIndex]) {
                        emojiArray[dayIndex] = []; 
                    }
                    emojiArray[dayIndex].push(emoji);
                }

            }
            tempHighArrays.forEach(chunk => {
                chunk.sort((a, b) => b - a);
            });
            tempHighArrays.forEach(chunk => {
                if (chunk.length > 1) {
                    chunk.splice(1); 
                }
            });

            tempLowArrays.forEach(chunk => {
                chunk.sort((a, b) => a - b);
            });
            tempLowArrays.forEach(chunk => {
                if (chunk.length > 1) {
                    chunk.splice(1); 
                }
            });

            windSpeedArrays.forEach(chunk => {
                chunk.sort((a, b) => b - a);
            });
  
            windSpeedArrays.forEach(chunk => {
                if (chunk.length > 1) {
                    chunk.splice(1); 
                }
            });


            humidityArrays.forEach(chunk => {
                chunk.sort((a, b) => b - a);
            });

            humidityArrays.forEach(chunk => {
                if (chunk.length > 1) {
                    chunk.splice(1); 
                }
            });

            var days = [];
            for (let i = 0; i < 5; i++) {
                var day = time.add(i + 1, 'day').format('MM/DD/YYYY');
                var emojis = emojiArray[i] || [];
                var tempHigh = (tempHighArrays[i]?.[0] - 273.15) * 9 / 5 + 32;
                var tempLow = (tempLowArrays[i]?.[0] - 273.15) * 9 / 5 + 32;
                var windSpeed = windSpeedArrays[i]?.[0] * 2.237;
                var humidity = humidityArrays[i]?.[0];

                var dayX = [day, ...emojis, "Temp (Hi): " + tempHigh.toFixed(0) + "° F", "Temp (Lo): " + tempLow.toFixed(0) + "° F", "Wind: " + windSpeed.toFixed(0) + " MPH", "Humidity: " + humidity + "%"];
                days.push(dayX);
            }

            var containerForecast = document.querySelector(".boxes");
            containerForecast.innerHTML = ""; 

            var dayElements = ["day1", "day2", "day3", "day4", "day5"];
            dayElements.forEach((dayElementClass, index) => {
                var dayElement = document.createElement("div");
                dayElement.className = dayElementClass;
                dayElement.style.backgroundColor = "#4a4a4a";
                dayElement.style.color = "white"; 

                var dayData = days[index];
                dayData.forEach(data => {
                    var dataElement = document.createElement("div");
                    dataElement.textContent = data;
                    dayElement.appendChild(dataElement);

                    if (dayData.indexOf(data) !== dayData.length - 1) {
                        dayElement.appendChild(document.createElement("br"));
                    }
                });

                containerForecast.appendChild(dayElement);
            });
        })
        .catch(error => {
            console.log('error', error);
            var fiveDayStatusElement = document.querySelector(".fiveDayContainer");
            fiveDayStatusElement.textContent = "Error fetching forecast data";
        });
}


function displayHistory(cities) {
    var historyElement = document.querySelector(".history");
    historyElement.textContent = ""; 

    var last8Cities = cities.slice(-8);

    last8Cities.reverse().forEach((city) => { 
        var buttonElement = document.createElement("button");
        buttonElement.textContent = city;
        historyElement.appendChild(buttonElement);

        buttonElement.addEventListener("click", function () {
            document.getElementById("searchCity").value = city;
            find();
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector('.btn').addEventListener('click', find);

    document.getElementById('searchCity').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            find();
        }
    });

    var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    displayHistory(storedCities);
});