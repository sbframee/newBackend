const mongoose = require("mongoose");

const SuppliersSchema = new mongoose.Schema({
  supplier_uuid: {
    type: String,
  },
  supplier_name: {
    type: String,
  },
  supplier_group: {
    type: String,
  },
});

module.exports = mongoose.model("suppliers", SuppliersSchema);
