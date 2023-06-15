const mongoose = require("mongoose");

const Categories_nameSchema = new mongoose.Schema({
  name: {
        type: String,
      },
  category: {
    type: String,
  },
});

module.exports = mongoose.model("category_name", Categories_nameSchema);
