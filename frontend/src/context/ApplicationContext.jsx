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
        const endpoint = "/bewerbungen";

        const params = {
          status: filterStatus,
          sortField: sortField,
          sortOrder: sortOrder,
          companyName: searchTerm,
        };

        const res = await api.get(endpoint, { params });

        if (Array.isArray(res.data)) {
          setApplications(res.data);
        } else {
          console.error("Erwartete Datenstruktur nicht erhalten:", res.data);
        }
      } catch (err) {
        return;
      }
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
