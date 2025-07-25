const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "No token, auth denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

const roleCheck = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return res.status(403).json({ msg: "Access denied" });
  next();
};

module.exports = { auth, roleCheck };
