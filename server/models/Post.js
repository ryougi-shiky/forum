const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    max: 500
  },
  img: {
    type: String
  },
  likes: {
    type: Array,
    default: []
  },
  comments: [{
    commenterId: String,
    commenterName: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
  }]
},
{timestamps: true}
)

module.exports = mongoose.model("Post", PostSchema);