var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index");
});
app.get("/fell/:thing/:chuy/:random", function(req, res){
    var thing = req.params.thing;
    var chuy = req.params.chuy;
    var random = req.params.random;
    res.render("love", {thingVar: thing, me:chuy, Random: random});
});
app.get("/posts", function(req, res){
    var posts = [
        {title: "Hangingin out enjoying this day", author: "me"},
        {title: "chillin", author: "chris"},
        {title: "coolin", author: "chuy"},
        {title: "aweomse", author: "lali"}
    ];
    res.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started!!");
})