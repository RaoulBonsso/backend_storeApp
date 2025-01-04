const express =  require('express');
const ProductReview =  require('../models/rating_review');

const productReviewRouter = express.Router();

productReviewRouter.post('/api/product-review', async(req,res)=>{
    try {
        
        const {buyerId, email,fullName, productId, rating, review} =  req.body;
        const reviews = new ProductReview({buyerId, email, fullName, productId, rating, review});
        await reviews.save();

        return res.status(201).send(review);

    } catch (error) {
        return res.status(500).json({'error': error.message});
        
    }
})


module.exports = productReviewRouter;