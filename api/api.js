const express = require('express');
const router = express.Router();

const vehicleMake = require('../db/vehicle-make');
const { ACTIONS_FN, ACTION_NOT_FOUND } = require('./helpers');

router.get('/vehicle', function (req, res) {
  return res.send({});
});

router.post('/vehicle', async function (req, res) {
  const payload = req.body;
  let response = [];
  // * Used data from previous request in case relying action data is missing on the payload...
  let buffer = {};
  for ([index, item] of payload.entries()) {
    console.log('EXECUTING ACTION: ', item.action);
    try {
      const request$ = ACTIONS_FN(item.action);
      if (!request$) {
        throw ACTION_NOT_FOUND(item.action, index);
      }

      const _data = await request$(item, buffer);
      response.push({ ...item, ..._data });
      buffer = _data;
    } catch (err) {
      console.log('ACTION EXECUTION FAILED: ', err.message);
      res.status(err.status).send([response, err]);
      return;
    }
  }
  res.send([response, null]);
});

router.delete('/vehicle', async function (req, res) {
  const payload = req.body;
  try {
    const request$ = ACTIONS_FN(payload.action);
    if (!request$) {
      throw ACTION_NOT_FOUND(payload.action);
    }
    const data = await request$(payload);
    res.send([data, null]);
  } catch (err) {
    console.log('SOMETHING WHEN WRONG: ', err);
    res.status(500).send([payload, err]);
  }
});

module.exports = router;
