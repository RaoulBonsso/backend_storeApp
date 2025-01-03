const express = require("express");
const Product = require("../models/product");

const productRouter = express.Router();

productRouter.post("/api/product", async (req, res) => {
    try {
        const {
            productName,
            productPrice,
            quantity,
            description,
            category,
            subcategory,
            image,
        } = req.body;
        const product = new Product({
            productName,
            productPrice,
            quantity,
            description,
            category,
            subcategory,
            image,
        });
        await product.save();
        return res.status(201).send(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = productRouter;
