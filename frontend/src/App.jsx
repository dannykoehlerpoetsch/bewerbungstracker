import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import AddApplication from "./components/AddApplication.jsx";
import DetailsOrList from "./components/DetailsOrList.jsx";
import Navigation from "./components/Navigation.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./components/Home.jsx";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useAuth();

  return (
    <>
      <ToastContainer />
      <Navigation />
      <div className="container">
        <h1 className="heading">Bewerbungs-Tracker</h1>
        <span className="dakopo">by DaKoPo</span>
        {user && (
          <p className="logged-user">
            eingeloggt als: <span> {user}</span>
          </p>
        )}

        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addapplication"
            element={
              <ProtectedRoute>
                <AddApplication />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <DetailsOrList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
