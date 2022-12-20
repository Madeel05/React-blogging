const User = require("../models/user");
const CryptoJS = require("crypto-js");
const router = require("express").Router();
const {
  verificationToken,
  verificationTokenAndAuthorization
} = require("../tokenVerify");


// user by id
router.get("/:id", verificationTokenAndAuthorization, async (req, res) => {
  const userdata = await User.findById(req.params.id);
  try {
    const { password, ...hiding } = userdata._doc
    res.json(hiding).status(200);
  } catch (err) {
    res.json(err).status(404);
  }
});

//Update user by id
router.put('/:id', verificationTokenAndAuthorization, async (req, res) => {
  const userdata = await User.findById(req.params.id);
  if (!userdata) {
    res.status(404).json('Data not found or user id is wrong');
  }

  if (req.body.password) {
    req.body.password = CryptoJS.ASE.encrypt(
      req.body.password,
      process.env.SECRET_PASSWORD_KEY
    ).toString();
  }

  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
     const { password, ...hiding } = updateUser._doc;
    res.status(200).json(hiding);
    console.log('gg');
  } catch (err) {
    res.status(404).json(err);
    console.log('not');
  }

});

//latest user get
router.get("/latestUser/:count",verificationToken, async (req, res) => {
  const count = req.params.count;
  try {
    const userLatest = await User.find({_id:{$nin:req.user.id}}).sort({ _id: -1 }).limit(count);
    res.status(200).json(userLatest);
  } catch (err) {
    res.status(404).json(err)
  }
});


//random user get
router.get("/random/:count", verificationToken, async (req, res) => {
  const count = req.params.count;
  try {
    const userRandom = await User.find({_id:{$nin:req.user.id}}).limit(count);
    const randomUsers = userRandom.sort(() => Math.random() - 0.5);
    res.status(200).json(randomUsers);
  } catch (err) {
    res.status(404).json(err)
  }
});


//follow data
router.get("/userdata/:id", verificationToken, async (req, res) => {
  try {
    const userdata = await User.findById(req.params.id);
    const { password, ...hiding } = userdata._doc
    res.json(hiding).status(200);
  } catch (err) {
    res.json(err).status(404);
  }
});




module.exports = router;
