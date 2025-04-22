const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router
  .post("/create", verifyToken, isAdmin, roleController.createRole)
  .get("/get-roles", verifyToken, isAdmin, roleController.getAllRoles);

module.exports = router;
