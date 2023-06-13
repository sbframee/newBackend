const express = require("express");

const router = express.Router();
const { v4: uuid } = require("uuid");
const Orders = require("../Models/Orders");
const Customers = require("../Models/Customers");

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
  

  router.get('/GetOrderDetails/:selectedOrderId', async (req, res) => {
    const selectedOrderId = req.params.selectedOrderId;

  try {
    // Fetch the case details from the database based on the selectedOrderId
    const orderDetails = await Orders.findOne({ order_id: selectedOrderId }).exec();

    if (!orderDetails) {
      return res.status(404).json({ error: 'Order details not found' });
    }

    // Fetch the customer details based on the retrieved customer_uuid
    const customerDetails = await Customers.findOne({ customer_uuid: orderDetails.customer_uuid }).exec();

    if (!customerDetails) {
      return res.status(404).json({ error: 'Customer details not found' });
    }

    // Include the customer_uuid and other case details in the response
    const response = {
      order_id: orderDetails.order_id,
      customer_uuid: orderDetails.customer_uuid,
      customer_name: customerDetails.customer_name,
      customer_mobile: customerDetails.customer_mobile,
      // Include other case details as needed
    };

    // Send the case details as the response
    res.json({ result: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  router.put("/putOrders/:orderId", async (req, res) => {
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
