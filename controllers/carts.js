const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const isAuth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const fs = require("fs"); //allows you to read and wirte on the file system
const path = require("path"); //allows you to change directories
const multer = require("multer"); //form handling with file upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  }, //where to save the images
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }, //format the filename before storing it
});

const upload = multer({ storage });

//GET ALL CARTS
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    return res.json(carts);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.post("/", isAuth, async (req, res) => {
  try {
    // console.log(req.body);
    // return
    let cart = new Cart(req.body);
    cart.user = req.user._id;
    console.log(req.body);
    cart.tradeNumber = req.body.type === "buy" ? 1 : 2;
    await cart.save();
    return res.json({ cart, msg: "Cart added successfully" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});


//DELETE ALL ITEMS INSIDE THE CART
router.delete("/", isAuth, async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.user._id });
    return res.json({ msg: "All cart items deleted" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

//DELETE A SINGLE ITEM INSIDE THE CART
router.delete("/:id", isAuth, async (req, res) => {
  //the id on the params is the cartId
  try {
    await Cart.findByIdAndDelete(req.params.id);

    return res.json({ msg: "Cart Item deleted" });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

module.exports = router;

//UPDATE CART
router.put("/:id", isAuth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          quantity,
        },
      },
      { new: true }
    );
    return res.json({ msg: "Cart updated successfully", cart });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});
