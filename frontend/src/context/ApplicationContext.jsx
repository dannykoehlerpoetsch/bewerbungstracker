import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext.jsx";
import api from "../utils/api.js";

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated } = useAuth();

  const fetchApplications = async () => {
    if (isAuthenticated) {
      try {
        // Den Endpunkt /bewerbungen zur baseURL hinzufügen
        const endpoint = "/bewerbungen"; // Endpunkt für Bewerbungen

        // Query-Parameter erstellen
        const params = {
          status: filterStatus,
          sortField: sortField,
          sortOrder: sortOrder,
          companyName: searchTerm,
        };

        // Anfrage an die API mit den Parametern senden
        const res = await api.get(endpoint, { params });

        // Überprüfen, ob die Antwort eine Liste von Bewerbungen ist
        if (Array.isArray(res.data)) {
          setApplications(res.data); // Die Bewerbungen ins State setzen
        } else {
          console.error("Erwartete Datenstruktur nicht erhalten:", res.data);
        }
      } catch (err) {
        console.error("Fehler beim Laden der Bewerbungen:", err);
      }
    } else {
      console.log("Erst einloggen");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [filterStatus, sortField, sortOrder, searchTerm, isAuthenticated]);

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        fetchApplications,
        filterStatus,
        setFilterStatus,
        sortField,
        setSortField,
        sortOrder,
        setSortOrder,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
