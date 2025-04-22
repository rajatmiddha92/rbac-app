const Role = require("../models/Role");

const createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const newRole = new Role({ name, permissions });
    await newRole.save();
    res
      .status(201)
      .json({ message: "Role created successfully", role: newRole });
  } catch (error) {
    console.error("Create role error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().select("-__v"); // Exclude __v
    res.status(200).json(roles);
  } catch (error) {
    console.error("Get all roles error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createRole, getAllRoles };
