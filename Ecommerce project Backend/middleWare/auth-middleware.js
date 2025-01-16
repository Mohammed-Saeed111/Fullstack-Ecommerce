
const jwt = require("jsonwebtoken");

// التحقق من التوكن
function verifyToken(req, res, next) {
  let token = req.header("Authorization");

  // التحقق من وجود التوكن
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trim();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret");
    req.user = decoded; 
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
}

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    next(); 
  } else {
    return res.status(403).json({ error: "Forbidden: Admins only" });
  }
}

module.exports = { verifyToken, isAdmin };
