/*Schema for the art document*/

const mongoose = require('mongoose');

const ArtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a Name'],
  },
  links: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('ArtSchema', ArtSchema);
