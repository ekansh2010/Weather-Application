const apiKey = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const clouds = document.getElementById("clouds");
const weatherIcon = document.getElementById("weatherIcon");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const weatherInfo = document.getElementById("weatherInfo");

async function getWeather(city){

    loading.style.display = "block";
    errorMessage.style.display = "none";
    weatherInfo.style.opacity = "0.5";

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent = data.name;

        temperature.textContent =
            Math.round(data.main.temp) + "°C";

        condition.textContent =
            data.weather[0].description;

        humidity.textContent =
            data.main.humidity + "%";

        wind.textContent =
            data.wind.speed + " km/h";

        feelsLike.textContent =
            Math.round(data.main.feels_like) + "°C";

        clouds.textContent =
            data.clouds.all + "%";

        const iconCode = data.weather[0].icon;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        changeBackground(data.weather[0].main);

    }

    catch(error){

        errorMessage.style.display = "block";
    }

    finally{

        loading.style.display = "none";
        weatherInfo.style.opacity = "1";
    }
}

/* CHANGE BACKGROUND BASED ON WEATHER */

function changeBackground(weather){

    if(weather === "Clear"){

        document.body.style.background =
        "linear-gradient(135deg, #0f172a, #2563eb)";
    }

    else if(weather === "Clouds"){

        document.body.style.background =
        "linear-gradient(135deg, #334155, #64748b)";
    }

    else if(weather === "Rain"){

        document.body.style.background =
        "linear-gradient(135deg, #1e293b, #0f172a)";
    }

    else if(weather === "Snow"){

        document.body.style.background =
        "linear-gradient(135deg, #94a3b8, #cbd5e1)";
    }

    else{

        document.body.style.background =
        "linear-gradient(135deg, #0f172a, #1e3a8a)";
    }
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if(city === ""){
        alert("Please enter a city name");
        return;
    }

    getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {

    if(e.key === "Enter"){

        const city = cityInput.value.trim();

        if(city !== ""){
            getWeather(city);
        }
    }
});

/* DEFAULT WEATHER */

getWeather("New Delhi");