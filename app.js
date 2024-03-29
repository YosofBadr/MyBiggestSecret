// Test application for Passport.js user authentication - following Colt Steele

// Import required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://localhost:27017/user_auth_demo", { useNewUrlParser: true, useUnifiedTopology: true }); 

// Import user model 
var User = require("./models/user");

var app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
  secret: "Just a few English words",
  resave: false,
  saveUninitialized: false
}));

// Passport Config
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ========= Routes =========

// Root Route - The homepage
app.get("/", function(req, res){
  res.render("home");
});

// Secrete Route - Can only be accessed once the user is autherised
app.get("/secret", isLoggedIn, function(req, res){
  res.render("secret");
});

// Show Route - Displays registration page
app.get("/register", function(req, res){
  res.render("register");
});

// Register Route - Handles user sign up
app.post("/register", function(req, res){
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/secret");
    });
  });
});

// Show Route - Displays login page
app.get("/login", function(req, res){
  res.render("login");
});

// Login Route - Handles user login
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login" }), 
    function(req, res) {
      res.render("login");
});

// Show Route - Displays login page
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

// Middleware to ensure a user is logged in when accessing the secret page
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

app.listen(3000, function() {
  console.log("App listening on port 3000");
});