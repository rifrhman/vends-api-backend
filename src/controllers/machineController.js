const Machine = require("../models/machineModel");

const createMachine = async (req, res) => {
  const { name, type, status } = req.body;
  const updated_by = req.user.id; // get user from token jwt

  if (!name || !type || !status) {
    return res.status(400).json({
      status: "failed",
      message: "Field cannot be empty",
    });
  }

  Machine.create(name, type, status, updated_by, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        message: "Failed to add new Machine",
        error: err,
      });
    }

    res.status(201).json({
      status: "success",
      message: "Successfully add new machine",
      data: {
        id: result.insertId,
        name,
        type,
        status,
        updated_by,
      },
    });
  });
};

const getMachines = async (req, res) => {
  Machine.getAll((err, result) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        message: "Failed get all machines",
        error: err,
      });
    }
    const dataMachines = result;

    res.status(200).json({
      status: "success",
      message: "Successfully get all machines",
      data: dataMachines,
    });
  });
};

const getMachineById = async (req, res) => {
  const { id } = req.params;

  Machine.getById(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        message: "Failed get Machine data",
        error: err,
      });
    }
    if (result.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Machine is not found",
      });
    }
    const dataMachine = result[0];

    res.status(200).json({
      status: "success",
      message: "Successfully get machine",
      data: dataMachine,
    });
  });
};

const updateMachine = async (req, res) => {
  const { id } = req.params;
  const { name, type, status } = req.body;
  const updated_by = req.user.id;

  if (!name || !type || !status) {
    return res.status(400).json({
      status: "failed",
      message: "Field cannot be empty",
    });
  }

  Machine.update(id, name, type, status, updated_by, (err, result) => {
    if (err)
      return res.status(500).json({
        status: "failed",
        message: "Failed to updated machines",
        error: err,
      });
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Machine is not found",
      });
    }
    Machine.getById(id, (err, updatedMachine) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: "Failed to get updated machine data",
          error: err,
        });
      }
      res.status(200).json({
        status: "success",
        message: "Successfully updated Machine",
        data: updatedMachine,
      });
    });
  });
};

const deletedMachine = async (req, res) => {
  const { id } = req.params;

  Machine.delete(id, (err, result) => {
    if (err)
      return res.status(500).json({
        status: "failed",
        message: "Failed to deleted machines",
        error: err,
      });
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Machine is not found",
      });
    }

    res.json({
      status: "success",
      message: "Successfully Deleted Machine",
    });
  });
};

module.exports = {
  createMachine,
  getMachines,
  getMachineById,
  updateMachine,
  deletedMachine,
};
