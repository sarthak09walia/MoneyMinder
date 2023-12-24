var User = require("../Database/models/user.js");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var config = require("../Config/config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = () => {
  var strategy = new Strategy(params, async function (payload, done) {
    try {
      var user = await User.findById(payload.id);
      if (payload.expire <= Date.now()) {
        return done(new Error("TokenExpired"), null);
      } else {
        return done(null, user);
      }
    } catch (err) {
      return done(new Error("UserNotFound"), null);
    }
  });

  passport.use(strategy);

  return {
    initialize: function () {
      return passport.initialize();
    },
  };
};
