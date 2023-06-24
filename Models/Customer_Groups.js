const mongoose = require("mongoose");

const Customer_GroupsSchema = new mongoose.Schema({
  group_uuid: {
    type: String,
  },
  customer_group: {
    type: String,
  },
  });

module.exports = mongoose.model("customer_groups", Customer_GroupsSchema);
