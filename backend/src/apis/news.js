const axios = require("axios");
const API_KEY = process.env.NEWSAPI_KEY;

async function getTopHeadline() {
  if (!API_KEY) 
    return "News API not configured.";

  try {
    const { data } = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    ); 
    // console.log("News API response:", data);

    const article = data.articles?.[0];
    return article
      ? `${article.title} — ${article.source?.name || "Unknown"}`
      : "No top headline available.";
  } catch (err) {
    console.error("News error:", err?.response?.data || err.message);
    return "Could not fetch news.";
  }
}

module.exports = { getTopHeadline };
