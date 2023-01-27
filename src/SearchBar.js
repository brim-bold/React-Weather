import React, { useState } from "react";
import Weather from "./Weather";
import "./searchBar.css";

export default function Search() {
  let [city, setCity] = useState("Miami");
  let [statement, setStatement] = useState(
    <Weather city={city} searchType={searchType} />
  );
  let searchType = "search";

  function handleSubmit(event) {
    event.preventDefault();
    searchType = "search";
    setStatement(<Weather city={city} searchType={searchType} />);
  }

  function handleCurrent(event) {
    event.preventDefault();
    searchType = "current";
    setStatement(<Weather city={city} searchType={searchType} />);
  }

  function updateCity(event) {
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
                onChange={handleCity}
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
