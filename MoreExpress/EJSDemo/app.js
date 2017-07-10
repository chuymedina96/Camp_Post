var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.render("index.ejs");
});
app.get("/fell/:thing/:chuy", function(req, res){
    var thing = req.params.thing;
    var chuy = req.params.chuy;
    res.render("love.ejs", {thingVar: thing, me:chuy});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started bitch!!!");
})