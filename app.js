// Test application for Passport.js user authentication - following Colt Steele

// Import required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

// Import user model 
var User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/user_auth_demo", { useNewUrlParser: true, useUnifiedTopology: true }); 

var app = express();
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home");
});

app.get("/secret", function(req, res){
  res.render("secret");
});

app.listen(3000, function() {
  console.log("App listening on port 3000");
});