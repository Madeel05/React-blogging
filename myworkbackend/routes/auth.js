const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

//Singup

router.post("/signup", async (req, res) => {
  const newUser = new User({
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAAAAAB3tzPbAAACOUlEQVR4Ae3aCQrrIBRG4e5/Tz+CBAlIkIAECUjoSt48z/GZeAvnrMCvc6/38XzxAAAAYC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAMCAAAAAAAAAAAAAAAAPsagz4V4rq/FmCLTj/k4vYqgCN5/TKfjlcAJKff5pJ5QPH6Y77YBiz6a4thQJ30D03VKmB3+qfcbhOwO+l+waP/+VsEBgDV6USumgNMOtVkDbDoZIstQNHpiimA1+m8JUBSQ8kO4HBqyB1mAElNJTMAr6a8FcCmxjYjgKjGohGAU2POBmBXc7sJwKrmVhOAqOaiCUBQc8EEQO0JwPMB4ADASwhAe3yR8VPiP3/M8XOaPzQd/lLyp56xSuvnUGK0yHC313idCw6umNov+bhm5aK7fdWAZQ/WbdoXnlg5Y+mvfe2SxVdWj20FAAAAAAAAAAAAwFQAAJSS0hwmfVMIc0qlmAfsOQWvP+RDyrtNQM1L0D8WllxNAWqOXifzMVcbgG3xaswv22jAFp3a6zFteYw8fQ9DM6Amr275VG8GlFmdm8uNgDzpgqZ8EyB7XZTPNwDKpAubysWAOuvi5nolYHW6PLdeBjiCbikc1wCK0025cgUg68Zyf0DUrcXegKibi30Bq25v7QnYNKCtH+BwGpA7ugFmDWnuBSgaVOkECBpU6AOoGlbtAlg1rLULIGhYoQvAaViuC0AD6wE4Xh1QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA194CuqC6onikxXwAAAAASUVORK5CYII=",
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
    res.status(200).json({...hiding, authToken});
  } catch (err) {
    console.log(err); 
    res.status(505).json(err);
  }
});

module.exports = router;
