import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Der Benutzername muss mindestens 3 Zeichen lang sein!"],
    maxlength: [20, "Der Benutzername darf maximal 20 Zeichen lang sein!"],
    validate: {
      validator: function (v) {
        // Erlaubt alphanumerische Zeichen, Leerzeichen, Bindestriche, Punkte, @ und _
        return /^[a-zA-Z0-9\s.,;:'"-@_]+$/.test(v);
      },
      message: "Der Benutzername enthält ungültige Zeichen!",
    },
    set: function (v) {
      // Sanitizing: Entfernt unerwünschte Zeichen, aber erlaubt gültige
      return v.replace(/[^\w\s.,;:'"-@_]/g, ""); // Nur erlaubte Zeichen bleiben übrig
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Überprüft, ob die Eingabe eine gültige E-Mail-Adresse ist
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: "Die E-Mail-Adresse ist ungültig!",
    },
    set: function (v) {
      // Sanitizing: Entfernt unerwünschte Zeichen aus der E-Mail
      return v.trim().toLowerCase(); // E-Mail in Kleinbuchstaben umwandeln und Whitespace entfernen
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // Überprüft, ob das Passwort mindestens 8 Zeichen, 1 Großbuchstaben, 1 Zahl und 1 Sonderzeichen enthält
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,}$/.test(
          v
        );
      },
      message:
        "Das Passwort muss mindestens 8 Zeichen lang sein, einen Großbuchstaben, eine Zahl und ein Sonderzeichen enthalten!",
    },
  },
  applications: [{ type: Schema.Types.ObjectId, ref: "Bewerbung" }],
});

// Passwort-Hashing, bevor das Passwort gespeichert wird
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Falls das Passwort nicht geändert wurde, überspringe das Hashen
  }
  try {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Methode zum Vergleichen des eingegebenen Passworts mit dem gespeicherten Passwort
userSchema.methods.isValidPassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

// Passwort nie ans Frontend schicken!
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = model("User", userSchema);
export default User;
