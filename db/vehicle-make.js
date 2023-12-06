const DBInstance = require('./db-instance.js');

class VehicleMake extends DBInstance {
  constructor() {
    super();
  }

  fetchAll() {
    const query = `SELECT * FROM vehicle_maker ORDER BY maker`;
    return new Promise((resolve, reject) => {
      this.db.all(query, (err, res) => {
        this.db.close();
        if (err) {
          const error = this.handleError(err);
          reject(error);
          return;
        }
        resolve(res);
      });
    });
  }

  deleteVehicleById(data) {
    const { maker_id } = data;
    const query = 'DELETE FROM vehicle_maker WHERE maker_id = ?';
    return new Promise((resolve, reject) => {
      this.db.run(query, maker_id, (err) => {
        this.db.close();
        if (err) {
          const error = this.handleError(err, maker_id);
          reject(error);
          return;
        }
        resolve({ maker_id });
      });
    });
  }

  insertVehicle(data) {
    const { maker_id, maker } = data;
    const query = 'INSERT INTO vehicle_maker(maker_id, maker) VALUES(?, ?)';
    return new Promise((resolve, reject) => {
      this.db.run(query, [maker_id, maker], (err) => {
        this.db.close();
        if (err) {
          const error = this.handleError(err, maker);
          reject(error);
          return;
        }
        resolve(data);
      });
    });
  }

  editVehicle(data) {
    const { maker_id, maker } = data;
    const query = 'UPDATE vehicle_maker SET maker = ? WHERE maker_id = ?';
    return new Promise((resolve, reject) => {
      this.db.run(query, [maker, maker_id], (err) => {
        this.db.close();
        if (err) {
          const error = this.handleError(err, maker);
          reject(error);
          return;
        }
        resolve(data);
      });
    });
  }
}

module.exports = new VehicleMake();
