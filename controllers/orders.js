const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const isAuth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

//GET ALL ORDERS BY THE USER
router.get("/", isAuth, async (req, res) => {
    try {
        let orders = await Order.find({ user: req.user._id });
        return res.json(orders);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
});

//Get all orders for admin
router.get("/admin", isAdmin, async (req, res) => {
    try {
        let orders = await Order.find();
        return res.json(orders);
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
});

router.post("/:id", async (req, res) => {
    try {
        const cart = await Cart.find({ user: req.params.id });

        if (cart.length === 0) {
            return res.status(400).json({ msg: "No cart found!" });
        }

        // Calculate the total dynamically based on cart items
        const items = cart.map((item) => {
            const subtotal = item.amount * item.price;
            return {
                cart: item._id, 
                product: item.product,
                description: item.description,
                amount: item.amount,
                price: item.price, 
                tradeNumber: item.tradeNumber, // if 1 it's buy then 2 it's sell
                subtotal: subtotal
            };
        });

        const total = items.reduce((acc, item) => acc + item.subtotal, 0);

        let myOrder = await Order.create({
            user: req.params.id,
            items: items,
            total: total,
        });

        await Cart.deleteMany({ user: req.params.id });

        return res.status(200).json({ msg: "Checkout successfully", order: myOrder });
    } catch (e) {
        console.error(e);  // Log error details for debugging
        return res.status(500).json({ error: e.message });
    }
});




module.exports = router;
