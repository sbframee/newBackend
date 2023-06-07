const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  order_uuid: {
    type: String,
  },
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  order_id: {
    type: Number,
  },
  category: {
    type: String,
  },
});

module.exports = mongoose.model("orders", OrdersSchema);
