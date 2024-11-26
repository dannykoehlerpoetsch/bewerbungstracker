import { Schema, model } from "mongoose";

// Bewerbung Schema
const BewerbungSchema = new Schema({
  date: { type: Date },
  companyName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Erlaubt alphanumerische Zeichen, Leerzeichen, Punkte, Kommas, Semikolons, Anführungszeichen, Bindestriche, @ und _
        /^[a-zA-Z0-9\s.,;:'"@_\-\u00C0-\u017F]+$/.test(v);
      },
      message: "Der Firmenname enthält ungültige Zeichen!",
    },
  },
  jobTitle: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Erlaubt alphanumerische Zeichen, Leerzeichen, Punkte, Kommas, Semikolons, Anführungszeichen, Bindestriche, @ und _
        return /^[a-zA-Z0-9\s.,;:'"@_\-\u00C0-\u017F]+$/.test(v);
      },
      message: "Der Jobtitel enthält ungültige Zeichen!",
    },
  },
  foundAt: {
    type: String,
    validate: {
      validator: function (v) {
        if (v.trim().length === 0) {
          return true; // Erlaubt leere Strings (dies ist für nicht-required Felder)
        }
        // Erlaubt alphanumerische Zeichen, Leerzeichen, Punkte, Kommas, Semikolons, Anführungszeichen, Bindestriche, @ und _
        return /^[a-zA-Z0-9\s.,;:'"@_\-\u00C0-\u017F]+$/.test(v);
      },
      message: "Der Fundort enthält ungültige Zeichen!",
    },
  },
  appliedVia: {
    type: String,
    validate: {
      validator: function (v) {
        if (v.trim().length === 0) {
          return true; // Erlaubt leere Strings (dies ist für nicht-required Felder)
        }
        // Erlaubt alphanumerische Zeichen, Leerzeichen, Punkte, Kommas, Semikolons, Anführungszeichen, Bindestriche, @ und _
        return /^[a-zA-Z0-9\s.,;:'"@_\-\u00C0-\u017F]+$/.test(v);
      },
      message: "Der Bewerbungsweg enthält ungültige Zeichen!",
    },
  },
  status: {
    type: String,
    enum: ["Offen", "Absage", "In Bearbeitung"],
  },
  comments: {
    type: String,
    maxlength: [750, "Kommentare dürfen maximal 750 Zeichen lang sein."],
    set: function (v) {
      // Entfernt alle HTML-Tags, um unsichere Inhalte zu verhindern
      return v.replace(/<[^>]*>/g, ""); // Entfernt alle Tags wie <script>, <div> etc.
    },
  },
  contact: {
    type: String,
    validate: {
      validator: function (v) {
        if (v.trim().length === 0) {
          return true; // Erlaubt leere Strings (dies ist für nicht-required Felder)
        }
        // Erlaubt alphanumerische Zeichen, Leerzeichen, Punkte, Kommas, Semikolons, Anführungszeichen, Bindestriche, @ und _
        return /^[a-zA-Z0-9\s.,;:'"@_\-\u00C0-\u017F]+$/.test(v);
      },
      message: "Der Kontakt enthält ungültige Zeichen!",
    },
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

// Bewerbung Model
const Bewerbung = model("Bewerbung", BewerbungSchema);

export default Bewerbung;
