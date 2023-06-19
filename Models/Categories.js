const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  group: {
    type: String,
  },
});

module.exports = mongoose.model("categories", CategoriesSchema);
