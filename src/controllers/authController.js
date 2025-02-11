const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/authModel");

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: "failed",
      message: "Username or Password are required",
    });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10);

    User.create(username, hashPassword, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          message: "Fail to create a user",
          error: err,
        });
      }
      res.status(201).json({
        status: "success",
        message: "Registered Successfully!",
        user: {
          id: result.insertId,
          username,
          password: hashPassword,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
      error: err,
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: "failed",
      message: "Username or Password are required",
    });
  }

  try {
    User.findByUsername(username, async (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "Error",
          message: "Server running Error",
          error: err,
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          status: "Failed",
          message: "Invalid Credentials",
        });
      }

      const user = result[0];

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          status: "Failed",
          message: "Invalid Credentials",
        });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" },
      );

      res.status(200).json({
        status: "success",
        message: "Login Successfully!",
        data: {
          username,
          token,
        },
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
      error: err,
    });
  }
};

module.exports = { register, login };
