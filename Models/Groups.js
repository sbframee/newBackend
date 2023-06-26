const mongoose = require("mongoose");

const GroupsSchema = new mongoose.Schema({
  customerGroup_uuid: {
    type: String,
  },
  customer_group: {
    type: String,
  },
  itemGroup_uuid: {
    type: String,
  },
  item_group: {
    type: String,
  },
  userGroup_uuid: {
    type: String,
  },
  user_group: {
    type: String,
  },
  userRole_uuid: {
    type: String,
  },
  user_role: {
    type: String,
  },
  supplierGroup_uuid: {
    type: String,
  },
  supplier_group: {
    type: String,
  },
  });

module.exports = mongoose.model("groups", GroupsSchema);
