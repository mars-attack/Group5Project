let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

let jwt = require("jsonwebtoken");
let config = require("../config/config");

let userModel = require("../models/user.model");
let User = userModel.User; // alias

module.exports.getPatients = (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: users.filter((x) => x.userType === "patient"),
      });
    }
  });
};
module.exports.getUser = (req, res, next) => {
  const id = req.params.id
  User.findById({ _id: id }, (err, user) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {

      res.json({
        success: true,
        data: user,
      });
    }
  });
};

module.exports.getNurses = (req, res, next) => {
  User.find((err, users) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.json({
        error: err,
        data: users.filter((x) => x.userType === "nurse"),
      });
    }
  });
};

// * controller for processing Login page
module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server err?
    if (err) {
      return next(err);
    }
    //is there a user login error?
    if (!user) {
      return res.json({ success: false, msg: "Error: failed to Log In User!" });
    }

    req.login(user, (err) => {
      // server error?
      if (err) {
        return next(err);
      }

      // const payload = { ...user }; // copy of found user
      const payload =  {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        userType: user.userType
    }
      const authToken = jwt.sign(payload, config.Secret, {
        expiresIn: 604800, // 1 week
      });

      return res.json({
        success: true,
        msg: "User Logged in Successfully!",
        user: payload,
        token: authToken,
      });
    });
  })(req, res, next);
};

//* controller for processing registration page
module.exports.processRegisterPage = (req, res, next) => {
  // define a new user object
  let newUser = new User({
    email: req.body.email,
    name: req.body.name,
    address: req.body.address,
    userType: req.body.userType,
  });
  console.log(newUser);
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log(err);
      if (err.name == "UserExistsError") {
        return res.json({
          success: false,
          msg: "Registration failed, please try again.",
        });
      }
      return res.json({
        success: false,
        msg: "Error: failed to register user.",
      });
    } else {
      // if no error exists, then registration is successful
      return res.json({ success: true, msg: "User Registered Successfully!" });
    }
  });
};

//* controller for update user
module.exports.processUpdateUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const newPassword = req.body.newPassword;
  const newAddress = req.body.address;
  const newName = req.body.name;
  const newuserType= req.body.userType;

  User.findByUsername(email).then(
    (foundUser) => {
      if (foundUser) {
        foundUser.changePassword(password, newPassword, async (err) => {
          if (err) {
            console.log("Please check password");
            res.json({ success: false, msg: "Please check password" });
          } else {
            // if passwords match, update displayname and date updated
            User.updateOne(
              { _id: foundUser._id },
              {
                name: newName,
                address: newAddress,
                userType: newuserType
              },
              (err) => {
                // there should be no error since we searched for the user before
              }
            );
            foundUser.save();
            res.json({ success: true, msg: "User successfully updated." });
          }
        });
      } else {
        res
          .status(500)
          .json({ success: false, msg: "This user does not exist" });
      }
    },
    (err) => {
      console.error(err);
    }
  );
};

//* controller for processing logout
module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.json({ success: true, msg: "User successfully logged out!" });
};
