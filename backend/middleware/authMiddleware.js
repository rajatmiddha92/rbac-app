const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");

const secretKey = process.env.SECRET_KEY; // Replace with a strong, environment-specific key

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
};

const authorize = (permissions) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.userId).populate("role");
      if (!user || !user.role) {
        return res.status(403).json({ message: "User or role not found" });
      }

      const userPermissions = user.role.permissions || [];
      const hasPermission = permissions.every((permission) =>
        userPermissions.includes(permission)
      );

      if (!hasPermission) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      next();
    } catch (error) {
      console.error("Authorization error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  } catch (error) {
    console.error("Admin check error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { verifyToken, authorize, isAdmin };
