// Get all necessary elements from the DOM
const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutout = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

// Default city when the page Loads
let cityInput = "Paris";

// Add click event to each city in the panel
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    // Change from default city to the clicked one
    cityInput = e.target.innerHTML;
    /*Function that fetches and displays all the data from the weather API (we will write it soon) */
    fetchWeatherData();
    // fade out the app (simple animation)
    app.getElementsByClassName.opacity = "0";
  });
});
// const callapi = () => {
//   alert("helo");
//   if (search.value.length == 0) {
//     alert("Please type in a city name");
//   } else {
//     /*Change from default city to the one written in the input field */
//     cityInput = search.value;
//     console.log(cityInput, search.value);
//     /*Function that fetches and displays all the data from the weather API (we will write it soon) */
//     fetchWeatherData();
//     //Remove all text from the input feild
//     search.value = "";
//     //fade out the app (simple animation )
//     app.getElementsByClassName.opacity = "0";
//   }
// };
// Add submit event to the form
form.addEventListener("submit", (e) => {
  if (search.value== null) {
    alert("Please type in a city name");
  } else {
    /*Change from default city to the one written in the input field */
    cityInput = search.value;
    console.log(cityInput, search.value);
    /*Function that fetches and displays all the data from the weather API (we will write it soon) */
    fetchWeatherData();
    //Remove all text from the input feild
    search.value = "";
    //fade out the app (simple animation )
    app.getElementsByClassName.opacity = "0";
  }

  // Prevents the default behaviour of the form
  e.preventDefault();
});

/* Function that returns a day of the week (Monday , Tuesday , friday ...)from a date (12 03 2021) we will use function Later*/
function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new DataTransfer(`${day}/${month}/${year}`).getDay()];
}

/*Function that fetches and displays the data from the weather API */
function fetchWeatherData() {
  /*Fetch the data and dynamicaly add the city name with template literals */
  //fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${cityInput}`)
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ea79a6c9f42847ca929115501231502&q=${cityInput}&days=1&aqi=no&alerts=no`
  )
    /*take the data (which is in JSON format) and convert it to a regular JS object */
    .then((responce) => responce.json())
    .then((data) => {
      /*You can console Log the data to see what is available */
      console.log(data);

      /*Let's start by adding the temperature and weather condition to the page */
      temp.innerHTML = data.current.temp_c + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;

      /*Get the data and time from the city and extract the day,month , year and time into individual variables */
      const getTime = data.location.localtime;
      //   const y = parseInt(getTime.substr(0, 4));
      //   const m = parseInt(getTime.substr(5, 2));
      //   const d = parseInt(getTime.substr(8, 2));
      //   const time = dataa.substr(11);
      console.log(getTime);
      /*Reformat the date into somehing more appealing and add it to the page */
      /*Original Format : 2021-10-09 17:53 */
      /*New format : 17:53 - friday 9, 10 2021 */
      //   dataOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
      timeOutput.innerHTML = getTime;
      /*Add the name of the city into the page */
      nameOutput.innerHTML = data.location.name;
      console.log(data.location.name);
      /*Get the corresponding icon url for the weather and extract a part of it */
      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );
      /*Reformat the icon url to your own Local path and add it to the page */
      icon.src = "./icons/" + iconId;

      // Add the weather details to the page
      cloudOutout.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      // Set default time of day
      let timeOfDay = "day";
      // Get the unique id for each weather condition
      const code = data.current.condition.code;

      // Change to night if its night in the city
      if (!data.current.is_day) {
        timeOfDay = "night";
      }

      if (code == 1000) {
        /*Set the background image to clear if the weather is clear */
        app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
        /*Change the button bg color depending on if its day or night */
        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        /*Some thing for cloudy weather */
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#fa6d1b";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
        // And Rain
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#647d75";
        if (timeOfDay == "night") {
          btn.style.background = "#325c80";
        }
        // And Snow
      } else {
        app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
        btn.style.background = "#4d72aa";
        if (timeOfDay == "night") {
          btn.style.background = "#1b1b1b";
        }
      }

      // Fade in the page once all is done
      app.style.opacity = "1";
    })

    /*If the user types a city that doesn't exist, throw an alert */
    .catch(() => {
      alert('City not found, please try again');
      app.style.opacity = "1";
    });
}

// Call the function on the page load
fetchWeatherData();

// Fade in the page

app.style.opacity = "1";
