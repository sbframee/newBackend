const express = require("express");

const router = express.Router();
const Action = require("../Models/Actions");

  router.get('/getName', (req, res) => {
    Action.find({}, { _id: 0, name: 1 })
      .then(actions => res.json(actions.map(action => action.name)))
      .catch(error => console.log(error));
  });

  router.get('/getCategory', (req, res) => {
    Action.find({}, { _id: 0, category: 1 })
      .then(actions => res.json(actions.map(action => action.category)))
      .catch(error => console.log(error));
  });
  
  

  module.exports = router;