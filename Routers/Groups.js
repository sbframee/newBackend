const express = require("express");

const router = express.Router();
const { v4: uuid } = require("uuid");
const Groups = require("../Models/Groups");

router.post("/postCustomer_group", async (req, res) => {
  try {
    let value = req.body;
    if (!value) res.json({ success: false, message: "Invalid Data" });
    value = { ...value, customerGroup_uuid: uuid() };

    let response = await Groups.create(value);
    if (response) {
      res.json({ success: true, result: response });
    } else res.json({ success: false, message: "Group Not created" });
  } 
  catch (err) {
    console.error(err); 
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/GetCustomer_GroupList", async (req, res) => {
  try {
    let data = await Groups.find({});

    if (data.length)
      res.json({ success: true, result: data.filter((a) => a.customer_group) });
    else res.json({ success: false, message: "Group Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.put("/putCustomer_Groups", async (req, res) => {
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
      let response = await Groups.updateOne(
        { customerGroup_uuid: value.customerGroup_uuid },
        value
      );
      if (response.acknowledged) {
        result.push({ success: true, result: value });
      } else result.push({ success: false, message: "Group Not created" });
    }
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.post("/postItem_Groups", async (req, res) => {
    try {
      let value = req.body;
      if (!value) res.json({ success: false, message: "Invalid Data" });
      value = { ...value, itemGroup_uuid: uuid() };
  
      let response = await Groups.create(value);
      if (response) {
        res.json({ success: true, result: response });
      } else res.json({ success: false, message: "Item Not created" });
    } 
    catch (err) {
      console.error(err); 
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  
  router.get("/GetItem_GroupList", async (req, res) => {
    try {
      let data = await Groups.find({});
  
      if (data.length)
        res.json({ success: true, result: data.filter((a) => a.item_group) });
      else res.json({ success: false, message: "Name Not found" });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  });
  
  router.put("/putItem_Group", async (req, res) => {
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
        let response = await Groups.updateOne(
          { itemGroup_uuid: value.itemGroup_uuid },
          value
        );
        if (response.acknowledged) {
          result.push({ success: true, result: value });
        } else result.push({ success: false, message: "Item Not created" });
      }
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  });

  router.post("/postUser_Groups", async (req, res) => {
    try {
      let value = req.body;
      if (!value) res.json({ success: false, message: "Invalid Data" });
      value = { ...value, userGroup_uuid: uuid() };
  
      let response = await Groups.create(value);
      if (response) {
        res.json({ success: true, result: response });
      } else res.json({ success: false, message: "User Not created" });
    } 
    catch (err) {
      console.error(err); 
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  
  router.get("/GetUser_GroupList", async (req, res) => {
    try {
      let data = await Groups.find({});
  
      if (data.length)
        res.json({ success: true, result: data.filter((a) => a.user_group) });
      else res.json({ success: false, message: "Name Not found" });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  });
  
  router.put("/putUser_Group", async (req, res) => {
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
        let response = await Groups.updateOne(
          { userGroup_uuid: value.userGroup_uuid },
          value
        );
        if (response.acknowledged) {
          result.push({ success: true, result: value });
        } else result.push({ success: false, message: "User Not updated" });
      }
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  });

  router.post("/postUserRole", async (req, res) => {
    try {
      let value = req.body;
      if (!value) res.json({ success: false, message: "Invalid Data" });
      value = { ...value, userRole_uuid: uuid() };
  
      let response = await Groups.create(value);
      if (response) {
        res.json({ success: true, result: response });
      } else res.json({ success: false, message: "User Not created" });
    } 
    catch (err) {
      console.error(err); 
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  
  router.get("/GetUserRoleList", async (req, res) => {
    try {
      let data = await Groups.find({});
  
      if (data.length)
        res.json({ success: true, result: data.filter((a) => a.user_role) });
      else res.json({ success: false, message: "Name Not found" });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  });
  
  router.put("/putUserRole", async (req, res) => {
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
        let response = await Groups.updateOne(
          { userRole_uuid: value.userRole_uuid },
          value
        );
        if (response.acknowledged) {
          result.push({ success: true, result: value });
        } else result.push({ success: false, message: "User Not updated" });
      }
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  });


  router.post("/postSupplier_Groups", async (req, res) => {
    try {
      let value = req.body;
      if (!value) res.json({ success: false, message: "Invalid Data" });
      value = { ...value, supplierGroup_uuid: uuid() };
  
      let response = await Groups.create(value);
      if (response) {
        res.json({ success: true, result: response });
      } else res.json({ success: false, message: "Supplier Not created" });
    } 
    catch (err) {
      console.error(err); 
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  
  router.get("/GetSupplier_GroupList", async (req, res) => {
    try {
      let data = await Groups.find({});
  
      if (data.length)
        res.json({ success: true, result: data.filter((a) => a.supplier_group) });
      else res.json({ success: false, message: "Name Not found" });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  });
  
  router.put("/putSupplier_Group", async (req, res) => {
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
        let response = await Groups.updateOne(
          { supplierGroup_uuid: value.supplierGroup_uuid },
          value
        );
        if (response.acknowledged) {
          result.push({ success: true, result: value });
        } else result.push({ success: false, message: "Supplier Not created" });
      }
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
  });
  
  
  

module.exports = router;
