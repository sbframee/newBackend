const express = require("express");

const router = express.Router();
const { v4: uuid } = require("uuid");
const Orders = require("../Models/Orders");
const Customers = require("../Models/Customers");
const Items = require("../Models/Items");
const Suppliers = require("../Models/Suppliers");

router.post("/postOrder", async (req, res) => {
  try {
    const orderData = req.body;
    if (!orderData) {
      return res.json({ success: false, message: "Invalid Data" });
    }
    const currentDate = new Date().toLocaleDateString("en-GB");
    orderData.date = currentDate;

    if (!orderData.order_uuid) {
      orderData.order_uuid = uuid();
    }

    const response = await Orders.create(orderData);
    if (response) {
      res.json({ success: true, result: response });
    } else {
      res.json({ success: false, message: "Orders Not created" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.get("/GetOrderList", async (req, res) => {
  try {
    let data = await Orders.find({});
  
    if (data.length) {
      const uniqueCategories = [...new Set(data.map((order) => order.category))];
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
    const orderDetails = await Orders.findOne({ order_id: selectedOrderId }).exec();
    if (!orderDetails) {
      return res.status(404).json({ error: 'Order details not found' });
    }
    const customerDetails = await Customers.findOne({ customer_uuid: orderDetails.customer_uuid }).exec();
    if (!customerDetails) {
      return res.status(404).json({ error: 'Customer details not found' });
    }
    const itemDetails = await Items.findOne({ item_uuid: orderDetails.item_uuid }).exec();
    if (!itemDetails) {
      return res.status(404).json({ error: 'Item details not found' });
    }
    const supplierDetails = await Suppliers.findOne({ supplier_uuid: orderDetails.supplier_uuid }).exec();
    if (!supplierDetails) {
      return res.status(404).json({ error: 'Supplier details not found' });
    }

    const response = {
      order_id: orderDetails.order_id,
      customer_uuid: orderDetails.customer_uuid,
      customer_name: customerDetails.customer_name,
      customer_mobile: customerDetails.customer_mobile,
    };

    res.json({ result: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  router.put("/putOrders/:orderId", async (req, res) => {
    try {
      const orderId = req.params.orderId;
      const { category, category_name } = req.body;
  
      if (!category || !category_name) {
        return res.status(400).json({ success: false, message: "Invalid data" });
      }
  
      const response = await Orders.findOneAndUpdate(
        { order_id: orderId },
        { $set: { category, category_name } },
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
