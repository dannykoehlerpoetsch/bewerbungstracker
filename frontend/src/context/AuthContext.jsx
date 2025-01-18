import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const verifyAuth = async () => {
    try {
      const response = await api.get("/user/verify-token", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error(
        "Token verification failed:",
        error.response?.data || error.message
      );
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post(
        "/user/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsAuthenticated(true);
        toast.success(`Ẁillkommen, ${response.data.user}!`);
        setUser(response.data.user);
        Cookies.set("jwt", response.data.token);
        navigate("/applications", { replace: true });
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error("Login fehlgeschlagen. Bitte überprüfe deine Zugangsdaten.");
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      const response = await api.post("/user/logout");
      if (response.status === 200) {
        Cookies.remove("jwt", { path: "/" });

        setIsAuthenticated(false);
        navigate("/");
        setUser(null);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        toast.success("Bis bald!");
      }
    } catch (error) {
      console.log("Fehler beim Logout:", error);
    }
  };

  const registration = async (username, email, password) => {
    try {
      const response = await api.post("/user/register", {
        username,
        email,
        password,
      });
      if (response.status === 201) {
        toast.success("Erfolgreich registriert!");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      toast.error("Registrierung fehlgeschlagen. Bitte versuche es erneut.");
      const globalMsg =
        error.response?.data?.msg || "Ein unbekannter Fehler ist aufgetreten.";
      const fieldErrors = error.response?.data?.errors || [];

      throw {
        globalMsg,
        fieldErrors,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        registration,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
