import express from "express";
import PDFDocument from "pdfkit";
import Bewerbung from "../models/Application.js"; // Dein Bewerbung Model
import User from "../models/User.js";
import { authenticateToken } from "../middleware/jwt.js";

const pdfRouter = express.Router();

pdfRouter.get("/download-pdf", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId; // Achte darauf, dass du die korrekte User-ID verwendest

    // Benutzer suchen
    const username = await User.findById(userId);
    if (!username) {
      return res.status(404).json({ msg: "Benutzer nicht gefunden" });
    }

    // Bewerbungen des Users finden
    const applications = await Bewerbung.find({ owner: userId });

    if (!applications || applications.length === 0) {
      return res.status(404).json({ msg: "Keine Bewerbungen gefunden" });
    }

    // PDF-Dokument erstellen
    const doc = new PDFDocument({
      size: "A4",
      layout: "portrait",
    });

    // Header für das PDF
    doc
      .fontSize(18)
      .text(`Bewerbungen von ${username.username}`, { align: "center" });
    doc.moveDown(1); // Abstand

    doc.fontSize(14);
    let xPosition = 20; // Start x-Position
    let yPosition = 100; // Start y-Position für die erste Zeile

    // Setze die Tabellenüberschrift (alle auf der gleichen y-Position)
    const tableHeader = ["Datum", "Firma", "Jobtitel", "Status"];

    // Verschiebe die Spaltenüberschrift weiter nach links, aber auf der gleichen y-Position
    doc.text(tableHeader[0], xPosition, yPosition); // Datum
    doc.text(tableHeader[1], xPosition + 80, yPosition); // Firma
    doc.text(tableHeader[2], xPosition + 260, yPosition); // Jobtitel
    doc.text(tableHeader[3], xPosition + 440, yPosition); // Status

    // Füge danach einen Zeilenumbruch hinzu
    yPosition += 30; // Abstand zur nächsten Zeile

    // Start Y-Position
    yPosition = doc.y;

    // Bewerbungsdaten hinzufügen
    doc.fontSize(10);

    applications.forEach((app) => {
      const date = app.date ? new Date(app.date).toLocaleDateString() : "N/A";
      const company = app.companyName || "N/A";
      const jobTitle = app.jobTitle || "N/A";
      const status = app.status || "N/A";

      // Überprüfen, ob genug Platz auf der aktuellen Seite ist
      if (yPosition + 35 > doc.page.height - 50) {
        doc.addPage(); // Wenn nicht, füge eine neue Seite hinzu
        yPosition = 50; // Setze y-Position zurück, um den Inhalt oben auf der neuen Seite zu beginnen
      }

      // Datum, Firma und Jobtitel nebeneinander in der Mitte, Status ganz rechts
      doc.text(date, 20, yPosition, { width: 120, align: "left" }); // Datum
      doc.text(company, 100, yPosition, { width: 150, align: "left" }); // Firma
      doc.text(jobTitle, 280, yPosition, { width: 150, align: "left" }); // Jobtitel
      doc.text(status, 400, yPosition, { width: 100, align: "right" }); // Status rechts außen

      // Nach einer Bewerbung Y-Position anpassen (Abstand zur nächsten Zeile)
      yPosition += 35; // Kleineren Abstand nach jeder Bewerbung (15px statt 20px)
    });

    // Sende die PDF-Datei als Response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${username.username}_bewerbungen.pdf`
    );

    // Die PDF an den Client senden
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error("Fehler beim Generieren der PDF:", error);
    res.status(500).json({ msg: "Fehler beim Generieren der PDF" });
  }
});

export default pdfRouter;
