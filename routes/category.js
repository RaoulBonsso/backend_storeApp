const express = require('express');
const Category = require('../models/category');

const categoryRouter = express.Router();

categoryRouter.post('/api/category', async (req, res) => {
    try {

        const {name, image, banner } = req.body;
        const category = new Category({name, image, banner});
        await category.save();
        res.json(category);
        return res.status(201).send(category);
    } catch (error) {
        res.status(500).json({error: error.message});
        
    }
});

categoryRouter.get('/api/category', async (req, res) => {
    try {
        const Categories = await Category.find();
        return res.status(200).json({Categories})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = categoryRouter;