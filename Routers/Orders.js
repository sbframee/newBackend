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
  
    if (data.length) {
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map((order) => order.category))];
      
      // Filter orders with unique categories
      const filteredData = data.filter((order) => order.category && uniqueCategories.includes(order.category));
      
      res.json({ success: true, result: filteredData });
    } else {
      res.json({ success: false, message: "No orders found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});
  

  router.get('/GetOrder/:order_uuid', async (req, res) => {
    try {
      const order = await Orders.findOne({ order_uuid: req.params.order_uuid });
  
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
  
      res.json({ success: true, result: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  router.put("/orders/putOrders/:orderId", async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const { category, cname } = req.body;
  
      if (!category || !cname) {
        return res.status(400).json({ success: false, message: "Invalid data" });
      }
  
      const response = await Orders.findOneAndUpdate(
        { order_id: orderId },
        { $set: { category, cname } },
        { new: true }
      );
  
      if (response) {
        res.json({ success: true, message: "Order updated successfully" });
      } else {
        res.status(404).json({ success: false, message: "Order not found" });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: "Failed to update order", error: err.message });
    }
  });
  
module.exports = router;
