import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkflowForm from "./components/WorkflowForm";
import HistoryList from "./components/HistoryList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkflowForm />} />
        <Route path="/history" element={<HistoryList />} />
      </Routes>
    </Router>
  );
}

export default App;
