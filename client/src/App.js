import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Summarize from "./pages/Summarize";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Summarize />} />
      </Routes>
    </Layout>
  );
}

export default App;
