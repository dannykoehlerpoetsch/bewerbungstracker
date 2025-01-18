import Bewerbung from "../models/Application.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const getApplications = async (req, res) => {
  try {
    const { userId } = req;

    const {
      status,
      sortField = "date",
      sortOrder = "asc",
      companyName,
    } = req.query;

    // Basis-Filter erstellen und je nach `status` und `companyName` erweitern
    const filter = { owner: userId };

    if (status) {
      filter.status = status;
    }
    if (companyName) {
      filter.companyName = { $regex: companyName, $options: "i" }; // Teilstring-Suche, case-insensitive
    }

    // Sortieroptionen erstellen
    const sortOptions = { [sortField]: sortOrder === "asc" ? 1 : -1 };

    // Bewerbungen basierend auf Filter und Sortieroptionen abrufen
    const bewerbungen = await Bewerbung.find(filter).sort(sortOptions);

    res.json(bewerbungen);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Serverfehler");
  }
};

export const createApplication = async (req, res) => {
  try {
    const bewerbung = new Bewerbung({ ...req.body, owner: req.userId });
    await bewerbung.save();
    const user = await User.findById(req.userId);
    user.applications.push(bewerbung._id);
    //user updaten
    await user.updateOne({ applications: user.applications }, { new: true });

    res.status(201).json({ bewerbung, user });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      // Validierungsfehler abfangen
      const errorMessages = [];

      // Iteriere über alle Validierungsfehler und hole die Fehlermeldungen
      for (let field in err.errors) {
        errorMessages.push({
          field: field,
          message: err.errors[field].message,
        });
      }

      // Fehler an das Frontend zurücksenden
      return res.status(400).json({
        message: "Validierungsfehler",
        errors: errorMessages,
      });
    }

    // Allgemeine Fehlerbehandlung
    res.status(500).json({
      message: "Ein unerwarteter Fehler ist aufgetreten",
      error: err,
    });
  }
};

export const updateApplication = async (req, res) => {
  const { status, comments } = req.body;
  try {
    // Felder für die Aktualisierung zusammenstellen
    const updateFields = {};

    if (status !== undefined) {
      updateFields.status = status;
    }
    if (comments !== undefined) {
      updateFields.comments = comments;
    }

    // Bewerbung mit den relevanten Feldern aktualisieren
    const updatedBewerbung = await Bewerbung.updateOne(
      { _id: req.params.id, owner: req.userId },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedBewerbung) {
      return res
        .status(404)
        .json({ msg: "Bewerbung nicht gefunden oder keine Berechtigung" });
    }

    res.json(updatedBewerbung);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Serverfehler");
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const bewerbung = await Bewerbung.deleteOne({
      _id: req.params.id,
      owner: req.userId,
    });
    if (!bewerbung) {
      return res.status(404).json({ msg: "Bewerbung nicht gefunden" });
    }
    res.json({ msg: "Bewerbung erfolgreich gelöscht" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Serverfehler");
  }
};
