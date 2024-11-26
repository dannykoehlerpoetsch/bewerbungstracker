import React, { useContext, useEffect } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import FilterSortPanel from "./FilterSortPanel";
import DownloadButton from "./DownloadButton";
import { useAuth } from "../context/AuthContext";

export default function ApplicationListed() {
  const { isAuthenticated } = useAuth();
  const { applications, searchTerm, setSearchTerm } =
    useContext(ApplicationContext);
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

  const today = new Date().toLocaleDateString("de-DE");
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
      <DownloadButton />
      <p className="today">Heute ist der {today}</p>
      <table className="table">
        <thead className="tableHead">
          <tr>
            <th>Nr.</th>
            <th>Datum</th>
            <th>Unternehmen</th>
            <th>Status</th>
            <th>Ansprechpartner</th>
            <th>Kommentar</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {applications.map((app, index) => (
            <tr key={app._id}>
              <td>{index + 1}</td>
              <td>{new Date(app.date).toLocaleDateString()}</td>
              <td>{app.companyName}</td>
              <td
                style={{
                  backgroundColor: getStatusColor(app.status),
                  color: "white",
                  padding: "0.2rem",
                  textAlign: "center",
                }}
              >
                {app.status}
              </td>
              <td>{app.contact}</td>

              <td>{app.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
