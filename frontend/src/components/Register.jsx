import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { registration } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Die Passwörter stimmen nicht überein." });
      return;
    }
    try {
      // Verwendung der register-Funktion aus dem AuthContext
      await registration(formData.username, formData.email, formData.password);
    } catch (err) {
      // Prüfen, ob globale und/oder spezifische Fehler vorliegen
      if (err.fieldErrors && err.fieldErrors.length > 0) {
        const backendErrors = err.fieldErrors.reduce((acc, curr) => {
          acc[curr.field] = curr.message;
          return acc;
        }, {});
        setErrors(backendErrors); // Spezifische Fehler setzen
      }
      if (err.globalMsg) {
        setGlobalError(err.globalMsg); // Globalen Fehler setzen
      }
    }
  };

  return (
    <div className="login-form register-form">
      <h2>Registrierung</h2>
      <form onSubmit={handleSubmit}>
        {globalError && <p className="error">{globalError}</p>}{" "}
        {/* Globale Fehler anzeigen */}
        <div>
          <label>
            Vollständiger Name:
            {errors.username && <p>{errors.username}</p>}
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            E-Mail:
            {errors.email && <p>{errors.email}</p>}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="input-wrapper">
          <label>
            Passwort:
            {errors.password && <p>{errors.password}</p>}
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i
              className="password-toggle"
              title="Passwort anzeigen / verbergen"
              onClick={() => {
                setShowPassword((prevState) => !prevState);
              }}
            >
              {" "}
              {showPassword ? "🔏" : "👀"}
            </i>
          </label>
        </div>
        <div className="input-wrapper">
          <label>
            Passwort bestätigen:
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <i
              className="password-toggle"
              title="Passwort anzeigen / verbergen"
              onClick={() => {
                setShowPassword((prevState) => !prevState);
              }}
            >
              {" "}
              {showPassword ? "🔏" : "👀"}
            </i>
          </label>
        </div>
        <button type="submit" className="login-btn">
          Registrieren
        </button>
      </form>
    </div>
  );
};

export default Register;
