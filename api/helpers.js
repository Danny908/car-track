const vehicleMake = require('../db/vehicle-make');
const vehicleModel = require('../db/vehicle-model');

const ACTIONS_FN_CATALOG = {
  ADD_VEHICLE,
  EDIT_VEHICLE,
  DELETE_VEHICLE,
  ADD_MODEL,
  EDIT_MODEL,
  DELETE_MODEL,
};

function generateID(string) {
  const multiplier = Math.floor(Math.random() * 100) + 1;
  const num = Number(
    [...string]
      .reverse()
      .reduce(
        (acc, char) => (acc.length < 9 ? acc.concat(char.charCodeAt()) : acc),
        ''
      )
  );
  return num * multiplier;
}

function ADD_VEHICLE(data) {
  return vehicleMake.insertVehicle.call(vehicleMake, {
    ...data,
    maker_id: generateID(data.maker),
  });
}

function EDIT_VEHICLE(data) {
  return vehicleMake.editVehicle.call(vehicleMake, data);
}

function DELETE_VEHICLE(data) {
  console.log('DELETING MAKER WITH ID: ', data.maker_id);
  return vehicleMake.deleteVehicleById.call(vehicleMake, data);
}

function ADD_MODEL(data, buffer) {
  return vehicleModel.insertModel.call(
    vehicleModel,
    {
      ...data,
      model_id: generateID(data.model),
    },
    buffer
  );
}

function EDIT_MODEL(data) {
  return vehicleModel.editModel.call(vehicleModel, data);
}

function DELETE_MODEL(data) {
  console.log('DELETING MODEL WITH ID: ', data.model_id);
  return vehicleModel.deleteModelById.call(vehicleModel, data);
}

function ACTIONS_FN(action) {
  return ACTIONS_FN_CATALOG[action] ? ACTIONS_FN_CATALOG[action] : null;
}

function ACTION_NOT_FOUND(action, index = 0) {
  return {
    message: `Could NOT Execute Action, [ ${action} ] NOT FOUND. ${
      index > 0 ? 'Partial save.' : ''
    }`,
    status: 207,
    value: action,
  };
}

module.exports = {
  ACTIONS_FN,
  ACTION_NOT_FOUND,
};
