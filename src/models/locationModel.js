const db = require("../config/database");

const Location = {
  findOne(criteria) {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM locations WHERE ";
      const values = [];
      let conditions = [];

      for (const key in criteria) {
        conditions.push(`${key} = ?`);
        values.push(criteria[key]);
      }

      query += conditions.join(" AND ");

      db.query(query, values, (err, results) => {
        if (err) reject(err);
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(null);
        }
      });
    });
  },

  create(machine_id, location_name, address, city, updated_by) {
    return new Promise((resolve, reject) => {
      const quer =
        "INSERT INTO locations (machine_id, location_name, address, city, updated_by) VALUES (?, ?, ?, ?, ?)";
      db.query(
        quer,
        [machine_id, location_name, address, city, updated_by],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        },
      );
    });
  },
  getAll() {
    return new Promise((resolve, reject) => {
      const quer = `SELECT l.*, m.name AS machine_name, u.username AS updated_by_name
      FROM locations l
      JOIN machines m ON l.machine_id = m.id
      JOIN users u ON l.updated_by = u.id`;
      db.query(quer, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  getById(id) {
    return new Promise((resolve, reject) => {
      const quer = `SELECT l.id, l.location_name, l.address, l.city, l.updated_at,
      m.name AS machine_name, u.username AS updated_by_name
      FROM locations l
      JOIN machines m ON l.machine_id = m.id
      JOIN users u ON l.updated_by = u.id WHERE l.id = ?`;
      db.query(quer, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  update(id, location_name, address, city, updated_by) {
    return new Promise((resolve, reject) => {
      const quer =
        "UPDATE locations SET location_name = ?, address = ?, city = ?, updated_by = ? WHERE id = ?";
      db.query(
        quer,
        [location_name, address, city, updated_by, id],
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        },
      );
    });
  },
  delete(id) {
    return new Promise((resolve, reject) => {
      const quer = "DELETE FROM locations WHERE id = ?";
      db.query(quer, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = Location;
