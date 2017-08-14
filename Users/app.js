var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose");
    
mongoose.connect("mongodb://localhost/Users");
var postSchema = new mongoose.Schema({
    title: String,
    body: String
});
var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User",userSchema);
/*
var newUser = new User({
    email: "xitlaliavila8113@gmail.com",
    name:  "Lali Avila"
});
newUser.posts.push({
    title: "How to cook french toast!",
    body:  "First you need to ..."
});
newUser.save(function(err, user){
    if(err){
        console.log(err);
    } else{
        console.log(user);
    }
});
var newPost = new Post({
    title: "My First Post!",
    body:  "This is some test text!"
});
newPost.save(function(err, post){
    if(err){
        console.log(err);
    } else{
        console.log(post);
    }
});
*/
User.findOne({name: "Lali Avila"}, function(err, user){
    if(err){
        console.log(err);
    } else{
        user.posts.push({
            title: "3 Things I hate",
            body:  "Humid weather"
        });
        user.save(function(err, user){
            if(err){
                console.log(err)
            } else{
                console.log(user);
            }
        });
    }
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started! Hurray!");
});