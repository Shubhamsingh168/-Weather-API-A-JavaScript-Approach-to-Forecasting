let cityname = document.querySelector(".weather_city");
let datetime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minterm = document.querySelector(".weather_min");
let w_maxterm = document.querySelector(".weather_max");

let w_feelslike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");


// full country name using the of method
const getcountryName = (code) => {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

// created the date and dtime
const getDateTime = (dt) => {
    //let dt = 1729699653;
    const currdate = new Date(dt * 1000);
    console.log(currdate);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    console.log(formatter);
    return formatter.format(currdate);
};

let city = "pune";

// searching the city
citySearch.addEventListener('submit',(e)=>{
    let cityname = document.querySelector(".city_name");
    e.preventDefault();
    console.log(cityname.value);
    city = cityname.value;
    // this is using for call function
    getweatherData();
     // this is using for cleaning the function
    cityname.value = "";
});


const getweatherData = async () => {
    //const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=daa5c17ee64f6aca6c86e7986941e76c`;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0b06669a793506ae54060f7df8a5fb6`;

    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        console.log(data);

        const { main, name, weather, wind, sys, dt } = data;

        cityname.innerHTML = `${name} , ${getcountryName(sys.country)} `;
        datetime.innerHTML = getDateTime(dt);


        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon">`;

        w_temperature.innerHTML = `Max:${main.temp}&#176`;
        w_minterm.innerHTML =  `Min:${main.temp_min.toFixed()}&#176`;
       // w_maxterm.innerHTML =  `${main.temp_max.toFixed()}&#176`;

        w_feelslike.innerHTML = `${main.feels_like.toFixed(2)} &#8490`;
        w_humidity.innerHTML = `${main.humidity} %`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hpa`;

    } catch (error) {
        console.log("error");
    }
}

document.body.addEventListener("load", getweatherData());
