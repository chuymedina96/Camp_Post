var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hello there welcome to my assignment");
});
app.get("/sound/:animal", function(req, res){
    var sounds = {
        cow: "Mooo!",
        pig: "Oink!",
        dog: "Whoof whoof!",
        cat: "I will kill you human",
        fish: "..."
    };
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " + animal + " goes " + sound);
});
app.get("*", function(req, res){
    res.send("These are not the drones you are looking for.");
});
app.get("/repeat/hello/:number", function (req, res){
    var number = req.params.number;
    res.send("hello" * number);
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Serve has been started");
})