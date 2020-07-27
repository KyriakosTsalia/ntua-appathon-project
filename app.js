const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const request = require("request");

const port = 3000;
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("index", {port: port})
});

app.get("*", function(req, res){
  res.send("Error 404, page not found");
});


app.listen(port, function(req,res){
  console.log("Server running on port $port...")
});
