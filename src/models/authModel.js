const db = require("../config/database");

const User = {
  create(username, hashPassword, callback) {
    const quer = "INSERT INTO users (username,password) VALUES (?,?)";
    db.query(quer, [username, hashPassword], callback);
  },
  findByUsername(username, callback) {
    const quer = "SELECT * FROM users WHERE username = ?";
    db.query(quer, [username], callback);
  },
};

module.exports = User;
