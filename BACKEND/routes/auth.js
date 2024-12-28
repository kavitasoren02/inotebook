const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var fetchuser =require('../middleware/fetchuser')

const JWT_SECRET = "kavitaisagoodgirl";

router.post(
  "/createuser",
  [
    // Validate and sanitize input
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be at least 6 characters long").isLength({min: 6}),
  ],
  async (req, res) => {
    let success=false;
    // console.log(req.body);
    // const user=User(req.body);
    // user.save()
    try {
      //if there are errors return  bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
      }
      // res.send(req.body);

      //check whether the user exsist with this email exsists already
      let user = await User.findOne({ success,email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "Email already exists.", status : 400 });
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
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
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.status(200).json({ success,authToken, status : 200 });

      // res.json({user})
      // .then(user=>res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:'Please enter unique value for email'})}
      // )
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ success,error: "Internal Server error.", status : 400 });

      // req.status(500).json({error : "Internal server error", status : 500});
    }
  }
);

// ROUTE 2//Authenticate a user using:POST "/api/auth" Doesnot require auth

router.post(
  "/login",
  [
    // Validate and sanitize input
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false
        return res.status(400).json({ success,error: "Try with correct login credential", status : 400 });
        // return res.status(400).json({ error: "Try with correct login credential" });
      }
      const pwdcompare = await bcrypt.compare(password, user.password);
      if (!pwdcompare) {
        success=false;
        return res
          .status(400)
          .json({ success,error: "Try with correct login credential" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authToken });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ success,error: "Internal Server error.", status : 400 });
    }
  }
);

// ROUTE 3//Get logged in user detail using:POST "/api/auth" Doesnot require auth
router.post(
  "/getuser",fetchuser,async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("password");
      res.send(user)
    } catch (error) {
    //   console.error(error.message);
    return res.status(500).json({ success,error: "Internal Server error.", status : 400 });
  }
  }
);
module.exports = router;


