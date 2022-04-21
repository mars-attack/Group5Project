const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a model class
const motivationModel = Schema({
  nurse: {
    type: Schema.ObjectId,
    ref: 'User' // User with userType as 'nurse'
  },
  date: 
  {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['text', 'video'],
    default: 'message'
  },
  contents: String
},
{
  collection: "motivation"
});

module.exports = mongoose.model('Motivation', motivationModel);