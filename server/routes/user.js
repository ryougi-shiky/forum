const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.send('Users');
});

// update users
router.put("/:id", async (req, res) => {
  if (req.body.id === req.params.id || req.body.isAdmin){
		// set new password
    if (req.body.password){
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err){
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Account has been updated');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only account !");
  }
});

// delete users
router.delete("/:id", async (req, res) => {
  if (req.body.id === req.params.id || req.body.isAdmin){
    
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Account has been deleted');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can't delete this account !");
  }
});
// get users
router.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const {password, updatedAt, ...other} = user._doc;
		res.status(200).json(other);
	} catch (err) {
		return res.status(500).json(err);
	}
})
// follow users
router.put('/:id/follow', async (req, res) => {
	// make sure not follow myself
	if (req.body.id !== req.params.id) {
		try {
			const user = await User.findById(req.params.id); // the user you want to follow
			const currentUser = await User.findById(req.body.id); 
			if (!user.followers.includes(req.body.id)){
				await user.updateOne({$push: {followers: req.body.id}});
				await currentUser.updateOne({$push: {followings: req.params.id}});
				res.status(200).send(`You are following ${user.username}` );
			} else {
				res.status(403).json("You already follow this user");
			}
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can't follow yourself");
	}
})
// unfollow users
router.put('/:id/unfollow', async (req, res) => {
	// make sure not follow myself
	if (req.body.id !== req.params.id) {
		try {
			const user = await User.findById(req.params.id); // the user you want to follow
			const currentUser = await User.findById(req.body.id); 
			if (user.followers.includes(req.body.id)){
				await user.updateOne({$pull: {followers: req.body.id}});
				await currentUser.updateOne({$pull: {followings: req.params.id}});
				res.status(200).send(`You unfollowed ${user.username}` );
			} else {
				res.status(403).json("You already unfollow this user");
			}
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can't unfollow yourself");
	}
})

module.exports = router;