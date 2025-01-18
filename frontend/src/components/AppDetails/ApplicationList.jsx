import React, { useState, useEffect, useContext } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import { PencilSimple, Check, Trash } from "@phosphor-icons/react";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import styles from "./ApplicationList.module.css";
import DownloadButton from "../DownloadButton";
import { toast } from "react-toastify";

const ApplicationList = () => {
  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState({});
  const [editedData, setEditedData] = useState({});

  const {
    applications,
    fetchApplications,
    filterStatus,
    sortField,
    sortOrder,
    searchTerm,
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

  const toggleEditMode = (id) => {
    setEditMode((prev) => ({ ...prev, [id]: !prev[id] }));
    setEditedData((prev) => ({
      ...prev,
      [id]: applications.find((app) => app._id === id),
    }));
  };

  const handleSave = async (id) => {
    try {
      const { status, comments } = editedData[id];
      const response = await api.put(`/bewerbungen/${id}`, {
        status,
        comments,
      });
      if (response.status === 200) {
        toast.success("Bewerbung erfolgreich aktualisiert");
        fetchApplications();
        setEditMode((prev) => ({ ...prev, [id]: false }));
      }
    } catch (err) {
      toast.error("Fehler beim Speichern:", err);
    }
  };

  const handleInputChange = (id, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Möchten Sie diese Bewerbung wirklich löschen? Dieser Vorgang kann nicht rückgängig gemacht werden."
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await api.delete(`/bewerbungen/${id}`);
      if (response.status === 200) {
        toast.success("Bewerbung erfolgreich gelöscht");
        fetchApplications();
      }
    } catch (err) {
      toast.error("Fehler beim Löschen:", err);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [applications, filterStatus, sortField, sortOrder, searchTerm]);

  if (loading) {
    return <p>Lade Bewerbungen...</p>;
  }

  return (
    <section className={styles.wrapper}>
      <DownloadButton />
      {applications.length > 0 ? (
        applications.map((app) => (
          <div key={app._id} className={styles.applicationCard}>
            <p>
              <strong>Datum: </strong> {new Date(app.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Unternehmen: </strong> {app.companyName}
            </p>
            <p>
              <strong>Ansprechpartner: </strong> {app.contact}
            </p>
            <p>
              <strong>Jobtitel: </strong> {app.jobTitle}
            </p>
            <p>
              <strong>Gefunden bei: </strong> {app.foundAt}
            </p>
            <p>
              <strong>Beworben über: </strong> {app.appliedVia}
            </p>
            <p>
              <strong>Status:</strong>
              {editMode[app._id] ? (
                <select
                  className={styles.select}
                  value={editedData[app._id]?.status || app.status}
                  onChange={(e) =>
                    handleInputChange(app._id, "status", e.target.value)
                  }
                >
                  <option value="Offen">Offen</option>
                  <option value="Absage">Absage</option>
                  <option value="In Bearbeitung">In Bearbeitung</option>
                </select>
              ) : (
                <span
                  className={styles.status}
                  style={{ backgroundColor: getStatusColor(app.status) }}
                >
                  {app.status}
                </span>
              )}
            </p>
            <p>
              <strong>Kommentare:</strong>
              {editMode[app._id] ? (
                <textarea
                  className={styles.textarea}
                  rows={5}
                  value={editedData[app._id]?.comments || app.comments}
                  onChange={(e) =>
                    handleInputChange(app._id, "comments", e.target.value)
                  }
                />
              ) : (
                <span>{app.comments}</span>
              )}
            </p>
            <div className={styles.actionButtons}>
              {editMode[app._id] ? (
                <button
                  className={styles.saveButton}
                  onClick={() => handleSave(app._id)}
                  title="Speichern"
                >
                  <Check size={18} color="#41fb28" />
                </button>
              ) : (
                <button
                  className={styles.editButton}
                  onClick={() => toggleEditMode(app._id)}
                  title="Bearbeiten"
                >
                  <PencilSimple size={18} color="white" />
                </button>
              )}
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(app._id)}
                title="Löschen"
              >
                <Trash size={20} color="crimson" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Keine Bewerbungen gefunden.</p>
      )}
    </section>
  );
};

export default ApplicationList;
