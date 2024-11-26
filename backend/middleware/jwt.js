import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "1h",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const authenticateToken = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies); // Debugging
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ msg: "Nicht autorisiert" });
    }

    const decoded = verifyToken(token);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ msg: "Authentifizierung fehlgeschlagen" });
  }
};
