import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import AddApplication from "../AddApplication/AddApplication";
import DetailsOrList from "../ViewApplication/DetailsOrList";
import ProtectedRoute from "../../components/ProtectedRoute";
import BackToTop from "../../components/BackToTop/BackToTop";
import styles from "./Main.module.css";

export default function Main() {
  return (
    <main className={styles.main}>
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
      <BackToTop />
    </main>
  );
}
