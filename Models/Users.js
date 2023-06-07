const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  user_uuid: {
    type: String,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  user_type: {
    type: String,
  },
});

module.exports = mongoose.model("users", UsersSchema);
