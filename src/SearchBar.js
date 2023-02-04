import React, { useState } from "react";
import "./searchBar.css";
import axios from "axios";
import Time from "./Time";

export default function Search() {
  let apiKey = "288fc2o04bt43eb21ce31fcd35acba08";
  let windUnits;
  let cityName;
  let temperature;
  let maxTemperature;
  let minTemperature;
  let humidity;
  let wind;
  let description;
  let icon;
  let url;

  let [city, setCity] = useState("Miami");
  let [statement, setStatement] = useState("");
  let [search, setSearch] = useState("true");
  let [lastUnit, setLastUnit] = useState("imperial");
  let [defaultLoad, setDefaultLoad] = useState(true);
  let unit = "";
  let forecast;
  let forecastWeather = [];

  //converts timestamp to display the correct day for the corresponding forecast data
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let day = days[date.getDay()];
    return day;
  }

  //weather current forecast display
  function displayWeather() {
    if (unit === "imperial") {
      return (
        <div className="Weather">
          <h1 id="city">{cityName}</h1>
          <ul className="header">
            <Time />
            <li id="currentWeather">{description}</li>
          </ul>
          <div className="row">
            <div className="col-sm-6 current">
              <div className="d-flex weatherTemperature">
                <img src={icon} alt={description} id="icon" className="icon" />
                <p className="temperature">
                  <span className="currentTemp" id="currentTemp">
                    {Math.round(temperature)}
                  </span>
                  <span className="units">
                    <span
                      onClick={imperialConversion}
                      className="active"
                      id="fahrenheit"
                    >
                      °F
                    </span>{" "}
                    |
                    <span
                      onClick={metricConversion}
                      id="celsius"
                      className="inactive"
                    >
                      °C
                    </span>
                  </span>
                </p>
              </div>
              <p className="maxMin">
                HI{" "}
                <span id="maxTemp" className="maxTemp">
                  {Math.round(maxTemperature)}
                </span>{" "}
                LO{" "}
                <span id="minTemp" className="minTemp">
                  {Math.round(minTemperature)}
                </span>
              </p>
            </div>
            <div className="col-sm-6 pt-1">
              <ul className="additionalWeather">
                <li>
                  Humidity: <span id="humidity">{humidity}</span>%
                </li>
                <li>
                  Wind: <span id="wind">{Math.round(wind)}</span>{" "}
                  <span id="windUnits">{windUnits}</span>
                </li>
              </ul>
            </div>
          </div>
          {formatForecast()}
        </div>
      );
    } else {
      return (
        <div className="Weather">
          <h1 id="city">{cityName}</h1>
          <ul className="header">
            <Time />
            <li id="currentWeather">{description}</li>
          </ul>
          <div className="row">
            <div className="col-sm-6 current">
              <div className="d-flex weatherTemperature">
                <img src={icon} alt={description} id="icon" className="icon" />
                <p className="temperature">
                  <span className="currentTemp" id="currentTemp">
                    {Math.round(temperature)}
                  </span>
                  <span className="units">
                    <span
                      onClick={imperialConversion}
                      className="inactive"
                      id="fahrenheit"
                    >
                      °F
                    </span>{" "}
                    |
                    <span
                      onClick={metricConversion}
                      id="celsius"
                      className="active"
                    >
                      °C
                    </span>
                  </span>
                </p>
              </div>
              <p className="maxMin">
                HI{" "}
                <span id="maxTemp" className="maxTemp">
                  {Math.round(maxTemperature)}
                </span>{" "}
                LO{" "}
                <span id="minTemp" className="minTemp">
                  {Math.round(minTemperature)}
                </span>
              </p>
            </div>
            <div className="col-sm-6 pt-1">
              <ul className="additionalWeather">
                <li>
                  Humidity: <span id="humidity">{humidity}</span>%
                </li>
                <li>
                  Wind: <span id="wind">{Math.round(wind)}</span>{" "}
                  <span id="windUnits">{windUnits}</span>
                </li>
              </ul>
            </div>
          </div>
          {formatForecast()}
        </div>
      );
    }
  }

  //formats html to display 6 day weather forecast
  function formatForecast() {
    return (
      <div className="row justify-content-center forecast" id="forecast">
        <div className="col-2 index1 text-center">
          <p className="day-forecast">{forecastWeather[1].day}</p>
          <img
            src={forecastWeather[1].url}
            alt={forecastWeather[1].description}
            id="icon-forecast"
            className="icon-forecast"
          />
          <p className="temperature-forecast">
            <span id="max-temp-forecast-index1" className="max-temp">
              {Math.round(forecastWeather[1].maxTemperature)}
            </span>
            °{" "}
            <span id="min-temp-forecast-index1" className="min-temp">
              {Math.round(forecastWeather[1].minTemperature)}
            </span>
            °
          </p>
        </div>
        <div className="col-2 index2 text-center">
          <p className="day-forecast">{forecastWeather[2].day}</p>
          <img
            src={forecastWeather[2].url}
            alt={forecastWeather[2].description}
            id="icon-forecast"
            className="icon-forecast"
          />
          <p className="temperature-forecast">
            <span id="max-temp-forecast-index2" className="max-temp">
              {Math.round(forecastWeather[2].maxTemperature)}
            </span>
            °{" "}
            <span id="min-temp-forecast-index2" className="min-temp">
              {Math.round(forecastWeather[2].minTemperature)}
            </span>
            °
          </p>
        </div>
        <div className="col-2 index3 text-center">
          <p className="day-forecast">{forecastWeather[3].day}</p>
          <img
            src={forecastWeather[3].url}
            alt={forecastWeather[3].description}
            id="icon-forecast"
            className="icon-forecast"
          />
          <p className="temperature-forecast">
            <span id="max-temp-forecast-index3" className="max-temp">
              {Math.round(forecastWeather[3].maxTemperature)}
            </span>
            °{" "}
            <span id="min-temp-forecast-index3" className="min-temp">
              {Math.round(forecastWeather[3].minTemperature)}
            </span>
            °
          </p>
        </div>
        <div className="col-2 index4 text-center">
          <p className="day-forecast">{forecastWeather[4].day}</p>
          <img
            src={forecastWeather[4].url}
            alt={forecastWeather[4].description}
            id="icon-forecast"
            className="icon-forecast"
          />
          <p className="temperature-forecast">
            <span id="max-temp-forecast-index4" className="max-temp">
              {Math.round(forecastWeather[4].maxTemperature)}
            </span>
            °{" "}
            <span id="min-temp-forecast-index4" className="min-temp">
              {Math.round(forecastWeather[4].minTemperature)}
            </span>
            °
          </p>
        </div>
        <div className="col-2 index5 text-center">
          <p className="day-forecast">{forecastWeather[5].day}</p>
          <img
            src={forecastWeather[5].url}
            alt={forecastWeather[5].description}
            id="icon-forecast"
            className="icon-forecast"
          />
          <p className="temperature-forecast">
            <span id="max-temp-forecast-index5" className="max-temp">
              {Math.round(forecastWeather[5].maxTemperature)}
            </span>
            °{" "}
            <span id="min-temp-forecast-index5" className="min-temp">
              {Math.round(forecastWeather[5].minTemperature)}
            </span>
            °
          </p>
        </div>
        <div className="col-2 index6 text-center">
          <p className="day-forecast">{forecastWeather[6].day}</p>
          <img
            src={forecastWeather[6].url}
            alt={forecastWeather[6].description}
            id="icon-forecast"
            className="icon-forecast"
          />
          <p className="temperature-forecast">
            <span id="max-temp-forecast-index6" className="max-temp">
              {Math.round(forecastWeather[6].maxTemperature)}
            </span>
            °{" "}
            <span id="min-temp-forecast-index6" className="min-temp">
              {Math.round(forecastWeather[6].minTemperature)}
            </span>
            °
          </p>
        </div>
      </div>
    );
  }

  //updates weather variables for minTemperature & maxTemperature and handles weather display
  function updateForecast(response) {
    minTemperature = response.data.daily[0].temperature.minimum;
    maxTemperature = response.data.daily[0].temperature.maximum;
    forecastWeather = [];
    forecast = response.data.daily;

    forecast.forEach(function (forecastDay, index) {
      if (index < 7) {
        forecastWeather.push({
          day: formatDay(forecastDay.time),
          url: forecastDay.condition.icon_url,
          description: forecastDay.condition.description,
          maxTemperature: forecastDay.temperature.maximum,
          minTemperature: forecastDay.temperature.minimum,
        });
      }
    });

    setStatement(displayWeather());
  }

  //sets some basic current weather data
  function handleWeather(response) {
    cityName = response.data.city;
    temperature = response.data.temperature.current;
    humidity = response.data.temperature.humidity;
    wind = response.data.wind.speed;
    description = response.data.condition.description;
    icon = response.data.condition.icon_url;

    forecast = null;
    if (unit === "imperial") {
      windUnits = "mph";
    } else {
      windUnits = "kph";
    }

    //calls function for 6 day forecast data
    let latitude = response.data.coordinates.latitude;
    let longitude = response.data.coordinates.longitude;

    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(updateForecast);
  }

  //handles the conversion of weather variables between metric and imperial
  function metricConversion(event) {
    event.preventDefault();

    if (lastUnit === "imperial") {
      setLastUnit("metric");
      unit = "metric";
      setSearch(true);

      if (search) {
        url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
        axios.get(url).then(handleWeather);
      }
    }
  }

  //converts weather data to imperial
  function imperialConversion(event) {
    event.preventDefault();

    if (lastUnit === "metric") {
      setLastUnit("imperial");
      unit = "imperial";
      setSearch(true);

      if (search) {
        url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
        axios.get(url).then(handleWeather);
      }
    }
  }

  //default loading city
  if (defaultLoad) {
    setSearch(true);
    unit = "imperial";

    if (search) {
      url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
      axios.get(url).then(handleWeather);
    }

    setDefaultLoad(false);
  }

  //handles search functionality
  function handleSubmit(event) {
    event.preventDefault();

    if (lastUnit === "imperial") {
      unit = "imperial";
    } else {
      unit = "metric";
    }

    setSearch(true);

    if (search) {
      url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
      axios.get(url).then(handleWeather);
    }
  }

  //handles current location weather functionality
  function handleCurrent(event) {
    event.preventDefault();

    if (lastUnit === "imperial") {
      unit = "imperial";
    } else {
      unit = "metric";
    }

    function getPosition(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      url = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${unit}`;
      axios.get(url).then(handleWeather);
    }

    navigator.geolocation.getCurrentPosition(getPosition);
  }

  //updates city variable
  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  return (
    <div>
      <div className="row">
        <div className="col-9">
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="search"
                onChange={updateCity}
                placeholder="City"
                className="form-control"
                id="cityInput"
                aria-label="Search"
                autoComplete="off"
              />
              <button type="submit" className="btn btn-info submitButton">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="col-2">
          <button
            type="button"
            onClick={handleCurrent}
            className="btn btn-secondary currentLocation"
          >
            Current
          </button>
        </div>
      </div>
      {statement}
    </div>
  );
}
