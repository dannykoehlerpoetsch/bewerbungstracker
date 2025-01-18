import React, { useContext } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import style from "./ApplicationListed.module.css"; // CSS-Module importieren
import DownloadButton from "../DownloadButton";
import { useAuth } from "../../context/AuthContext";

export default function ApplicationListed() {
  const { isAuthenticated } = useAuth();
  const { applications } = useContext(ApplicationContext);

  const getStatusColor = (status) => {
    switch (status) {
      case "Offen":
        return style.statusGreen;
      case "Absage":
        return style.statusRed;
      case "In Bearbeitung":
        return style.statusBlue;
      default:
        return style.statusDefault;
    }
  };

  const today = new Date().toLocaleDateString("de-DE");

  return (
    <section className={style.applicationListWrapper}>
      <DownloadButton />
      <p className={style.today}>Heute ist der {today}</p>
      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead className={style.tableHead}>
            <tr>
              <th>Nr.</th>
              <th>Datum</th>
              <th>Unternehmen</th>
              <th>Status</th>
              <th>Ansprechpartner</th>
              <th>Kommentar</th>
            </tr>
          </thead>
          <tbody className={style.tableBody}>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>{new Date(app.date).toLocaleDateString()}</td>
                <td>{app.companyName}</td>
                <td className={getStatusColor(app.status)}>{app.status}</td>
                <td>{app.contact}</td>
                <td>{app.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
