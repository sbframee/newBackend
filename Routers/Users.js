const express = require("express");

const router = express.Router();
const { v4: uuid } = require("uuid");
const Users = require("../Models/Users");

router.post("/postUser", async (req, res) => {
  try {
    let value = req.body;
    if (!value) res.json({ success: false, message: "Invalid Data" });
    value = { ...value,   user_uuid: uuid() };

    let response = await Users.create(value);
    if (response) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Users Not created" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.post("/loginUser", async (req, res) => {
  const { user_name, user_password } = req.body;

  try {
    // Find the user in the database
    const user = await Users.findOne({ user_name });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.user_password !== user_password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Successful login
    return res.json({ success: true, userRoll: user.user_role });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

  router.get("/GetUserList", async (req, res) => {
    try {
      let data = await Users.find({});
  
      if (data.length)
        res.json({ success: true, result: data.filter((a) => a.user_name) });
      else res.json({ success: false, message: "Name Not found" });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  });
  

  router.get('/GetUser/:user_uuid', async (req, res) => {
    try {
      const user = await Users.findOne({ user_uuid: req.params.user_uuid });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // User found, send the response with the user data
      res.json({ success: true, result: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  router.put("/putUsers", async (req, res) => {
    try {
      let result = [];
      for (let value of req.body) {
        if (!value) res.json({ success: false, message: "Invalid Data" });
        value = Object.keys(value)
          .filter((key) => key !== "_id")
          .reduce((obj, key) => {
            obj[key] = value[key];
            return obj;
          }, {});
        console.log(value);
        let response = await Users.updateOne(
          { user_uuid: value.user_uuid },
          value
        );
        if (response.acknowledged) {
          result.push({ success: true, result: value });
        } else result.push({ success: false, message: "User Not created" });
      }
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  });
  

module.exports = router;
