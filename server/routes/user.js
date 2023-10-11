const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const multer = require("multer"); //Handle uploading file

const upload = multer({
  limits: {
    fileSize: 256000, // limit icon size to 256KB
  },
});

// update users
router.put("/update/:id", async (req, res) => {
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
router.delete("/delete/:id", async (req, res) => {
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
router.get('/', async (req, res) => {
	const uid = req.query.uid;
	const username = req.query.username;
	console.log("uid: ", uid, " username: ", username);
	try {
		const user = uid 
			? await User.findById(uid)
			: await User.findOne({username: username});
		// const user = await User.findById(uid);
		const {password, updatedAt, ...other} = user._doc;
		res.status(200).json(other);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// get friends
router.get('/friends/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const friends = await Promise.all(
			user.followings.map(friendId => {
				return User.findById(friendId);
			})
		)
		let friendList = [];
		friends.map(friend => {
			const {_id, username, profilePicture} = friend;
			friendList.push({_id, username, profilePicture});
		});
		res.status(200).json(friendList);
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

// update profile picture
router.put("/:id/profilePicture", upload.single("profilePicture"), async (req, res) => {
	// console.log("req: ", req); 
	console.log("req.file: ", req.file); 
	console.log("req.file.buffer: ", req.file.buffer);
	console.log("req.body.userId: ", req.body.userId);
	console.log("req.params.id: ", req.params.id);
	if (req.body.userId === req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			// update profile picture with the new file
			user.profilePicture = req.file.buffer;
			await user.save();
			res.status(200).json("Profile picture has been updated");
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json("You can only update your own profile picture");
	}
});

// update user's info
router.put("/update/userinfo/:id", async (req, res) => {
	// if (req.body.id === req.params.id || req.body.isAdmin){
		  // set new password
	//   if (req.body.password){
	// 	try {
	// 	  const salt = await bcrypt.genSalt(10);
	// 	  req.body.password = await bcrypt.hash(req.body.password, salt);
	// 	} catch (err){
	// 	  return res.status(500).json("Password invalid!\n", err);
	// 	}
	//   }
	  try {
		// Include age and from fields here
		const updatedUser = await User.findByIdAndUpdate(req.params.id, 
			{ $set: { age: req.body.age, from: req.body.from } }, { new: true });
		const {password, updatedAt, ...other} = updatedUser._doc;
		res.status(200).json(other);
	  } catch (err) {
		return res.status(500).json(err);
	  }
	// } else {
	//   return res.status(403).json("You can only update your own account !");
	// }
  });
  

module.exports = router;