const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

// create a post
router.post('/create', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post
router.put('/update/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.uid === req.body.uid){
      await post.updateOne({$set: req.body});
      res.status(200).json("The post has been updated");
    } else {
      res.status(403).json("You can only update your posts");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a post
router.delete('/delete/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.uid === req.body.uid){
      await post.deleteOne();
      res.status(200).json("The post has been deleted");
    } else {
      res.status(403).json("You can only delete your posts");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// like/dislike a post
router.put('/like/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.uid)){
      await post.updateOne({$push: {likes: req.body.uid}});
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({$pull: {likes: req.body.uid}});
      res.status(200).json("The post has cancelled liked");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  
})

// get a post
router.get('/getpost/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// get timeline posts
router.get('/timeline', async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.uid);
    const userPosts = await Post.find({ uid: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map(friendID => {
        return Post.find({ uid: friendID });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})


module.exports = router;