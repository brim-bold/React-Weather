import React, { useState } from "react";
import "./searchBar.css";
import axios from "axios";
import Time from "./Time";

export default function Search() {
  let apiKey = "1d046e6aaa399d63de49ffe2fb5a384e";
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
  let [units, setUnits] = useState("imperial");
  let [statement, setStatement] = useState("");
  let [search, setSearch] = useState("");

  //weather forecast display
  function displayWeather() {
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
      </div>
    );
  }

  //updates weather variables and handles weather display
  function handleWeather(response) {
    console.log(response);
    cityName = response.data.name;
    temperature = response.data.main.temp;
    minTemperature = response.data.main.temp_min;
    maxTemperature = response.data.main.temp_max;
    humidity = response.data.main.humidity;
    wind = response.data.wind.speed;
    description = response.data.weather[0].description;
    icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

    if (units === "imperial") {
      windUnits = "mph";
    } else {
      windUnits = "kph";
    }

    setStatement(displayWeather());
  }

  //handles the conversion of weather variables between metric and imperial
  let celsius = document.querySelector("#celsius");
  let fahrenheit = document.querySelector("#fahrenheit");

  function metricConversion(event) {
    event.preventDefault();
    if (units === "imperial") {
      temperature = ((temperature - 32) * 5) / 9;
      maxTemperature = ((maxTemperature - 32) * 5) / 9;
      minTemperature = ((minTemperature - 32) * 5) / 9;
      wind = wind * 1.609;

      windUnits = "kph";
      setUnits("metric");

      fahrenheit.classList.remove("active");
      celsius.classList.add("active");
      fahrenheit.classList.add("inactive");
      celsius.classList.remove("inactive");
    }
  }

  function imperialConversion(event) {
    event.preventDefault();
    if (units === "metric") {
      temperature = (temperature * 9) / 5 + 32;
      maxTemperature = (maxTemperature * 9) / 5 + 32;
      minTemperature = (minTemperature * 9) / 5 + 32;
      wind = wind / 1.609;

      windUnits = "mph";
      setUnits("imperial");

      celsius.classList.remove("active");
      fahrenheit.classList.add("active");
      celsius.classList.add("inactive");
      fahrenheit.classList.remove("inactive");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(search);

    setSearch(true);

    if (search) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
      axios.get(url).then(handleWeather);
    }
  }

  function handleCurrent(event) {
    event.preventDefault();

    function getPosition(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
      axios.get(url).then(handleWeather);
    }

    navigator.geolocation.getCurrentPosition(getPosition);
  }

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
