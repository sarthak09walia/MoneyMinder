const express = require("express");
const app = express();
const User = require("./Database/models/user");
const accountController = require("./controllers/accountController");
const financeController = require("./controllers/financeController");
const LocalStrategy = require("passport-local");
const bodyParser = require("body-parser");
const passport = require("passport");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dotenv = require("dotenv");
dotenv.config();

require("./Middlewares/auth.js")();

const DbConnection = require("./Database/db.js");
DbConnection();
const session = require("express-session");

// http request logs
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(
  session({
    secret: "your secret",
    resave: false,
    saveUninitialized: true,
  })
);
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Introduction MoneyMinder");
});

app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  accountController.profile
);

app.post("/login", accountController.login);
app.post("/register", accountController.register);
app
  .route("/finance")
  .post(
    passport.authenticate("jwt", { session: false }),
    financeController.addFinanceInformation
  )
  .get(
    passport.authenticate("jwt", { session: false }),
    financeController.getFinanceInformation
  )
  .patch(
    passport.authenticate("jwt", { session: false }),
    financeController.patchFinanceInformation
  );

app.listen(8000, () => {
  //   console.log("Server started.");
});
