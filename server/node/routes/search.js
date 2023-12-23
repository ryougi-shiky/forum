const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

router.get('/users', async (req, res) => {
    const searchQuery = req.query.username;
    try {
        if (searchQuery.trim() !== ""){
            const users = await User.find({ username: { $regex: searchQuery, $options: 'i' } });
            res.status(200).json(users);
        } else {
            res.status(200).json([]);
        }        
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router;