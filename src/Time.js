import React from "react";

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function updateTime() {
  let today = new Date();

  let day = days[today.getDay()];

  let hour = today.getHours();

  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  //let time = document.querySelector("#time");
  return (
    <li>
      Last update: {day} {hour}:{minutes}
    </li>
  );
}
