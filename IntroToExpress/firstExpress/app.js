var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hello world");
});
app.get("/bye", function(req, res){
    res.send("Goodbye!");
});
app.get("/dog", function(req, res){
    console.log("Someone made a request for a dog");
    res.send("whoof");
});
app.get("/r/:subredditName", function(req, res){
    var subredditName = req.params.subredditName;
    res.send("Welcome to the " + subredditName.toUpperCase() + " Subreddit!");
});
//Reddit example
app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    console.log(req.params);
    res.send("Welcome to the comments page");
});
//
app.get("*", function(req, res){
    res.send("These aren`t the drones you are looking for");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});