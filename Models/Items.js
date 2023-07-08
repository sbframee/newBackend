const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
  item_uuid: {
    type: String,
  },
  item_name: {
    type: String,
  },
  item_group: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("items", ItemsSchema);
