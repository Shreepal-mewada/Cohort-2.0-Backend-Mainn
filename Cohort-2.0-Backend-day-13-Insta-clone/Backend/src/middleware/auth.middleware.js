const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userrr = decoded;
  next();
}
module.exports = authMiddleware;