const { getSecretKey } = require("./src/helpers");
const { ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const User = require('./src/models/User');
const path = require("path");
const session = require("express-session");
const express = require('express');
const getUserPermissions = require("./src/helpers/authorization/getUserPermissions");

const userController = require('./src/controllers/user/userController');
const roleController = require("./src/controllers/role/roleController");
const permissionController = require("./src/controllers/permission/permissionController");
const rolePermissionController = require("./src/controllers/rolePermission/rolePermissionController");
const controlPermission = require("./src/helpers/authorization/controlPermission");
const permissionDefinitions = require("./src/definitions/permissions");

require("./db");
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: getSecretKey(),
};

const app = express();

passport.use(
    new JwtStrategy(options, async (payload, done) => {
        try {
        const user = await User.findById(payload.id);
        if (
            payload.password == user.password &&
            payload.username == user.username
        ) {
            user.roles = await getUserPermissions(user.roleId);
            if (user) {
            return done(null, user);
            }
        }
        return done(null, false);
        } catch (err) {
        return done(err, false);
        }
    })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
        
      done(null, user);
    })
    .catch((err) => done(err));
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: getSecretKey(),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/',passport.authenticate('jwt', { session: false }),(req, res) => {
  return res.send();
});

const _userController = userController();
app.post("/signin", (req, res) => _userController.signIn(req, res));
app.post("/signup", (req, res) => _userController.signUp(req,res));

const _roleController = roleController();
app.post(
  "/roles",
  passport.authenticate('jwt', { session: false })
  ,async (req, res) => {
  await controlPermission(req,res,permissionDefinitions.rolePermissionDefinitions.create,_roleController.createRole);
});

const _permissionController = permissionController();
app.post("/permissions", (req, res) => _permissionController.createPermission(req, res));

const _rolePermissionController = rolePermissionController();
app.post("/permissions/assignPermissionToRole", (req, res) => _rolePermissionController.assignPermissionToRole(req, res));

app.listen(3565, () => {
  console.log('Server started on port 3565');
});