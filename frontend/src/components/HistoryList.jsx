import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HistoryList() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const r = await fetch("http://localhost:4000/api/history");
      const j = await r.json();
      setHistory(j.history || []);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-center sm:text-left">
            🚀 Mini Workflow Automation
          </h1>
          <button
            className="px-3 sm:px-4 py-2 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-gray-100 transition-colors text-sm sm:text-base"
            onClick={() => navigate("/")}
          >
            ← Back
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full">
        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          🕘 History (Last 10 Runs)
        </h3>

        {history.length === 0 ? (
          <p className="text-gray-500 italic text-sm sm:text-base">
            No stored runs or DB not configured.
          </p>
        ) : (
          <ul className="space-y-4">
            {history.map((h) => (
              <li
                key={h.id}
                className="bg-white p-4 sm:p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        h.action === "weather"
                          ? "bg-blue-100 text-blue-800"
                          : h.action === "github"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {h.action.toUpperCase()}
                    </span>
                    <strong className="text-gray-800 text-sm sm:text-base break-words">
                      {h.final_result}
                    </strong>
                  </div>
                  <small className="text-gray-400 text-xs sm:text-sm">
                    {new Date(h.created_at).toLocaleString()}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 p-4 sm:p-5 text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs sm:text-sm border-t">
        Made with ❤️ by{" "}
        <span className="font-semibold text-white">Sumit Gorai</span>
      </footer>
    </div>
  );
}
