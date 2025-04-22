const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router
  .post("/assign-role", verifyToken, isAdmin, userController.assignRoleToUser)
  .get("/get-users", verifyToken, isAdmin, userController.getAllUsers);

module.exports = router;
