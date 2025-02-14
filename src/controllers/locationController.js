const Location = require("../models/locationModel");

const createLocation = async (req, res) => {
  const { machine_id, location_name, address, city } = req.body;
  const updated_by = req.user.id;

  if (!machine_id || !location_name || !address || !city) {
    return res.status(500).json({
      status: "failed",
      message: "Field cannot be empty",
    });
  }

  try {
    const existingLocation = await Location.findOne({
      machine_id: machine_id,
    });

    if (existingLocation) {
      return res.status(400).json({
        status: "failed",
        message: "This machine has another location",
      });
    }

    const result = await Location.create(
      machine_id,
      location_name,
      address,
      city,
      updated_by,
    );
    res.status(201).json({
      status: "success",
      message: "Successfully added new location",
      data: {
        id: result.insertId,
        location_name: location_name,
        address: address,
        city: city,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Server Error!",
      error: error,
    });
  }
};

const getLocations = async (req, res) => {
  try {
    const result = await Location.getAll();
    const dataMachines = result;

    res.status(200).json({
      status: "success",
      message: "Successfully get all machines",
      data: dataMachines,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Failed get all machines",
      error: err,
    });
  }
};

const getLocationById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Location.getById(id);
    if (result.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Location is not found",
      });
    }

    const dataLocation = result[0];

    res.status(200).json({
      status: "success",
      message: "Successfully get data location",
      data: dataLocation,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Location cannot be updated",
      error: error,
    });
  }
};

const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { location_name, address, city } = req.body;
  const updated_by = req.user.id;

  if (!location_name || !address || !city) {
    return res.status(500).json({
      status: "failed",
      message: "Field cannot be empty",
    });
  }

  try {
    const result = await Location.update(
      id,
      location_name,
      address,
      city,
      updated_by,
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Location is not found",
      });
    }

    const updatedLocation = await Location.getById(id);
    res.status(200).json({
      status: "success",
      message: "Successfully updated data location",
      data: updatedLocation,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Location cannot be update",
      error: error,
    });
  }
};

const deleteLocation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Location.delete(id);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Location is not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully deleted location",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Location cannot be deleted",
      error: error,
    });
  }
};

module.exports = {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
