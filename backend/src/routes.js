const express = require('express');
const router = express.Router();
const ai = require('./ai');
const weatherApi = require('./apis/weather');
const githubApi = require('./apis/github');
const newsApi = require('./apis/news');
const db = require('./db');

router.post('/run-workflow', async (req, res) => {
  try {
    const { prompt, action, city, country } = req.body; // added city & country

    if (!prompt || !action) 
      return res.status(400).json({ error: 'prompt and action required' });

    const ai_response = await ai.generateShort(prompt);
    let api_response = '';

    // Handle dynamic actions
    switch(action) {
      case 'weather':
        api_response = await weatherApi.getWeatherSummary(city); // pass city dynamically
        break;
      case 'github':
        api_response = await githubApi.getTopRepoSummary();
        break;
      case 'news':
        api_response = await newsApi.getTopHeadline(country); // optional country for news
        break;
      default:
        return res.status(400).json({ error: 'unsupported action' });
    }

    const suffix = `#${action}`;
    const final_result = `${ai_response}. ${api_response} ${suffix}`.trim().slice(0, 280); // truncate to 280 chars

    // Save to DB if configured
    if (db.isConfigured()) {
      await db.insertRun({ prompt, action, ai_response, api_response, final_result });
    }

    return res.json({ ai_response, api_response, final_result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error', details: err.message });
  }
});

// Fetch last 10 runs from db
router.get('/history', async (req, res) => {
  try {
    if (!db.isConfigured()) return res.json({ history: [] });
    const rows = await db.fetchLastRuns(10);
    res.json({ history: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ history: [], error: err.message });
  }
});

module.exports = router;
