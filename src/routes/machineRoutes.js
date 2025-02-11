const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const {
  createMachine,
  getMachines,
  getMachineById,
  updateMachine,
  deletedMachine,
} = require("../controllers/machineController");

router.post("/", authenticate, createMachine);
router.get("/", authenticate, getMachines);
router.get("/:id", authenticate, getMachineById);
router.put("/:id", authenticate, updateMachine);
router.delete("/:id", authenticate, deletedMachine);

module.exports = router;
