const express = require("express");

const router = express.Router();
const { v4: uuid } = require("uuid");
const Customers = require("../Models/Customers");

router.post("/postCustomer", async (req, res) => {
  try {
    let value = req.body;
    if (!value) res.json({ success: false, message: "Invalid Data" });
    value = { ...value, customer_uuid: uuid() };

    let response = await Customers.create(value);
    if (response) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Customer Not created" });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/GetCustomerList", async (req, res) => {
  try {
    let data = await Customers.find({});

    if (data.length)
      res.json({ success: true, result: data.filter((a) => a.customer_name) });
    else res.json({ success: false, message: "Name Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.get('/getCustomerDetails/:customer_uuid', async (req, res) => {
  const customer_uuid = req.params.customer_uuid;

  try {
    const customerDetails = await Customers.findOne({ customer_uuid });

    if (customerDetails) {
      res.json({ success: true, result: customerDetails });
    } else {
      res.json({ success: false, result: null });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching customer details' });
  }
});


router.put("/putCustomers", async (req, res) => {
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
      let response = await Customers.updateOne(
        { customer_uuid: value.customer_uuid },
        value
      );
      if (response.acknowledged) {
        result.push({ success: true, result: value });
      } else result.push({ success: false, message: "Customer Not created" });
    }
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;
