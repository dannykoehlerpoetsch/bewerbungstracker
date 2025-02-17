import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

import Header from "./components/Header/Header.jsx";
import Main from "./pages/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";
import Cookiebanner from "./components/CookieBanner/Cookiebanner.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useAuth();

  return (
    <div className="app-wrapper">
      <ToastContainer />
      <Cookiebanner />
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
