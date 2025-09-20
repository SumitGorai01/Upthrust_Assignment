import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WorkflowForm() {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("Write a tweet about today's weather");
  const [action, setAction] = useState("weather");
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const r = await fetch("http://localhost:4000/api/run-workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          action,
          city: city.trim() || undefined,
        }),
      });
      const data = await r.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2 text-center sm:text-left">
            🚀 Mini Workflow Automation
          </h1>

          <button
            className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm sm:text-base"
            onClick={() => navigate("/history")}
          >
            🕘 History
          </button>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-6xl mx-auto mt-6 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Left Column - Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Prompt */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={5}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 text-sm sm:text-base"
                />
              </div>

              {/* Action */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Action
                </label>
                <select
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 text-sm sm:text-base"
                >
                  <option value="weather">🌤️ Weather</option>
                  <option value="github">💻 GitHub</option>
                  <option value="news">📰 News</option>
                </select>
              </div>

              {/* City input - only for weather */}
              {action === "weather" && (
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city (optional)"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 text-sm sm:text-base"
                  />
                </div>
              )}

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-5 rounded-xl font-bold flex items-center justify-center gap-2 text-white shadow-md transition-colors text-sm sm:text-base ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" /> Running...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Run Workflow
                  </>
                )}
              </motion.button>
            </form>

            {/* Right Column - Result */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 sm:p-6 bg-white rounded-2xl border border-gray-200 shadow-sm"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
                📊 Result
              </h3>
              {result ? (
                result.error ? (
                  <pre className="text-red-500 bg-red-50 p-3 rounded-lg text-xs sm:text-sm">
                    {result.error}
                  </pre>
                ) : (
                  <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                    <p>
                      <span className="font-bold text-blue-600">AI:</span>{" "}
                      {result.ai_response}
                    </p>
                    <p>
                      <span className="font-bold text-green-600">API:</span>{" "}
                      {result.api_response}
                    </p>
                    <p>
                      <span className="font-bold text-purple-600">Final:</span>{" "}
                      {result.final_result}
                    </p>
                  </div>
                )
              ) : (
                <em className="text-gray-500 text-sm sm:text-base">
                  No result yet. Run a workflow!
                </em>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-12 p-5 text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs sm:text-sm border-t">
        Made with ❤️ by{" "}
        <span className="font-semibold text-white">Sumit Gorai</span>
      </footer>
    </>
  );
}
