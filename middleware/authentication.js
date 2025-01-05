const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRETKEY



// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader;
    console.log(token,"token",SECRET_KEY)
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token", token:token });
      }

      req.user = user; // Add user information to request
      next();
    });
  } else {
    res.status(401).json({ message: "Authorization token required" });
  }
};


module.exports = authenticateJWT;