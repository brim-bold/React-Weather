import React, { useState } from "react";
import axios from "axios";
import Time from "./Time";

export default function Weather(props) {
  let [city, setCity] = useState("Brooklyn");
  let [units, setUnits] = useState("imperial");
  let [temperature, setTemperature] = (null);

  return (
    <div className="Weather">
      <h1 id="city">{city}</h1>
      <ul className="header">
        <Time />
        <li id="currentWeather">mist</li>
      </ul>
      <div className="row">
        <div className="col-sm-6 current">
          <div className="d-flex weatherTemperature">
            <img
              src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/mist-day.png"
              alt="mist"
              id="icon"
              className="icon"
            />
            <p className="temperature">
              <span className="currentTemp" id="currentTemp">
                49
              </span>
              <span className="units">
                <a href="#" className="active" id="fahrenheit">
                  °F
                </a>{" "}
                |
                <a href="#" id="celsius" className="inactive">
                  °C
                </a>
              </span>
            </p>
          </div>
          <p className="maxMin">
            HI{" "}
            <span id="maxTemp" className="maxTemp">
              55
            </span>{" "}
            LO{" "}
            <span id="minTemp" className="minTemp">
              48
            </span>
          </p>
        </div>
        <div className="col-sm-6 pt-1">
          <ul className="additionalWeather">
            <li>
              Humidity: <span id="humidity">91</span>%
            </li>
            <li>
              Wind: <span id="wind">9</span>
              <span id="windUnits"> mph</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
