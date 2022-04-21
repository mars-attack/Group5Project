const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alertModel = Schema({
  patient: {
    type: Schema.ObjectId,
    ref: 'User' // userType patient
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  isChecked: {
    type: Boolean,
    default: false
  },
  dateChecked: Date,
  checkedBy: {
    type: Schema.ObjectId,
    ref: 'User' // userType nurse
  }
},
{
  collection: "alert"
});

module.exports = mongoose.model('Alert', alertModel);