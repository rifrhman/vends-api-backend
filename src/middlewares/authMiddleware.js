const jwt = require("jsonwebtoken");
const secretKey =
  process.env.JWT_SECRET_KEY || "MCDI20029JF20JF208J92F4298JF2894FN2N94H";

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Simpan user yang sedang login
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
