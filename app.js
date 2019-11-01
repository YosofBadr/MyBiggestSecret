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

app.use(require("express-session")({
  secret: "Just a few English words",
  resave: false,
  saveUninitialized: false
}));

// Passport Config
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// ========= Routes =========


app.get("/", function(req, res){
  res.render("home");
});

app.get("/secret", function(req, res){
  res.render("secret");
});

app.listen(3000, function() {
  console.log("App listening on port 3000");
});