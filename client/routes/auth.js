const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// register
router.post('/register', async (req, res) => {
  try {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);

    // create user instance
    const newUser = new User ({
      username: req.body.username,
      email: req.body.email,
      password: hashedPwd,
    });

    // store it in database
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err){
    res.status(500).json(err);
  }
  // Get method: 
  // const user = await new User({
  //   username: "ryougi",
  //   email: "ryougikalan@gmail.com",
  //   password: "yzm7046406"
  // })
  // await user.save();
  // res.send(user.username + " created");
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user){
      res.status(404).json("user not exist");
    }

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword){
      res.status(400).json("wrong password");
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
  
})
module.exports = router;