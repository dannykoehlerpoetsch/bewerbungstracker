import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./Form.module.css"; // Das gemeinsame CSS-Modul importieren

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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      await registration(formData.username, formData.email, formData.password);
    } catch (err) {
      if (err.fieldErrors && err.fieldErrors.length > 0) {
        const backendErrors = err.fieldErrors.reduce((acc, curr) => {
          acc[curr.field] = curr.message;
          return acc;
        }, {});
        setErrors(backendErrors);
      }
      if (err.globalMsg) {
        setGlobalError(err.globalMsg);
      }
    }
  };

  const isFormValid =
    formData.username &&
    formData.email &&
    formData.password &&
    formData.confirmPassword === formData.password;

  return (
    <section className={styles.container}>
      <div className={styles.form}>
        <h2>Registrierung</h2>
        <form onSubmit={handleSubmit}>
          {globalError && <p className={styles.error}>{globalError}</p>}
          <div className={styles.formGroup}>
            <label htmlFor="username">Vollständiger Name:</label>
            {errors.username && (
              <p className={styles.error}>{errors.username}</p>
            )}
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">E-Mail:</label>
            {errors.email && <p className={styles.error}>{errors.email}</p>}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Passwort:</label>
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                title={
                  showPassword ? "Passwort verbergen" : "Passwort anzeigen"
                }
              >
                {showPassword ? "🔒" : "👁"}
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Passwort bestätigen:</label>
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword}</p>
            )}
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                title={
                  showConfirmPassword
                    ? "Passwort verbergen"
                    : "Passwort anzeigen"
                }
              >
                {showConfirmPassword ? "🔒" : "👁"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isFormValid}
          >
            Registrieren
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
