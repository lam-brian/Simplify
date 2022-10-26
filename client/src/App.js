import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Summarize from "./pages/Summarize";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import NewNote from "./pages/NewNote";
import Setting from "./pages/Setting";

function App() {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  let routes;

  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/summarize" element={<Summarize />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/setting" element={<Setting />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Navigate replace to="/summarize" />} />
        <Route path="/summarize" element={<Summarize />} />
        <Route path="/new-note" element={<NewNote />} />
      </>
    );
  }

  return (
    <Layout>
      <Routes>{routes}</Routes>
    </Layout>
  );
}

export default App;
