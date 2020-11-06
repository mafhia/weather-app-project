         let now = new Date();
         
         let date = now.getDate();
           if(date < 10) {
             date = `0${date}`;
           }
         let hours = now.getHours();
           if(hours < 10) {
             hours = `0${hours}`;
           }
         let minutes = now.getMinutes();
           if(minutes < 10) {
             minutes = `0${minutes}`;
           }
         let year = now.getUTCFullYear();
         
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
         
         let h1 = document.querySelector("h1");
         h1.innerHTML = `${date} ${month} ${year}<br /> ${day}<br /> Last updated at ${hours}:${minutes}`;


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
        document.querySelector("#sunrise").innerHTML = `${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`;
        let sunsetTime = new Date(response.data.sys.sunset * 1000);
        document.querySelector("#sunset").innerHTML = `${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`;
        document.querySelector("#pressure").innerHTML = Math.round(response.data.main.pressure);
        document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
        document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
        let iconElement = document.querySelector("#current-weather-icon");
        iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        iconElement.setAttribute("alt", response.data.weather[0].description);
      }
      

      function searchCity(city) {
        let apiKey = "a4bdb9d9d153eeae6046500ced913295";
        let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
        let units = "metric";
        let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
      
        axios.get(apiUrl).then(displayCurrentWeather);
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
