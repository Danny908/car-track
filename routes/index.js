const express = require('express');
const router = express.Router();

const vehicleMaker = require('../db/vehicle-make');
const vehicleModel = require('../db/vehicle-model');

/* GET home page. */
router.get('/', async (_, res) => {
  try {
    const makers = await vehicleMaker.fetchAll();
    const models = await vehicleModel.fetchAll();
    const vehicles = makers.map((vehicle) => ({
      ...vehicle,
      models: models.filter((model) => model.maker_id === vehicle.maker_id),
    }));

    res.render('index', {
      title: 'Admin Panel',
      vehicles: vehicles,
    });
  } catch (err) {
    console.log(err.__argument);
    res.render('error', {
      title: 'Something Went Wrong',
      message: 'Something Went Wrong D:',
      error: { status: err },
    });
  }
});

module.exports = router;
