const mongoose = require("mongoose");

const ActionsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  
  category: {
    type: String,
  },
});

module.exports = mongoose.model("actions", ActionsSchema);
