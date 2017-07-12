var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index");
});
//in the global scope 
var friends = ["Chuy", "Lali", "Jovanny", "Alan"];
app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});
app.post("/friends", function(req, res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
    console.log("Successfully posted");
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started!!");
});