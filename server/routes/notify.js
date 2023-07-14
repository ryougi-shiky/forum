const router = require('express').Router();
const Notification = require('../models/Notification');
const Post = require('../models/Post');
const User = require('../models/User');

router.post('/sendFollowNotify', async(req, res) => {
    const newNotify = new Notification ({
        notifyFrom: req.body.senderId,
        notifyTo: req.body.receiverId,
        status: 'unread',
        type: 'follow',
        content: '',
    });
    try {
        const savedNotify = await newNotify.save();
        res.status(200).json(savedNotify);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;