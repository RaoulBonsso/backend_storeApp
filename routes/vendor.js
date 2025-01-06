const express = require('express');
const Vendor = require('../models/vendor');

const vendorRouter = express.Router();



authRouter.post("/api/vendor/signup", async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
      existingEmail = await Vendor.findOne({ email });
  
      if (existingEmail) {
        return res
          .status(400)
          .json({ message: "Vendor already exists with this email" });
      } else {
        // generate de salt with a cost factor of 10
        const salt = await bcrypt.genSalt(10);
        //hash the password using the generates salt
        const hashPassword = await bcrypt.hash(password, salt);
        var vendor = new Vendor({ fullName, email, password: hashPassword });
        vendor = await vendor.save();
        res.json(vendor);
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });