const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  order_uuid: {
    type: String,
  },
  customer_uuid: {
    type: String,
  },
  order_id: {
    type: Number,
  },
  category: {
    type: String,
  },
  cname: {
    type: String,
  },
});

module.exports = mongoose.model("orders", OrdersSchema);
