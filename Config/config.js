const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  jwtSecret: process.env.JWT_KEY,
  jwtSession: { session: false },
};
// jwtSecret: process.env.JWT_KEY,
