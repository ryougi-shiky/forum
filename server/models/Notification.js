const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    notifyFrom: {
        type: String,
        required: true
    },
    notifyTo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['read', 'unread'],
        default: 'unread'
    },
    type: {
        type: String,
        enum: ['likePost', 'follow'],
        required: true
    },
    content: { // If type is likePost, store the post _id here
        type: String,
        default: ''
    }

},{timestamps: true})

module.exports = mongoose.model("Notification", NotificationSchema);