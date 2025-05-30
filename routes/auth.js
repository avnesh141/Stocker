const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ThisisSecretKey";
const fetchuser = require("../middleware/fetchuser");

const router = express.Router();


router.post(
  "/register",
  body("name", "Must be three characters long").isLength({ min: 3 }),
  body("email", "must be a valid email").isEmail(),
  body("password", "must be 5 characters long").isLength({ min: 5 }),
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log(errors[0].msg);
      res.status(400).send(errors);
    } else {
      const email = req.body.email;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).send({ error: "User already exists" });
      } else {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const secPass = bcrypt.hashSync(password, salt);

        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          number:req.body.number,
          password: secPass,
        });
        const data = {
          user: {
            id: user.id,
          },
        };
        success = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ success, authtoken });
      }
    }
  }
);

router.post(
  "/login",
  body("email", "Please enter valiid Credentials").isEmail(),
  body("password", "Password must not be empty").isLength({ min: 5 }),
  async (req, res) => {
    // console.log(req);
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty()) {
      // console.log("aa Gye");
      return res.status(400).send({ error: errors });
    }
    let success = false;
    const { password, email } = req.body;
    try {
      // console.log(user);
      let user = await User.findOne({ email });
      // res.status(400).send({error:"eee"});
      if (!user) {
        return res.status(400).send({ error: "Enter Valid Credentials" });
      }
      const passcmp = await bcrypt.compare(password, user.password);
      if (!passcmp) {
        return res.status(400).send({ error: "Enter Valid Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.status(200).send({ success, authtoken });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

router.get("/getuser", fetchuser, async (req, res) => {
  let success=false;
  try {
    // console.log("first fir Se");
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    // console.log("qq"+user);
    res.json({user});
  } catch (error) {
    // console.log("Good Bye");
    
    // console.log(error.message);
    res.status(500).send({error: "Unable to fetch user Details" });
  }
});

router.post("/signg", fetchuser, async (req, res) => {
  // console.log("aa to gye");
  let success=false;
  try {
    const email = req.user.email;
   if(email != undefined)
   {
      let user=await User.create({
        name:req.user.name,
        email:req.user.email,
        picture:req.user.picture,
      });
   }
   success=true;
   res.status(200).send({success});
  } catch (error) {
    // console.log("Good Bye");
    res.status(500).send({ "error":error.message,"success":success });
  }
});


router.put("/deposit", fetchuser,async (req, res) => {
    try {
        const userid = req.user.id;
        let user = await User.findById(userid);
        if (user)
        {
            const amount =parseFloat(req.body.amount);
            user = await User.findByIdAndUpdate(userid, { amount: amount + user.amount });
          user = await User.findById(userid);
          res.send(user);
        }
        else
        {
            res.status(400).send({ error: "Account not found" });
            }

    } catch (error) {
        res.send({ error: error.message });
    }
})

router.put("/withdraw", fetchuser,async (req, res) => {
    try {
        const userid = req.user.id;
        let user = await User.findById(userid);
        if (user)
        {
            const amount = parseFloat(req.body.amount);
            // console.log(typeof amount);
            // console.log(user.amount);
            if ((amount > user.amount) || user.amount===0)
            {
                return res.status(400).send({ error: "You can not withdraw more than Your current balance or account is empty" });
          }
          user = await User.findByIdAndUpdate(userid, {
            amount: user.amount - amount,
          });
          user = await User.findById(userid);
            res.send(user);
        }
        else
        {
            res.status(400).send({ error: "Account not found" });
            }

    } catch (error) {
        res.send({ error: error.message });
    }
})


router.put("/update", fetchuser,async (req, res) => {
  let success=false;
    try {
        const userid = req.user.id;
        const password = req.body.password;
        const newname = req.body.name;
        const newnumber=req.body.number;
        const salt = await bcrypt.genSalt(10);
        const secPass = bcrypt.hashSync(password, salt);
        let user;
        if(password=="")
        {
           user=await User.findByIdAndUpdate(userid, {name:newname,number:newnumber});
        }
        else
        {
          user=await User.findByIdAndUpdate(userid, {name:newname,password:secPass,number:newnumber});
        }
        // console.log(secPass);
        // console.log(user);
        success=true;
        res.status(200).send({success,user});

    } catch (error) {
        res.send({ success,error });
    }
})




module.exports = router;
