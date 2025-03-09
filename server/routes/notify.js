const router = require('express').Router();
const Notification = require('../models/Notification');
const Post = require('../models/Post');
const User = require('../models/User');

router.post('/create/follow', async(req, res) => {
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

router.get('/get/follow/:receiverId', async(req, res) => {
    try {
        const followNotify = await Notification.find({
            notifyTo: req.params.receiverId,
            type: 'follow',
            status: 'unread',
        });

        let notifySenders = [];
        
        for (let notify of followNotify) {
            const user = await User.findById(notify.notifyFrom); // Assuming `User` is your user model
            
            let notifyDetail = {
                senderId: notify.notifyFrom,
                senderName: user.username,
                senderIcon: user.profilePicture,
                nid: notify._id
            };
            
            notifySenders.push(notifyDetail);
        }

        res.status(200).json(notifySenders);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/delete/follow/:id", async (req, res) => {
    try {
        const notify = await Notification.findById(req.params.id);
        console.log("deleting notification: ", req.params.id);

        await notify.deleteOne();
        console.log("Notification has been deleted");
        res.status(200).json("The notification has been deleted");
    } catch (err) {
        res.status(500).json("Failed to fetch this notification");
    }
});

module.exports = router;