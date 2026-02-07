const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ❌ No Authorization header
  if (!authHeader) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  // ❌ Not Bearer format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  // ✅ Extract token
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id; // or decoded._id based on your login payload
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
