import React from 'react';
import './WeatherSquare.css';

const WeatherSquare = ({ temperature, feelsLike, image, location }) => {
  return (
    <div className="weather-square">
      <img src={image} alt="Weather" className="weather-image" />
      <div className="weather-overlay">
        <div className="weather-header">
          <img src="/yr-logo.png" alt="YR" className="yr-logo" />
         
        </div>
        <div className="weather-info">
        <p className="weather-location">Maridalsveien 29, Oslo</p>
          <h1 className="temperature">{temperature}°</h1>
          <p className="feels-like">Feels like {feelsLike}°</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherSquare;
