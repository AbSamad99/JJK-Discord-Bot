/*Schema for the user collection*/

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  id: {
    type: String,
    required: [true, 'Please add an id'],
  },
  avatarUrl: {
    type: String,
    required: [true, 'Please add an avatar url'],
  },
  avatar: {
    type: String,
  },
  strikes: {
    type: Number,
    required: [true, 'Please add number of strikes'],
  },
  discriminator: {
    type: String,
    required: [true, 'Please add discriminator'],
  },
});

module.exports = mongoose.model('UserSchema', UserSchema);
