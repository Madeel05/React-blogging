const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

//Singup

router.post("/signup", async (req, res) => {
  const newUser = new User({
    image: "defult.png",
    email: req.body.email,
    username: req.body.username,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PASSWORD_KEY
    ).toString(),
  });

  try {
    const savedNewUser = await newUser.save();
    res.status(200).json(savedNewUser);
  } catch (err) {
    res.status(500).json(err);
  }

});



router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("You have entered wrong credentials");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_PASSWORD_KEY
    );
    const mypassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    mypassword !== req.body.password && res.status(401).json("You have entered wrong credentials");
    const authToken = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET_KEY,
      {expiresIn: "30d"}
    );
    const { password, ...hiding } = user._doc;
    res.status(200).json({...hiding , authToken});
  } catch (err) {
    res.status(505).json(err);
  }
});

module.exports = router;
