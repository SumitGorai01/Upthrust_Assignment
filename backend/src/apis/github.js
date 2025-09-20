const axios = require("axios");
const token = process.env.GITHUB_TOKEN || null;

async function getTopRepoSummary() {
  try {
    const since = new Date(Date.now() - 7 * 24 * 3600 * 1000)
      .toISOString()
      .split("T")[0];
    const q = `created:>${since}`;
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
      q
    )}&sort=stars&order=desc&per_page=1`;

    const headers = {};

    if (token) 
      headers.Authorization = `token ${token}`;

    const r = await axios.get(url, { headers });
    const item = r.data.items && r.data.items[0];

    if (!item) 
      return "No trending repo found.";
    
    return `Top repo: ${item.full_name} (${item.stargazers_count}★) — ${
      item.description || "No description"
    }`;
  } catch (err) {
    console.error("github error", err?.response?.data || err.message);
    return "Could not fetch GitHub trending.";
  }
}

module.exports = { getTopRepoSummary };
