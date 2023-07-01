const express = require("express");

const router = express.Router();
const { v4: uuid } = require("uuid");
const Items = require("../Models/Items");

router.post("/postItem", async (req, res) => {
  try {
    let value = req.body;
    if (!value) res.json({ success: false, message: "Invalid Data" });
    value = { ...value, item_uuid: uuid() };

    let response = await Items.create(value);
    if (response) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Item Not created" });
  } 
  catch (err) {
    console.error(err); 
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/GetItemList", async (req, res) => {
  try {
    let data = await Items.find({});

    if (data.length)
      res.json({ success: true, result: data.filter((a) => a.item_name) });
    else res.json({ success: false, message: "Name Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.get('/getItemDetails/:item_uuid', async (req, res) => {
  const item_uuid = req.params.item_uuid;

  try {
    const itemDetails = await Items.findOne({ item_uuid });

    if (itemDetails) {
      res.json({ success: true, result: itemDetails });
    } else {
      res.json({ success: false, result: null });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching item details' });
  }
});


router.put("/putItems", async (req, res) => {
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
      let response = await Items.updateOne(
        { item_uuid: value.item_uuid },
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
