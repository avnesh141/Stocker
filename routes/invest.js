const { body, validationResult } = require("express-validator");

const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Stock = require("../models/Stock");
const User = require("../models/User");

router.get("/get", fetchuser, async (req, res) => {
  try {
    console.log("getStocks");
    const stocks = await Stock.find({ user: req.user.id });
    res.json({ stocks });
  } catch (error) {
    res.send({ error:error.message });
  }
});


router.post("/getbytype", fetchuser, async (req, res) => {
  try {
    const stocks = await Stock.find({ user: req.user.id,type:req.body.type });
    res.json({ stocks });
  } catch (error) {
    res.send({ error });
  }
});


router.post("/buy", fetchuser, async (req, res) => {
  let success = false;
  try {
    const userid = req.user.id;
    console.log(userid);
    let user = await User.findById({ _id: userid });
    console.log(user);
    const amount = user.amount;
    console.log(amount);
    const number = parseFloat(req.body.number);
    console.log(typeof req.body.number);
    const price = req.body.price;
    if (amount < number * price) {
      return res.json({ message: "Insufficient Balance" });
    }
    let stock = await Stock.findOne({
      user: userid,
      type: req.body.type,
      company: req.body.company,
    });
    if (stock != null) {
      const id = stock._id;
      user = await User.findByIdAndUpdate(userid, {
        amount: (user.amount - price * number),
      });
      stock = await Stock.findByIdAndUpdate(id, {
        number: (number + stock.number),
      });
      stock = await Stock.findById(id);
      return res.json({ message:"Bought SuccessFully" });
    }
    stock = await Stock.create({
      user: userid,
      company: req.body.company,
      type: req.body.type,
      number: number,
      price: price,
    });
    user = await User.findByIdAndUpdate(userid, {
      amount:(user.amount - price * number),
    });
     stock = await Stock.findOne({
       user: userid,
       type: req.body.type,
       company: req.body.company,
     });
    success = true;
    console.log(user);
    res.json({message:"Bought SuccessFully"});
  } catch (error) {
    res.json({message:"Error Occurred"  });
  }
});

router.post("/sell", fetchuser, async (req, res) => {
  let success = false;
  try {
    const userid = req.user.id;
    console.log(userid);
    let user = await User.findById({ _id: userid });
    console.log(user);
    const amount = user.amount;
    console.log(amount);
    const number = parseFloat(req.body.number);
    const price = req.body.price;
    let stock = await Stock.findOne({
      user: userid,
      type: req.body.type,
      company: req.body.company,
    });
    console.log(stock);
    if (stock != null) {
      console.log(stock.number);
          if (stock.number < number)
          {
             return res.json({ message:"Not Able to sell" });
            }
      user = await User.findByIdAndUpdate(userid, {
        amount:(user.amount + price * number),
      });
      const id = stock._id;
      if (stock.number === number)
      {
        stock = await Stock.findByIdAndDelete(id);
        success = true;
        return res.json({ message: "Sold SuccessFully" });
        }
      stock = await Stock.findByIdAndUpdate(id, {
        number:stock.number-number,
      });
      stock = await Stock.findById(id);
      success = true;
      return res.json({message:"Sold SuccessFully"});
    } else {
      res.status(200).json({message:"Not Able to sell" });
    }

    // user = await User.findByIdAndUpdate(userid, {
    //   amount: eval(user.amount - price * number),
    // });
    // console.log(user);
    // res.send(stock);
  } catch (error) {
    res.json({ message:"Error Occurred"});
  }
});

module.exports = router;
