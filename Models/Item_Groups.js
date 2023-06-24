const mongoose = require("mongoose");

const Item_GroupsSchema = new mongoose.Schema({
  group_uuid: {
    type: String,
  },
  item_group: {
    type: String,
  },
});

module.exports = mongoose.model("item_groups", Item_GroupsSchema);
