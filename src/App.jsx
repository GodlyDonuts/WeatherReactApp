import { useState } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setWeather(null);
    let url = '';
    // If input is all digits, treat as zipcode
    if (/^\d{5}$/.test(query.trim())) {
      url = `https://api.openweathermap.org/data/2.5/weather?zip=${query.trim()}&appid=${API_KEY}&units=metric`;
    } else {
      // Use Geocoding API to get lat/lon for address
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query.trim())}&limit=1&appid=${API_KEY}`;
      try {
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();
        if (!geoRes.ok || !geoData.length) {
          setError('Address not found.');
          setLoading(false);
          return;
        }
        const { lat, lon } = geoData[0];
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      } catch (err) {
        setError('Error finding address.');
        setLoading(false);
        return;
      }
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message || 'Could not fetch weather.');
      }
    } catch (err) {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather Search</h1>
      <form onSubmit={getWeather} className="weather-form">
        <input
          type="text"
          placeholder="Enter city, zipcode, or address"
          value={query}
          onChange={e => setQuery(e.target.value)}
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-result">
          <h2>{weather.name}, {weather.sys?.country}</h2>
          <p>{weather.weather?.[0]?.main} - {weather.weather?.[0]?.description}</p>
          <p>Temperature: {weather.main?.temp}°C</p>
          <p>Feels like: {weather.main?.feels_like}°C</p>
          <p>Humidity: {weather.main?.humidity}%</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@2x.png`} alt={weather.weather?.[0]?.description} />
        </div>
      )}
    </div>
  );
}

export default App
