import { useState, useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import api from "../utils/api"; // Importiere die konfigurierte Axios-Instanz
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const AddApplication = () => {
  const { isAuthenticated } = useAuth();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    date: "",
    companyName: "",
    jobTitle: "",
    foundAt: "",
    appliedVia: "",
    status: "Offen",
    comments: "",
    contact: "",
  });

  const { applications, fetchApplications } = useContext(ApplicationContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verwende die instanziierte `api` von api.js
      const res = await api.post("/bewerbungen", formData);

      if (res.status === 201) {
        toast.success("Bewerbung erfolgreich hinzugefügt");
        setFormData({
          date: "",
          companyName: "",
          jobTitle: "",
          foundAt: "",
          appliedVia: "",
          status: "Offen",
          comments: "",
          contact: "",
        });
        fetchApplications(); // Bewerbungen neu abrufen
      } else {
        throw new Error("Fehler beim Hinzufügen der Bewerbung");
      }
    } catch (err) {
      if (err.response && err.response.data.errors) {
        // Fehlerbehandlung - Setze die Fehler im State
        const backendErrors = err.response.data.errors.reduce((acc, curr) => {
          acc[curr.field] = curr.message;
          return acc;
        }, {});
        setErrors(backendErrors);
      } else {
        console.error("Fehler beim Senden der Bewerbung:", err);
      }
    }
  };

  return (
    <>
      <h2 className="addAppHeading">Neue Bewerbung hinzufügen</h2>
      <p className="application-count">
        Bisher erfasste Bewerbungen: <span>{applications.length}</span>
      </p>

      <form onSubmit={handleSubmit} className="application-form">
        <div className="formdata">
          <label>
            Datum:
            {errors.date && <p>{errors.date}</p>}
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Unternehmen:
            {errors.companyName && <p>{errors.companyName}</p>}
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Unternehmen"
              required
            />
          </label>
          <label>
            Jobtitel:
            {errors.jobTitle && <p>{errors.jobTitle}</p>}
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Jobtitel"
              required
            />
          </label>
          <label>
            Gefunden bei:
            {errors.foundAt && <p>{errors.foundAt}</p>}
            <input
              type="text"
              name="foundAt"
              value={formData.foundAt}
              onChange={handleChange}
              placeholder="Indeed, Stepstone, LinkedIn..."
            />
          </label>
          <label>
            Beworben via:
            {errors.appliedVia && <p>{errors.appliedVia}</p>}
            <input
              type="text"
              name="appliedVia"
              value={formData.appliedVia}
              onChange={handleChange}
              placeholder="Homepage, LinkedIn, Indeed..."
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Offen">Offen</option>
              <option value="Absage">Absage</option>
              <option value="In Bearbeitung">In Bearbeitung</option>
            </select>
          </label>
          <label>
            Ansprechpartner:
            {errors.contact && <p>{errors.contact}</p>}
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Ansprechpartner"
            />
          </label>
          <label>
            Kommentar:
            {errors.comments && <p>{errors.date}</p>}
            <input
              type="text"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Kommentare"
            />
          </label>
        </div>
        <button type="submit">Hinzufügen</button>
      </form>
    </>
  );
};

export default AddApplication;