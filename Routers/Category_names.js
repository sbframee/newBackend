const express = require("express");

const router = express.Router();
const Category_name = require("../Models/Category_names");


  router.get('/getCategory_name', (req, res) => {
    const { category } = req.query;
    Category_name.find({category}, { _id: 0, name: 1 })
      .then(categories_name => res.json(categories_name))
      .catch(error => console.log(error));
  });
  
  

  module.exports = router;