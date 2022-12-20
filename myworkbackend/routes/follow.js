const router = require('express').Router();
const Follow = require('../models/follow');
const {
  verificationToken,
  verificationTokenAndAuthorization
} = require("../tokenVerify");

router.post('/:id', verificationToken, async (req, res) => {
  userId_2 = req.params.id;
  userId_1 = req.query.userId;
  const pre = await Follow.findOne({ userId_1: userId_1, userId_2: userId_2 });
  if (!pre) {
    const newFollow = new Follow({
      userId_1: userId_1,
      userId_2: userId_2
    });
    try {
      const follow = await newFollow.save();
      res.status(200).json(follow);
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    try{
      const deleteFollow = await Follow.deleteOne({userId_1: userId_1, userId_2: userId_2});
      res.status(201).json(deleteFollow);
      // res.status(401).json('Deleted');
    }catch(error){
      res.status(404).json(error);
    }
   
  }
});

router.get('/checkFollow/:id', verificationToken, async (req, res) => {
  userId_2 = req.params.id;
  userId_1 = req.query.userId;
  try {
    const pre = await Follow.findOne({ userId_1: userId_1, userId_2: userId_2 });
    if (!pre) {
      res.status(201).json('Not Find');
    } else {
      res.status(200).json('find');
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get('/followers/count', verificationToken, async (req, res) => {
  const id = req.query.userId;
  try {
    const count = await Follow.find({ userId_2: id }).count();
    res.status(200).json(count);
  } catch (error) {
    res.status(404).json(error)
  }
});

router.get('/following/count', verificationToken, async (req, res) => {
  const id = req.query.userId;
  try {
    const count = await Follow.find({ userId_1: id }).count();
    res.status(200).json(count);
  } catch (error) {
    res.status(404).json(error)
  }
});

router.get('/following', verificationToken, async (req, res) => {
  const id = req.query.userId;
  try {
    const count = await Follow.find({ userId_1: id });
    res.status(200).json(count);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get('/followers', verificationToken, async (req, res) => {
  const id = req.query.userId;
  try {
    const count = await Follow.find({ userId_2: id });
    res.status(200).json(count);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router