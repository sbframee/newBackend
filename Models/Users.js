const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  user_uuid: {
    type: String,
  },
  user_name: {
    type: String,
  },
  user_password: {
    type: String,
  },
  user_role: {
    type: String,
  },
  user_group: {
    type: String,
  },

});

module.exports = mongoose.model("users", UsersSchema);
