const DBInstance = require('./db-instance');

class VehicleModel extends DBInstance {
  constructor() {
    super();
  }

  fetchAll() {
    const query = 'SELECT * FROM vehicle_model ORDER BY model';
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

  fetchByMakerId(maker_id) {
    const query =
      'SELECT * FROM vehicle_model WHERE maker_id = ? ORDER BY model';
    return new Promise((resolve, reject) => {
      this.db.all(query, maker_id, (err, res) => {
        if (err) {
          const error = this.handleError(err, maker_id);
          reject(error);
          return;
        }
        resolve(res);
      });
    });
  }

  deleteModelById(data) {
    const { model_id } = data;
    const query = 'DELETE FROM vehicle_model WHERE model_id = ?';
    return new Promise((resolve, reject) => {
      this.db.run(query, model_id, (err) => {
        this.db.close();
        if (err) {
          const error = this.handleError(err, model_id);
          reject(error);
          return;
        }
        resolve(data);
      });
    });
  }

  insertModel(data, buffer) {
    const { maker_id, model_id, model } = data;
    const { maker_id: bufferId } = buffer;
    const query =
      'INSERT INTO vehicle_model(maker_id, model_id, model) VALUES(?, ?, ?)';
    return new Promise((resolve, reject) => {
      this.db.run(query, [maker_id || bufferId, model_id, model], (err) => {
        this.db.close();
        if (err) {
          const error = this.handleError(err, model);
          reject(error);
          return;
        }
        resolve(maker_id ? data : { ...data, maker_id: bufferId });
      });
    });
  }

  editModel(data) {
    const { model_id, model } = data;
    const query = 'UPDATE vehicle_model SET model = ? WHERE model_id = ?';
    return new Promise((resolve, reject) => {
      this.db.run(query, [model, model_id], (err) => {
        this.db.close();
        if (err) {
          const error = this.handleError(err, model);
          reject(error);
          return;
        }
        resolve(data);
      });
    });
  }
}

module.exports = new VehicleModel();
