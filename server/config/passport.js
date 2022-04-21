//***modules for authentication
const passport = require("passport");
const passportJWT = require("passport-jwt");
let userModel = require("../models/user.model");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());
  let User = userModel.User;

  //***implement a User Authentication Strategy
  passport.use(User.createStrategy());

  //serialize and deserialize the User info
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  //***To verify whether the token is being sent by the user and is valid*/
  const config = require("./config");
  let jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = config.Secret;

  //***find user from database
  let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then((user) => {
        return done(null, user);
      })
      .catch((err) => {
        return done(err, false);
      });
  });

  passport.use(strategy);
};
