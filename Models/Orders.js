const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  order_uuid: {
    type: String,
  },
  customer_uuid: {
    type: String,
  },
  item_uuid: {
    type: String,
  },
  supplier_uuid: {
    type: String,
  },
  order_id: {
    type: Number,
  },
  category: {
    type: String,
  },
  category_name: {
    type: String,
  },
  date: {
    type: String,
  }
});

module.exports = mongoose.model("Orders", OrdersSchema);
