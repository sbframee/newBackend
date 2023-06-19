const express = require("express");

const router = express.Router();
const Category = require("../Models/Categories");


  router.get('/getCategory', (req, res) => {
    Category.find({}, { _id: 0, name: 1 })
      .then(categories => res.json(categories))
      .catch(error => console.log(error));
  });

  router.get('/getGroup', (req, res) => {
    Category.find({}, { _id: 0, group: 1 })
      .then(categories => {
        const groups = categories.map(category => ({ name: category.group }));
        res.json(groups);
      })
      .catch(error => console.log(error));
  });
   
  router.post('/postGroup', async (req, res) => {
    try {
      let value = req.body;
      if (!value) res.json({ success: false, message: "Invalid Data" });
      value = { ...value };
  
      let response = await Category.create(value);
      if (response) {
        res.json({ success: true, result: response });
      } else res.json({ success: false, message: "Group Not created" });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  });
  

  module.exports = router;