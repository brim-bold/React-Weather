import React from "react";
import "./searchBar.css";

export default function Search() {
  return (
    <form>
      <div className="input-group mb-3">
        <input
          type="text"
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
  );
}
