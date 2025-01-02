const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    } else {
      // generate de salt with a cost factor of 10
      const salt = await bcrypt.genSalt(10);
      //hash the password using the generates salt
      const hashPassword = await bcrypt.hash(password, salt);
      var user = new User({ fullName, email, password: hashPassword });
      user = await user.save();
      res.json(user);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// SignIn API
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res
        .status(400)
        .json({ message: "User not found with this email" });
    } else {
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      } else {
        const token = jwt.sign(
          { id: findUser._id },
          "process.env.PASSWORD_SECRET",
          { expiresIn: "1h" }
        );
        // remove important information
        const { password, ...userWithoutPassword } = findUser._doc;
        return res.json({
          token,
          ...userWithoutPassword,
        });
      }
    }
  } catch (error) {}
});

module.exports = authRouter;
