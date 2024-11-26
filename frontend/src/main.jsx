import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApplicationProvider } from "./context/ApplicationContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <ApplicationProvider>
          <App />
        </ApplicationProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
