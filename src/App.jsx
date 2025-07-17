import { useState, useRef } from 'react'
import './App.css'

const LOCATIONIQ_KEY = import.meta.env.VITE_LOCATIONIQ_KEY;
function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [hourlyByDay, setHourlyByDay] = useState([]); // [{date, hours: [{time, temp, precip, wind}]}]
  const [selectedDay, setSelectedDay] = useState(0); // 0 = today
  const [minTempF, setMinTempF] = useState(65);
  const [maxTempF, setMaxTempF] = useState(85);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null); // {lat, lon, display_name}
  const autocompleteTimeout = useRef(null);

  // Autocomplete as user types
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedLocation(null);
    setSuggestions([]);
    if (autocompleteTimeout.current) clearTimeout(autocompleteTimeout.current);
    const value = e.target.value;
    if (value.length < 3) return;
    autocompleteTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://api.locationiq.com/v1/autocomplete?key=${LOCATIONIQ_KEY}&q=${encodeURIComponent(value)}&limit=5&format=json&countrycodes=us`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setSuggestions(data);
        }
      } catch {}
    }, 300);
  };

  // When user selects a suggestion
  const handleSuggestionClick = (sugg) => {
    setQuery(sugg.display_place || sugg.display_name || sugg.address?.name || sugg.address?.road || '');
    setSelectedLocation({ lat: sugg.lat, lon: sugg.lon, display_name: sugg.display_name });
    setSuggestions([]);
  };

  // On form submit
  const getWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setHourlyByDay([]);
    setFallbackUsed(false);
    setSelectedDay(0);
    let lat, lon;
    // Use selectedLocation if available
    if (selectedLocation) {
      lat = selectedLocation.lat;
      lon = selectedLocation.lon;
    } else {
      // Use LocationIQ search API
      try {
        const res = await fetch(`https://us1.locationiq.com/v1/search?key=${LOCATIONIQ_KEY}&q=${encodeURIComponent(query)}&format=json&limit=1`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          lat = data[0].lat;
          lon = data[0].lon;
        } else {
          setError('Location not found. Try a different search.');
          setLoading(false);
          return;
        }
      } catch {
        setError('Location search failed.');
        setLoading(false);
        return;
      }
    }
    // Fetch 7 days of hourly forecast using Open-Meteo (with wind)
    if (lat && lon) {
      try {
        const meteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,wind_speed_10m&forecast_days=7&timezone=auto&temperature_unit=fahrenheit`;
        const res = await fetch(meteoUrl);
        const data = await res.json();
        if (res.ok && data.hourly && data.hourly.time && data.hourly.temperature_2m && data.hourly.precipitation && data.hourly.wind_speed_10m) {
          // Group by day
          const byDay = {};
          data.hourly.time.forEach((t, i) => {
            const date = t.slice(0, 10);
            if (!byDay[date]) byDay[date] = [];
            byDay[date].push({
              time: t,
              temp: data.hourly.temperature_2m[i],
              precip: data.hourly.precipitation[i],
              wind: data.hourly.wind_speed_10m[i],
            });
          });
          const days = Object.keys(byDay).sort().map(date => ({ date, hours: byDay[date] }));
          setHourlyByDay(days);
        }
      } catch (err) {
        // Ignore hourly errors for now
      }
    }
    setLoading(false);
  };

  // Helper for day label
  const getDayLabel = (date, idx, todayIdx) => {
    if (idx === todayIdx) return 'Today';
    const d = new Date(date);
    return d.toLocaleDateString(undefined, { weekday: 'short' });
  };

  // Helper: find the index of today in hourlyByDay
  const getTodayIdx = () => {
    const todayStr = new Date().toISOString().slice(0, 10);
    return hourlyByDay.findIndex(d => d.date === todayStr);
  };

  const todayIdx = getTodayIdx();

  // Helper: mph from m/s
  const msToMph = (ms) => ms * 2.23694;

  return (
    <div className={`weather-app${hourlyByDay.length > 0 ? ' wide' : ''}`}>
      <h1>Weather Search</h1>
      <form onSubmit={getWeather} className="weather-form" autoComplete="off">
        <div className="search-bar-group" style={{position: 'relative'}}>
          <input
            type="text"
            placeholder="Enter city, zipcode, or address"
            value={query}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          <button type="submit">Get Weather</button>
          {suggestions.length > 0 && (
            <ul style={{position: 'absolute', top: 48, left: 0, right: 0, zIndex: 10, background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', listStyle: 'none', margin: 0, padding: 0, maxHeight: 220, overflowY: 'auto'}}>
              {suggestions.map((sugg, idx) => (
                <li key={sugg.place_id || idx} style={{padding: '0.7rem 1rem', cursor: 'pointer', borderBottom: idx !== suggestions.length-1 ? '1px solid #f3f4f6' : 'none'}} onClick={() => handleSuggestionClick(sugg)}>
                  {sugg.display_place || sugg.display_name || sugg.address?.name || sugg.address?.road || 'Unknown'}
                  <div style={{fontSize: '0.92em', color: '#888', marginTop: 2}}>{sugg.display_address || sugg.display_name}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
      {hourlyByDay.length > 0 && (
        <div className="temp-range-group">
          <label className="temp-range-label">Temp Range:</label>
          <input type="number" min={-20} max={maxTempF} value={minTempF} onChange={e => setMinTempF(Number(e.target.value))} className="temp-range-input" />
          <span className="temp-range-sep">-</span>
          <input type="number" min={minTempF} max={120} value={maxTempF} onChange={e => setMaxTempF(Number(e.target.value))} className="temp-range-input" />
          <span className="temp-range-unit">°F</span>
        </div>
      )}
      <p style={{fontSize: '0.98rem', color: '#666', margin: '0 0 1.2rem 0', maxWidth: 340}}>
        <strong>Note:</strong> Full street addresses may not always work. For best results, use city, state, or zipcode. If you get an error, try simplifying your input.
      </p>
      {error && <p className="error">{error}</p>}
      {fallbackUsed && (
        <p style={{fontSize: '0.97rem', color: '#2563eb', margin: '0 0 1rem 0', maxWidth: 340}}>
          The full address could not be found. Showing weather for the broader area instead.
        </p>
      )}
      {loading && <p>Loading...</p>}
      {hourlyByDay.length > 0 && (
        <div className="multi-day-forecast">
          <div className="day-selector">
            {hourlyByDay.map((d, idx) => (
              <button
                key={d.date}
                className={selectedDay === idx ? 'active' : ''}
                onClick={() => setSelectedDay(idx)}
                style={{
                  marginRight: 8,
                  marginBottom: 8,
                  padding: '0.5rem 1rem',
                  borderRadius: 8,
                  border: 'none',
                  background: selectedDay === idx ? '#2563eb' : '#f3f4f6',
                  color: selectedDay === idx ? '#fff' : '#222',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: selectedDay === idx ? '0 2px 8px #2563eb22' : 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {getDayLabel(d.date, idx, todayIdx)}
              </button>
            ))}
          </div>
          <div className="hourly-list">
            <h3 style={{marginTop: '1rem', marginBottom: '0.5rem'}}>
              Hourly Temperature & Precipitation ({getDayLabel(hourlyByDay[selectedDay].date, selectedDay, todayIdx)})
            </h3>
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
              {(() => {
                const hours = hourlyByDay[selectedDay].hours;
                let prevRained = false;
                return hours.map((h, i) => {
                  const tempF = h.temp;
                  const isCurrentHour = selectedDay === 0 && new Date(h.time).getHours() === new Date().getHours();
                  // If it rained in the previous hour, skip this hour for perfect
                  let isPerfect = tempF >= minTempF && tempF <= maxTempF && h.precip < 0.01 && !prevRained;
                  if (h.precip >= 0.01) prevRained = true;
                  else prevRained = false;
                  const liClass = `${isCurrentHour ? 'current-hour' : ''} ${isPerfect ? 'perfect-pickleball' : ''}`.trim();
                  return (
                    <li key={h.time} className={liClass}>
                      <span className="hour-time">{new Date(h.time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                      <span className="hour-temp">{Math.round(tempF)}°F</span>
                      <span className="hour-precip">{(h.precip / 25.4).toFixed(2)} in</span>
                      {isPerfect && (
                        <span className="pickleball-badge">Perfect for Pickleball!</span>
                      )}
                    </li>
                  );
                });
              })()}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App
