import React from 'react';
import axios from 'axios';

import "../style/Weather.css"

const WeatherCard = () => {
  const apiKey = '23ccae5d1aaf4366a07234004231006';
  const [weatherData, setWeatherData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let long;
    let lat;

    const fetchWeatherData = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        long = position.coords.longitude;
        lat = position.coords.latitude;

        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${long}&days=1&aqi=no`);

        const { temp_c: temp, temp_f: fahrenheit } = response.data.current;
        const { name: place } = response.data.location;
        const { text: description, icon } = response.data.current.condition;
        const { astro } = response.data.forecast.forecastday[0];
        const { sunrise, sunset } = astro;

        const iconUrl = `https:${icon}`;

        // Extract date from API response
        const { date } = response.data.forecast.forecastday[0];

        // Combine date with sunrise and sunset times
        const sunriseDateTimeStr = `${date} ${sunrise}`;
        const sunsetDateTimeStr = `${date} ${sunset}`;

        // Convert combined date-time strings to Date objects
        const sunriseGMT = new Date(sunriseDateTimeStr);
        const sunsetGMT = new Date(sunsetDateTimeStr);

        setWeatherData({
          temp,
          place,
          description,
          fahrenheit,
          iconUrl,
          sunriseGMT,
          sunsetGMT,
        });
      } catch (error) {
        setError('Error fetching weather data');
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [apiKey]);

  return (
    <div className="weather-card" id="card">
        <div className="weather-box">
      {error ? (
        <div>{error}</div>
      ) : weatherData ? (
        <>
          <img src={weatherData.iconUrl} alt="Weather Icon" />
          <div id="location">{weatherData.place}</div>
          <div className="desc">{weatherData.description}</div>
          <div className="weather">
            <div className="c">{weatherData.temp.toFixed(2)} °C</div>
            <div className="circle"></div>
            <div className="f">{weatherData.fahrenheit.toFixed(2)} °F</div>
          </div>
          <div className="info">
            <h4>
              Sunrise:{' '}
              <span className="sunrise">
                {weatherData.sunriseGMT.toLocaleDateString()}, {weatherData.sunriseGMT.toLocaleTimeString()}
              </span>
            </h4>
            <h4>
              Sunset:{' '}
              <span className="sunset">
                {weatherData.sunsetGMT.toLocaleDateString()}, {weatherData.sunsetGMT.toLocaleTimeString()}
              </span>
            </h4>
          </div>
        </>
      ) : (
        <div>Loading weather data...</div>
      )}
      </div>
    </div>
  );
};

export default WeatherCard;
