import React, { useEffect, useState } from "react";
import "./Weather.css";
import Sunny from "../images/sun.png";
import CloudySun from "../images/cloudysun.png";
import Rainy from "../images/rain.png";
import Snow from "../images/snow.png";
import Storm from "../images/storm.png";
import Wind from "../images/wind.png";
import searchicon from "../images/search.png";
import { useRef } from "react";

const Weather = () => {
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": Sunny,
    "02d": CloudySun,
    "03d": CloudySun,
    "04d": CloudySun,
    "10d": Rainy,
    "09d": Rainy,
    "13d": Snow,
    "11d": Storm,
    "50n": Storm,
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon];
      setWeatherData({
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {}
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          ref={inputRef}
          className="city-input"
          type="text"
          placeholder="Search City"
        />
        <img
          className="search-icon"
          src={searchicon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      <img src={Sunny} alt="" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="city">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={Wind} alt="" />
          <div>
            <p>{weatherData.windSpeed}</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
