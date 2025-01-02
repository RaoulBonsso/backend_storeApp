// Imports 
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const bannerRouter = require('./routes/banner');
const categoryRouter = require('./routes/category');
const subCategoryRouter = require('./routes/sub_category');

// instance of express
const app = express();

// port number
const PORT = 3000;

// middleware
app.use(express.json());
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);


// mongoose middleware

const DB = "mongodb+srv://bonssoraoul:AppStore@cluster0.kanuc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB).then(()=>{
    console.log('MongoDB Connected...');
})

app.listen(PORT,"0.0.0.0",(req, res) => {
    console.log(`Server is running on port ${PORT}`);
});










