const weatherForm = document.querySelector('.weatherForm');
const inputCity = document.querySelector('.inputCity');
const card = document.querySelector('.card');
const apiKey = '72e45b5a696215652ce583ee068bd03c';

weatherForm.addEventListener('submit', async(event) => {
    event.preventDefault();
    const city = inputCity.value;
    if (city) {
        try {

            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);



        } catch (error) {
            console.error(error);
            displayError(error);

        }


    } else {
        displayError('Please Enter a city');
    }
})

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl)
    console.log(response);
    if (!response.ok) {
        throw new Error('Please Enter a Valid City Name');
    }
    const data = await response.json();
    console.log(data);
    return data
}

function displayWeatherInfo(data) {

    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }]
    } = data;
    card.textContent = '';
    card.style.display = 'block';

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${Math.round(temp - 273.15)}°C`;
    humDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = displayWeatherEmoji(id);

    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humDisplay.classList.add('humDisplay');
    descDisplay.classList.add('descDisplay');
    weatherEmoji.classList.add('weatherEmoji');


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);



}

function displayWeatherEmoji(weatherID) {
    switch (true) {
        case weatherID >= 200 && weatherID <= 232:
            return '⛈';
        case weatherID >= 300 && weatherID <= 321:
            return '🌧';
        case weatherID >= 500 && weatherID <= 531:
            return '🌦';
        case weatherID >= 600 && weatherID <= 622:
            return '🌨';
        case weatherID >= 701 && weatherID <= 781:
            return '🌫';
        case weatherID === 800:
            return '☀️';
        case weatherID >= 801 && weatherID <= 804:
            return '☁️';
        default:
            return '🤷‍♀️';
    }
}

function displayError(message) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add(".errorDisplay");

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}