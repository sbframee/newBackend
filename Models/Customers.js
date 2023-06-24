const mongoose = require("mongoose");

const CustomersSchema = new mongoose.Schema({
  customer_uuid: {
    type: String,
  },
  customer_name: {
    type: String,
  },
  customer_mobile: {
    type: Number,
  },
  group: {
    type: String,
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("customers", CustomersSchema);
