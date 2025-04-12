const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 2,
    max: 20,
    unique: true
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 15,
    required: function () {
      return !this.googleId; // only non Google login user need password
    }
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true // allow null
  },
  profilePicture: {
    type: Buffer,
    default: null,
  },
  googleProfilePicture: {
    type: String,
    default: null
  },
  followers: {
    type: Array,
    default: []
  },
  followings: {
    type: Array,
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  desc: {
    type: String,
    max: 50
  },
  age: {
    type: Number,
    min: 0,
    max: 200
  },
  from: {
    type: String,
    max: 20
  },
  // relationship: {
  //   type: Number,
  //   enum: [1, 2, 3],
  // }
},
  { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema);