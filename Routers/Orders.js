const express = require("express");

const router = express.Router();
const { v4: uuid } = require("uuid");
const Orders = require("../Models/Orders");

router.post("/postOrder", async (req, res) => {
  try {
    let value = req.body;
    if (!value) res.json({ success: false, message: "Invalid Data" });
    value = { ...value,   order_uuid: uuid() };

    let response = await Orders.create(value);
    if (response) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Orders Not created" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.get("/GetOrderList", async (req, res) => {
    try {
      let data = await Orders.find({});
  
      if (data.length)
        res.json({ success: true, result: data.filter((a) => a.order_id) });
      else res.json({ success: false, message: "Name Not found" });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  });
  

  router.get('/GetOrder/:order_uuid', async (req, res) => {
    try {
      const order = await Oders.findOne({ order_uuid: req.params.order_uuid });
  
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
  
      res.json({ success: true, result: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

module.exports = router;
