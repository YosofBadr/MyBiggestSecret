// Test application for Passport.js user authentication - following Colt Steele

var express = require('express');
var mongoose = require('mongoose');

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