const express = require("express");
const router = express.Router();
const Category = require("../Models/Categories");

router.get('/getCategory', (req, res) => {
  Category.find({}, { _id: 0, name: 1 })
    .then(categories => res.json(categories))
    .catch(error => console.log(error));
});


module.exports = router;
