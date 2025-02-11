const db = require("../config/database");

const Machine = {
  create(name, type, status, updated_by, callback) {
    const quer =
      "INSERT INTO machines (name, type, status, updated_by) VALUES (?,?,?,?)";
    db.query(quer, [name, type, status, updated_by], callback);
  },
  getAll(callback) {
    const quer =
      "SELECT m.*, u.username AS updated_by_name FROM machines m JOIN users u ON m.updated_by = u.id";
    db.query(quer, callback);
  },
  getById(id, callback) {
    const quer = "SELECT * FROM machines WHERE id = ?";
    db.query(quer, [id], callback);
  },
  update(id, name, type, status, updated_by, callback) {
    const quer =
      "UPDATE machines SET name = ?, type = ?, status = ?, updated_by = ? WHERE id = ?";
    db.query(quer, [name, type, status, updated_by, id], callback);
  },
  delete(id, callback) {
    const quer = "DELETE FROM machines WHERE id = ?";
    db.query(quer, [id], callback);
  },
};

module.exports = Machine;
