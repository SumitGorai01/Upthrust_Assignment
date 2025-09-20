const axios = require('axios');
const API_KEY = process.env.OPENWEATHER_API_KEY;

async function getWeatherSummary(city = 'Goa') { // default to Goa
  if (!API_KEY) 
    return 'Weather API not configured.';

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const r = await axios.get(url);
    const { weather, main, name } = r.data;

    const desc = weather?.[0]?.description;
    const temp = main?.temp;

    return `${desc ? capitalize(desc) + ' in' : 'Weather in'} ${name || city}, ${temp != null ? Math.round(temp) + '°C' : 'N/A'}`;
  } catch (err) {
    console.error('Weather error:', err?.response?.data || err.message);
    return `Could not fetch weather for ${city}.`;
  }
}

function capitalize(s){ 
  return s ? s[0].toUpperCase() + s.slice(1) : ''; 
}

module.exports = { getWeatherSummary };
