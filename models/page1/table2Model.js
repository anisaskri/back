const mongoose = require('mongoose');

const schema2Schema = new mongoose.Schema({
  date: String,
  poste: String,
  heures: [String],
  values: [[Boolean]],

},{timestamps : true});

const Schema2Model = mongoose.model('Schema2', schema2Schema);

module.exports = Schema2Model;
