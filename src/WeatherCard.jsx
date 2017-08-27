import React from 'react';
import './App.css';

const WeatherCard = (props) => (
  <div className="widget">
    <div className="widget-details">
      <span>City: {props.cityName}</span>
      <span>Temperature: {props.details.temp}</span>
      <span>Humidity: {props.details.humidity}</span>
      <span>Pressure: {props.details.pressure}</span>
      <span>Description: {props.weather.description}</span>
    </div>
    <div className="widget-icon">
      <span className="cancel" onClick={() => { props.deleteCity(props.cityName); }}>X</span>
      <img src={`http://openweathermap.org/img/w/${props.weather.icon}.png`} alt="weather" />
    </div>
  </div>
);

export default WeatherCard;
