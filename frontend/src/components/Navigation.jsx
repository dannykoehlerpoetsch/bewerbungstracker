import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // AuthContext importieren

export default function Navigation() {
  const { isAuthenticated, logout } = useAuth(); // Zugriff auf den AuthContext

  return (
    <nav className="nav">
      <ul className="navList">
        {isAuthenticated ? (
          // Links für eingeloggte Benutzer
          <>
            <li className="navList-item">
              <NavLink to="/" className="navLink">
                Startseite
              </NavLink>
            </li>
            <li className="navList-item">
              <NavLink to="/addapplication" className="navLink">
                Bewerbung hinzufügen
              </NavLink>
            </li>
            <li className="navList-item">
              <NavLink to="/applications" className="navLink">
                Meine Bewerbungen
              </NavLink>
            </li>
            <li className="navList-item">
              <button onClick={logout} className="navLink logout">
                Logout
              </button>
            </li>
          </>
        ) : (
          // Links für nicht eingeloggte Benutzer
          <>
            <li className="navList-item">
              <NavLink to="/" className="navLink">
                Startseite
              </NavLink>
            </li>
            <li className="navList-item">
              <NavLink to="/register" className="navLink">
                Registrieren
              </NavLink>
            </li>
            <li className="navList-item">
              <NavLink to="/login" className="navLink">
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
