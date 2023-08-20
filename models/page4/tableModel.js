const mongoose = require('mongoose');

const schema5Schema = new mongoose.Schema({
  files: [{
    path: String,
    type: { type: String, enum: ['image'] }
  }],
  notes: String
});

const Schema5Model = mongoose.model('Schema5', schema5Schema);

module.exports = Schema5Model;
