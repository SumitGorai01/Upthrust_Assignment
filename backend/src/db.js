const { Pool } = require('pg');
const DATABASE_URL = process.env.DATABASE_URL;
let pool = null;

if (DATABASE_URL) pool = new Pool({ connectionString: DATABASE_URL });

function isConfigured(){ 
  return !!pool; 
}

async function insertRun({ prompt, action, ai_response, api_response, final_result }){
  const sql = `INSERT INTO workflow_runs(prompt, action, ai_response, api_response, final_result) VALUES($1,$2,$3,$4,$5)`;
  await pool.query(sql, [prompt, action, ai_response, api_response, final_result]);
}

async function fetchLastRuns(limit = 10){
  const r = await pool.query('SELECT id, prompt, action, ai_response, api_response, final_result, created_at FROM workflow_runs ORDER BY created_at DESC LIMIT $1', [limit]);
  return r.rows;
}

module.exports = { isConfigured, insertRun, fetchLastRuns };