CREATE TABLE IF NOT EXISTS workflow_runs (
  id SERIAL PRIMARY KEY,
  prompt TEXT NOT NULL,
  action TEXT NOT NULL,
  ai_response TEXT,
  api_response TEXT,
  final_result TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);