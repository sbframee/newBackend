const express = require("express");
const multer = require("multer");
const router = express.Router();
const { v4: uuid } = require("uuid");
const Items = require("../Models/Items");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/postItem", upload.single("image"), async (req, res) => {
  try {
    let value = req.body;
    if (!value) {
      return res.json({ success: false, message: "Invalid Data" });
    }

    if (!req.file) {
      return res.json({ success: false, message: "No image provided" });
    }

    const imageName = req.file.filename;

    value = { ...value, item_uuid: uuid(), image: imageName };

    let response = await Items.create(value);
    if (response) {
      return res.json({ success: true, result: response });
    } else {
      return res.json({ success: false, message: "Item not created" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get('/GetItemList', async (req, res) => {
  try {
    let data = await Items.find({});

    if (data.length)
      res.json({ success: true, result: data.filter((a) => a.item_name) });
    else res.json({ success: false, message: "Item Not found" });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
});

router.get('/getItemDetails/:item_uuid', async (req, res) => {
  const item_uuid = req.params.item_uuid;

  try {
    const itemDetails = await Items.findOne({ item_uuid });

    if (itemDetails) {
      res.json({ success: true, result: itemDetails });
    } else {
      res.json({ success: false, result: null });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching item details' });
  }
});


router.put("/putItems", async (req, res) => {
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
      let response = await Items.updateOne(
        { item_uuid: value.item_uuid },
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

module.exports = router;
