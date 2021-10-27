const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "haisdaf$huehuehue";
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleWare/fetchUser");
//create a USER using :POST"/api/auth/"

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "enter a valid name").isLength({ min: 5 }),
    body("password", "password should have atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      success=true;
      const authToken =jwt.sign(data, JWT_SECRET);
      
      res.json({ success,authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// Authentication

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password should have atleast 5 characters").exists(),
  ],
  async (req, res) => {

    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(0) });
    }
    //de structuring
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false;
        return res.status(400).json({success, error: "Incorrect credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        success=false;
        return res.status(400).json({ success,error: "Incorrect credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success,authtoken});
    } catch (error) {
      success = false;
      res.status(500).send("Internal server occured");
    }
  }
);

// Getting user details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal server occured");
  }
});
module.exports = router;
