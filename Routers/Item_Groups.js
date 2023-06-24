const express = require("express");

const router = express.Router();
const { v4: uuid } = require("uuid");
const Item_Groups = require("../Models/Item_Groups");

router.post("/postItem_Groups", async (req, res) => {
  try {
    let value = req.body;
    if (!value) res.json({ success: false, message: "Invalid Data" });
    value = { ...value, group_uuid: uuid() };

    let response = await Item_Groups.create(value);
    if (response) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Item Not created" });
  } 
  catch (err) {
    console.error(err); 
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/GetItem_GroupList", async (req, res) => {
  try {
    let data = await Item_Groups.find({});

    if (data.length)
      res.json({ success: true, result: data.filter((a) => a.item_group) });
    else res.json({ success: false, message: "Name Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.put("/putItem_Group", async (req, res) => {
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
      let response = await Item_Groups.updateOne(
        { group_uuid: value.group_uuid },
        value
      );
      if (response.acknowledged) {
        result.push({ success: true, result: value });
      } else result.push({ success: false, message: "Item Not created" });
    }
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;
