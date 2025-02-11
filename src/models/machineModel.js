const db = require("../config/database");

const Machine = {
  create(name, type, status, updated_by, callback) {
    const quer =
      "INSERT INTO machines (name, type, status, updated_by) VALUES (?,?,?,?)";
    db.query(quer, [name, type, status, updated_by], callback);
  },
};
