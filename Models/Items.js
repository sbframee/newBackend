const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
  item_uuid: {
    type: String,
  },
  item_name: {
    type: String,
  },
  group: {
    type: String,
  },
});

module.exports = mongoose.model("items", ItemsSchema);
