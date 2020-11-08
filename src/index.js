  function formatDate(timestamp) {
    let now = new Date(timestamp);
    
    let date = now.getDate();
        if(date < 10) {
         date = `0${date}`;
        }
    let days = [
           "Sunday",
           "Monday",
           "Tuesday",
           "Wednesday",
           "Thursday",
           "Friday",
           "Saturday"
         ];
    let day = days[now.getDay()];

    let year = now.getUTCFullYear();

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let month = months[now.getMonth()];

    return `${date} ${month} ${year}<br />${day} <br /> Last updated at ${formatHours(timestamp)}`;
  }      
  
  function formatHours(timestamp) {
    let now = new Date(timestamp);
         
    let hours = now.getUTCHours();
        if(hours < 10) {
          hours = `0${hours}`;
        }
    let minutes = now.getUTCMinutes();
        if(minutes < 10) {
          minutes = `0${minutes}`;
        }

    return `${hours}:${minutes}`;    
  }

  function showForecast(response) {
    console.log(response.data);
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    for (let index = 0; index < 5; index++) {
      forecast = response.data.list[index];
      forecastElement.innerHTML += `
      <div class="col-2" id="hourly-forecast">
        <h6 id="hourly">
         <strong>${formatHours(forecast.dt * 1000)}</strong>
        </h6>
        <div id="temperatureForecast">
         H:<span id="highTemp"><strong>${Math.round(forecast.main.temp_max)}</strong>°</span>
         L:<span id="lowTemp">${Math.round(forecast.main.temp_min)}</span>°
        </div> 
        <br />
        <img
         src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
         id="forecast-icon" /> 
      </div>
      `;
    }
  }
        
    function showF(event) {
    event.preventDefault();
    showCelcius.classList.remove("active");
    showFarenheit.classList.add("active");
    let c = document.querySelector("#current-temp");
    let f = c.innerHTML*1.8+32;
    let tempF = Math.round(f);
    c.innerHTML = tempF;
    }
        
     let showFarenheit = document.querySelector("#farenheit-link");
        showFarenheit.addEventListener("click", showF);
  
      function showC(event) {
          event.preventDefault();
          showCelcius.classList.add("active");
          showFarenheit.classList.remove("active");
          let c = document.querySelector("#current-temp");
          let tempC = Math.round((c.innerHTML-32)/1.8);
          c.innerHTML = tempC;
        }
  
      let showCelcius = document.querySelector("#celcius-link");
        showCelcius.addEventListener("click", showC);
        
      let celciusTemperature = null;

      function displayCurrentWeather(response) {
        console.log(response.data);
        document.querySelector("#current-city").innerHTML = response.data.name;
        document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp);
        document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
        document.querySelector(".high").innerHTML = Math.round(response.data.main.temp_max);
        document.querySelector(".low").innerHTML = Math.round(response.data.main.temp_min);
        let sunriseTime = new Date(response.data.sys.sunrise * 1000);
        document.querySelector("#sunrise").innerHTML = formatHours((response.data.sys.sunrise + response.data.timezone) * 1000);
        //`${sunriseTime.getUTCHours()}:${sunriseTime.getUTCMinutes()}`;
        let sunsetTime = new Date(response.data.sys.sunset * 1000);
        document.querySelector("#sunset").innerHTML = formatHours((response.data.sys.sunset + response.data.timezone) * 1000);
        //`${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`;
        document.querySelector("#pressure").innerHTML = Math.round(response.data.main.pressure);
        document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
        document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
        document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
        let iconElement = document.querySelector("#current-weather-icon");
        let code = response.data.weather[0].icon;
            if(code === "04d" || code === "04n") {
              iconElement.setAttribute("src", "Images/brokenclouds.gif");
            } else if (code === "09d") {
              iconElement.setAttribute("src", "Images/rainy1.gif");
            } else if (code === "09n") {
              iconElement.setAttribute("src", "Images/nightrain.gif");
            } else if (code === "10d") {
              iconElement.setAttribute("src", "Images/dayrain.gif");
            } else if (code === "10n") {
              iconElement.setAttribute("src", "Images/nightrain.gif");
            } else if (code === "11d" || code === "11n") {
              iconElement.setAttribute("src", "Images/thunderstorm1.gif");
            } else if (code === "13d" || code === "13n") {
              iconElement.setAttribute("src", "Images/snow.gif");
            } else if (code === "50d" || code === "50n") {
              iconElement.setAttribute("src", "Images/mist.gif");
            } else if (code === "03d") {
              iconElement.setAttribute("src", "Images/cloudyday.gif");
            } else if (code === "03n") {
              iconElement.setAttribute("src", "Images/cloudynight.gif");
            } else if (code === "02d") {
              iconElement.setAttribute("src", "Images/suncloud.gif");
            } else if (code === "02n") {
              iconElement.setAttribute("src", "Images/mooncloud.gif");
            } else if (code === "01d") {
              iconElement.setAttribute("src", "Images/sunny.gif");
            } else if (code === "01n") {
              iconElement.setAttribute("src", "Images/moon.gif");
            } else iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
              iconElement.setAttribute("alt", response.data.weather[0].description);
      }

      function searchCity(city) {
        let apiKey = "a4bdb9d9d153eeae6046500ced913295";
        let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
        let units = "metric";
        let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
      
        axios.get(apiUrl).then(displayCurrentWeather);
        
        apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        
        axios.get(apiUrl).then(showForecast);
      }


      function handleSubmit(event) {
        event.preventDefault();
        let city = document.querySelector("#search-city-input").value;
        let h3 = document.querySelector("#current-city");
          h3.innerHTML = `${city.value}`;
        searchCity(city);
      }

      let searchForm = document.querySelector("#searchcity");
      searchForm.addEventListener("submit", handleSubmit);

      let searchButton = document.querySelector(".button");
      searchButton.addEventListener("click", handleSubmit);

      function showLocation(position) {
        let apiKey = "a4bdb9d9d153eeae6046500ced913295";
        let units = "metric";
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
        console.log(apiUrl);
        axios.get(apiUrl).then(displayCurrentWeather);
      }

      function getCurrentLocation(event) {
        event.preventDefault();
      navigator.geolocation.getCurrentPosition(showLocation);
      }
      
      let currentLocationButton = document.querySelector("#currentlocation-button");
       currentLocationButton.addEventListener("click", getCurrentLocation);

      searchCity("La Chevrolière");
