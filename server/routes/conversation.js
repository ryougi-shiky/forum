const router = require("express").Router();
const Conversation = require("../models/Conversation");

// create conversation
router.post("/", async (req, res) => {
  console.log("req.body: ", req.body);
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId]
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversation of a user
router.get("/:uid", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: {
        $in: [req.params.uid]
      }
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversations include two uid
router.get('/find/:firstUID/:secondUID', async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: {$all: [req.params.firstUID, req.params.secondUID]},
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;