//* modules for user Model
let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

//***schema for users
let userSchema = mongoose.Schema
(
  {
    name: 
    {
      type: String,
      default: 0,
      trim: true,
      required: 'Name is required'
    },
    email: 
    {
      type: String,
      trim: true,
      required: 'Email Address is required'
    },
    address: {
      type: String,
      default: '',
      trim: true,
      required: 'Address is required'
    },
    userType: {
      type: String,
      enum : ['nurse','patient'],
      default: 'patient',
      required: 'Account type is required'
    }
  },
  {
    collection: "users"
  }
);

//***configure options for User Model
let options = ({ missingPasswordError: 'Wrong/ Missing Password', usernameField : 'email'});

userSchema.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', userSchema);
