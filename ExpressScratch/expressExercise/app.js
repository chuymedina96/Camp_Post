var express = require("express");
var app = express();

app.get("/", function(req, res) {
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
    res.send("The " + animal + " goes " + "'" + sound + "'");
});
app.get("/repeat/:message/:times", function(req, res){
    var message = req.params.message.toUpperCase();
    var times = Number(req.params.times);
    var result = "";
    for (var i=0; i < times; i++) {
        result += message + " ";
    }
    res.send(result);
});

app.get("*", function(req, res){
    res.send("These are not the drones you are looking for.");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Serve has been started");
})