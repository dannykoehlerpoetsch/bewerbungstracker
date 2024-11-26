import User from "../models/User.js";
import { generateToken } from "../middleware/jwt.js";

export async function register(req, res) {
  try {
    const { email, username } = req.body;
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "Benutzername oder Email bereits vorhanden!" });
    }

    const newUser = await User.create(req.body);
    res.status(201).json({ msg: "Benutzer wurde erstellt", newUser });
  } catch (err) {
    // Fehlerbehandlung für Validierungsfehler (z.B. bei Mongoose-Validierungen)
    if (err.name === "ValidationError") {
      const errorMessages = [];
      for (let field in err.errors) {
        errorMessages.push({
          field: field,
          message: err.errors[field].message,
        });
      }
      return res.status(400).json({
        message: "Validierungsfehler",
        errors: errorMessages,
      });
    }

    // Falls der Fehler kein Validierungsfehler ist, gib einen allgemeinen Fehler aus

    return res.status(500).json({ msg: "Server Fehler!" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }); // so ist es egal ob Groß- oder Kleinbuchstaben vom User kommen

    if (!user) {
      return res.status(404).json({ error: "Benutzer nicht gefunden!" });
    }

    const passwordMatch = await user.isValidPassword(password); // Funktion aus User-Model

    if (!passwordMatch) {
      return res.status(401).json({ error: "falsches Passwort" });
    }

    const token = generateToken(user._id); // Funktion nimmt den String entgegen, siehe Funktionsaufbau in jwt.js (dort Argument-Übergabe als Objekt vorbereitet)
    res
      .status(200)
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true, // muss in der Entwicklung false sein, in der produktion true
        path: "/", // Cookie auf allen Unterseiten zugänglich machen
        maxAge: 60 * 60 * 1000, // 1h
      })
      .json({
        msg: "Anmeldung erfolgreich",
        user: user.username,
        token, // macht den usernamen im Frontend zugänglich
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Fehler!" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "none",
      path: "/",
      secure: true,
    });
    res.status(200).json({ msg: "Logout erfolgreich" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Fehler!" });
  }
}

export async function verifyToken(req, res) {
  res.status(200).json({ msg: "Token ist valid!", user: req.user }); // die Route prüft beim einloggen vorab, ob der Nutzer noch einen gültigen Token hat - die Funktion aus der Middleware muss diese Route schützen
}
