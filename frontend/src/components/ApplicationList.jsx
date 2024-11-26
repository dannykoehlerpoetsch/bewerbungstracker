import React, { useState, useEffect, useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import FilterSortPanel from "./FilterSortPanel";
import api from "../utils/api"; // Importiere die konfigurierte Axios-Instanz
import { useAuth } from "../context/AuthContext";

const ApplicationList = () => {
  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);
  const {
    applications,
    fetchApplications,
    filterStatus,
    sortField,
    sortOrder,
    searchTerm,
    setSearchTerm,
  } = useContext(ApplicationContext);

  const getStatusColor = (status) => {
    switch (status) {
      case "Offen":
        return "darkgreen";
      case "Absage":
        return "red";
      case "In Bearbeitung":
        return "blue";
      default:
        return "white";
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Verwende die instanziierte `api` von api.js
      await api.put(`/bewerbungen/${id}`, {
        status: newStatus,
      });
      fetchApplications(); // Bewerbungen neu abrufen
    } catch (err) {
      console.error("Fehler beim Ändern des Status:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Verwende die instanziierte `api` von api.js
      await api.delete(`/bewerbungen/${id}`);
      fetchApplications(); // Bewerbungen neu abrufen
    } catch (err) {
      console.error("Fehler beim Löschen der Bewerbung:", err);
    }
  };

  const handleCommentChange = async (id, newComment) => {
    try {
      // Verwende die instanziierte `api` von api.js
      await api.put(`/bewerbungen/${id}`, {
        comments: newComment,
      });
      fetchApplications(); // Bewerbungen neu abrufen
    } catch (err) {
      console.error("Fehler beim Ändern des Kommentars:", err);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [applications, filterStatus, sortField, sortOrder, searchTerm]);

  if (loading) {
    return <p>Lade Bewerbungen...</p>;
  }

  return (
    <div className="applicationList-wrapper">
      <p className="application-count">
        Bisher erfasste Bewerbungen: <span>{applications.length}</span>
      </p>
      <FilterSortPanel />
      <input
        type="text"
        placeholder="Unternehmen suchen..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchbar"
      />
      {applications.length > 0 ? (
        applications.map((app) => (
          <div key={app._id} className="application-list">
            <p>
              <strong>Datum:</strong> {new Date(app.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Unternehmen:</strong> {app.companyName}
            </p>
            <p>
              <strong>Ansprechpartner:</strong> {app.contact}
            </p>
            <p>
              <strong>Jobtitel:</strong> {app.jobTitle}
            </p>
            <p>
              <strong>Gefunden bei:</strong> {app.foundAt}
            </p>
            <p>
              <strong>Beworben über:</strong> {app.appliedVia}
            </p>
            <p>
              <strong>Status:</strong>
              <select
                style={{
                  backgroundColor: getStatusColor(app.status),
                  color: "white",
                  padding: "0.2rem",
                }}
                value={app.status}
                onChange={(e) => handleStatusChange(app._id, e.target.value)}
              >
                <option value="Offen">Offen</option>
                <option value="Absage">Absage</option>
                <option value="In Bearbeitung">In Bearbeitung</option>
              </select>
            </p>
            <p className="application-comment">
              <strong>Kommentare:</strong>
              <textarea
                type="text"
                rows={5}
                value={app.comments}
                onChange={(e) => handleCommentChange(app._id, e.target.value)}
                placeholder="Kommentare..."
              />
            </p>
            <button onClick={() => handleDelete(app._id)}>Löschen</button>
          </div>
        ))
      ) : (
        <p>Keine Bewerbungen gefunden.</p>
      )}
    </div>
  );
};

export default ApplicationList;
