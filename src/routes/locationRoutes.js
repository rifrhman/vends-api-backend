const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");

router.post("/", authenticate, createLocation);
router.get("/", authenticate, getLocations);
router.get("/:id", authenticate, getLocationById);
router.put("/:id", authenticate, updateLocation);
router.delete("/:id", authenticate, deleteLocation);

module.exports = router;
