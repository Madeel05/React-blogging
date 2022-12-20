const router = require('express').Router();
const Post = require("../models/posts");

const {
  verificationToken,
  verificationTokenAndAuthorization
} = require("../tokenVerify");

//add post

router.post('/', verificationToken, async (req, res) => {
  const userId = req.query.userId;
  const postData = new Post({
    userId: userId,
    title: req.body.title,
    username: req.body.username,
    email: req.body.email,
    description: req.body.description,
  })
  try {
    const post = await postData.save();
    res.status(200).json(post);
  } catch (err) {
    res.json(err);
  }

});

// get posts

router.get('/', verificationToken, async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.json(err);
  }
});

//post count by user id

router.get('/count', verificationToken, async (req, res) => {
  const id = req.query.userId;
  try {
    const count = await Post.find({ userId: id }).count();
    res.status(200).json(count);
  } catch (error) {
    res.status(404).json(error)
  }
});

//post by user id

router.get('/user', verificationToken, async (req, res) => {
  const id = req.query.userId;
  try {
    const count = await Post.find({ userId: id });
    res.status(200).json(count);
  } catch (error) {
    res.status(404).json(error)
  }
});


// likes by post id

router.post('/like/:id', verificationToken, async (req, res) => {
  const id = req.query.userId;
  const postId = req.params.id;
  const prevPost = await Post.findOne({ _id: postId, likes: { $in: [id] } });
  if (!prevPost) {
    try {
      const postLike = await Post.findByIdAndUpdate(postId, {
        $push: { "likes": id }
      })
      res.json(postLike).status(200);
    } catch (error) {
      res.json(error).status(404);
    }
  } else {
    try {
      const postLike = await Post.findByIdAndUpdate(postId, {
        $pull: { "likes": id }
      })
      res.status(201).json(postLike);
    } catch (error) {
      res.json(error).status(404);
    }
  }
});
module.exports = router;

