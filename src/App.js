import './App.css';
import React, { useState, useEffect } from 'react';
import Weather from './components/weather';
import { Dimmer, Loader } from 'semantic-ui-react';
import Forecast from './components/forecast';

function App() {

  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    if (typeof latitude === "number" && typeof longitude === "number") {

      getWeather(latitude, longitude).then(weather => {
        setWeatherData(weather);
        setError(null);
      }).catch(err => {
        setError(err.message);
      });

      getForecast(latitude, longitude).then(forecast => {
        setForecast(forecast);
        setError(null);
      }).catch(err => {
        setError(err.message);
      });
    }

    }, [latitude, longitude, error]);

  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Please Enable your Location in your browser!");
    }
  }
  function getWeather(lat, long) {
    return  fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(res => handleResponse(res));
  }

  function getForecast(lat, long) {
    return fetch(
      `${process.env.REACT_APP_API_URL}/forecast/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => handleResponse(res))
      .then(forecastData => {
        if (Object.entries(forecastData).length) {
          return forecastData.list
            .filter(forecast => forecast.dt_txt.match(/09:00:00/))
        }
      });
  }

  return (
    <div className="App">
      {( typeof weatherData.main != 'undefined') ? (
        <div>
        <Weather weatherData={weatherData}/>
        <Forecast forecastData={forecast} />
        </div>
      ): (
        <div>
          <Dimmer active>
            <Loader>Loading...</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}

export default App;
