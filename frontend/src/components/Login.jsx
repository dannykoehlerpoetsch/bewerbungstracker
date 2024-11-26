import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verwendung der login-Funktion aus dem AuthContext
      await login(formData.email, formData.password);
    } catch (err) {
      setError("Fehler beim Login. Überprüfe deine Anmeldedaten.");
      toast.error("Fehler beim Login. Überprüfe deine Anmeldedaten.");
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            E-Mail:
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
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="password-input"
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

        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-btn">
          Einloggen
        </button>
      </form>
    </div>
  );
};

export default Login;
