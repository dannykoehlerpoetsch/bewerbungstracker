import React from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const DownloadButton = () => {
  const { user } = useAuth();
  const handleDownload = async () => {
    try {
      const response = await api.get("/pdf/download-pdf", {
        responseType: "blob", // Wichtig: Wir erwarten eine Binärdatei
      });

      // PDF-Datei als Blob verarbeiten
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${user}_bewerbungen.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Fehler beim Herunterladen der PDF:", error);
    }
  };

  return (
    <button onClick={handleDownload} className="download-btn">
      Bewerbungen herunterladen
    </button>
  );
};

export default DownloadButton;
