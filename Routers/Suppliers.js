const express = require("express");

const router = express.Router();
const { v4: uuid } = require("uuid");
const Suppliers = require("../Models/Suppliers");

router.post("/postSupplier", async (req, res) => {
  try {
    let value = req.body;
    if (!value) res.json({ success: false, message: "Invalid Data" });
    value = { ...value, supplier_uuid: uuid() };

    let response = await Suppliers.create(value);
    if (response) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Supplier Not created" });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/GetSupplierList", async (req, res) => {
  try {
    let data = await Suppliers.find({});

    if (data.length)
      res.json({ success: true, result: data.filter((a) => a.supplier_name) });
    else res.json({ success: false, message: "Name Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.put("/putSuppliers", async (req, res) => {
  try {
    let result = [];
    for (let value of req.body) {
      if (!value) res.json({ success: false, message: "Invalid Data" });
      value = Object.keys(value)
        .filter((key) => key !== "_id")
        .reduce((obj, key) => {
          obj[key] = value[key];
          return obj;
        }, {});
      console.log(value);
      let response = await Suppliers.updateOne(
        { supplier_uuid: value.supplier_uuid },
        value
      );
      if (response.acknowledged) {
        result.push({ success: true, result: value });
      } else result.push({ success: false, message: "Supplier Not created" });
    }
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;
