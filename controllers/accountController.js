const User = require("../Database/models/user");
const config = require("../Config/config.js");
const jwt = require("jwt-simple");

exports.login = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      var payload = {
        id: user.id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
      };

      var token = jwt.encode(payload, config.jwtSecret);

      res.json({ token: token });
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

exports.register = (req, res) => {
  User.register(
    new User({
      email: req.body.email,
      username: req.body.username,
    }),
    req.body.password,
    function (err, msg) {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
};

exports.profile = (req, res) => {
  res.json({
    message: "You made it to the secured profile",
    user: req.user,
    token: req.query.secret_token,
  });
};
