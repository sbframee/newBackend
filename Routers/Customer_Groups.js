const express = require("express");

const router = express.Router();
const { v4: uuid } = require("uuid");
const Groups = require("../Models/Customer_Groups");

router.post("/postCustomer_group", async (req, res) => {
  try {
    let value = req.body;
    if (!value) res.json({ success: false, message: "Invalid Data" });
    value = { ...value, group_uuid: uuid() };

    let response = await Groups.create(value);
    if (response) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Group Not created" });
  } 
  catch (err) {
    console.error(err); 
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/GetCustomer_GroupList", async (req, res) => {
  try {
    let data = await Groups.find({});

    if (data.length)
      res.json({ success: true, result: data.filter((a) => a.customer_group) });
    else res.json({ success: false, message: "Group Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.put("/putGroups", async (req, res) => {
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
      let response = await Groups.updateOne(
        { group_uuid: value.group_uuid },
        value
      );
      if (response.acknowledged) {
        result.push({ success: true, result: value });
      } else result.push({ success: false, message: "Group Not created" });
    }
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;
