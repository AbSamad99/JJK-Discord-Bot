/*Schema for the debate document*/

const mongoose = require('mongoose');

const DebateSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  names: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('DebateSchema', DebateSchema);
