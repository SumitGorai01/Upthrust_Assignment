# Upthrust\_Assignment

**MiniFlow AI** - A mini workflow automation app built with **Node.js (Express)** for the backend, **React (Vite)** for the frontend, and optional **Postgres** persistence. Users can define and run a simple 2-step workflow powered by an AI agent + third-party API.

---

## ✨ Features

* **AI Agent**: Generates a short tweet-sized response using HuggingFace AI (or mock).
* **Third-party APIs**:

  * Weather (OpenWeatherMap)
  * GitHub (trending repos)
  * News (top headlines)
* **Workflow Run**: Combines AI + API into a final output string.
* **History**: (Optional) Last 10 workflow runs stored in Postgres.
* **Frontend**: React UI with prompt input, dropdown action, and history display.

---

## 📂 Project Structure

```
Upthrust_Assignment/
├─ backend/
│  ├─ migrations/
│  │    └─ create_runs_table.sql
│  ├─ node_modules
│  ├─ src/
│  │  ├─ apis/
│  │  │  ├─ github.js      # GitHub trending helper
│  │  │  ├─ news.js        # NewsAPI helper
│  │  │  └─ weather.js     # OpenWeatherMap helper
│  │  ├─ ai.js             # LLM wrapper (Huggingface or mock)
│  │  ├─ db.js             # Optional Postgres client + migrations
│  │  ├─ index.js          # Express server
│  │  └─ routes.js         # API routes
│  ├─ .env.example
│  ├─ package.json
│  └─ package-lock.json
│
├─ frontend/
│    │── node_modules/
│    │── public/ # Static assets
│    │ └── vite.svg
│    │── src/ # Source code
│    │ ├── assets/ # Images, fonts, and │other assets
│    │ ├── components/
│    │ │ ├── HistoryList.jsx
│    │ │ └── WorkflowForm.jsx
│    │ ├── App.css 
│    │ ├── App.jsx 
│    │ ├── index.css
│    │ └── main.jsx 
│    │── eslint.config.js 
│    │── index.html 
│    │── package.json 
│    │── package-lock.json
│    └── vite.config.json
│
└── README.md # Project documentation
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/SumitGorai01/Upthrust_Assignment.git
cd Upthrust_Assignment
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and add API keys:

```env
PORT=4000
HF_API_KEY=sxxxx                      
OPENWEATHER_API_KEY=your_key          # required for weather action
NEWSAPI_KEY=your_key                  # required for news action
GITHUB_TOKEN=your_token               
DATABASE_URL=postgres://user:pass@localhost:5432/upthrust  # optional
```

Start backend:

```bash
node src/index.js
```
or
```bash
nodemon src/index.js
```

Backend runs at: **[http://localhost:4000](http://localhost:4000)**

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at: **[http://localhost:5173](http://localhost:5173)** (default Vite port).

### 4. Database (Optional)

If you want persistence:

```bash
psql -U postgres -c "CREATE DATABASE upthrust;"
psql -U postgres -d upthrust -f backend/migrations/create_runs_table.sql
```

Make sure `DATABASE_URL` in `.env` is set.

---

## 🚀 Example Flow

1. Open frontend at [http://localhost:5173](http://localhost:5173)
2. Enter prompt: `Write a tweet about today’s weather`
3. Select **Weather** from dropdown.
4. Click **Run Workflow**.

**Backend process:**

* AI → *“Perfect day to chill outside!”*
* Weather API → *“Sunny in Delhi, 31°C”*
* Final → *“Perfect day to chill outside! Sunny in Delhi, 31°C #weather”*

Result is shown on UI. If DB configured, it’s saved and visible under **History**.

---

## 🛠 Tech Stack

* **Backend**: Node.js, Express, OpenAI API, Axios
* **Frontend**: React 18, Vite
* **Database**: Postgres (optional)

---

## 📦 API Endpoints

### `POST /api/run-workflow`

Run workflow.

```json
{
  "prompt": "Write a tweet about today’s weather",
  "action": "weather"
}
```

Response:

```json
{
  "ai_response": "It’s a great day to be outside!",
  "api_response": "Sunny in Delhi, 32°C",
  "final_result": "It’s a great day to be outside! Sunny in Delhi, 32°C #weather"
}
```

### `GET /api/history`

Fetch last 10 runs (if DB configured).

---

## 📝 Notes

* If no **Huggingface API key**, backend returns a **mock AI response**.
* Weather uses **Goa** as default city (can be customized in `weather.js`).
* GitHub API is rate-limited if unauthenticated.

---
