const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

// register
router.post('/register', async (req, res) => {
  try {
    // Check if username exists
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(400).json({ type: "unameDupErr", message: "Username already taken. Please try another one." });
    }

    const existingEmail = await User.findOne({ email: req.body.email });

    if (existingEmail) {
      return res.status(400).json({ type: "emailDupErr", message: "Email already taken. Please try another one." });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(req.body.password, salt);

    // create user instance
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPwd,
    });

    // store it in database
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err); // log the error on server
    res.status(500).json({ message: err.message }); // send detailed error message to client
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
  console.log("login req.body: ", req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("user not exist");
    }

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json("wrong password");
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
  }
});

// Google 登录路由
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Google 登录回调
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    session: true
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}`);
  }
);

// 获取当前用户信息
router.get('/current-user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// 退出登录
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${process.env.CLIENT_URL}`);
});

module.exports = router;