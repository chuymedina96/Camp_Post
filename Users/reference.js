var express     = require("express"),
    reference   = express(),
    mongoose    = require("mongoose");
    
mongoose.connect("mongodb://localhost/Users_2");
var postSchema = new mongoose.Schema({
    title: String,
    body: String
});
var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});
var User = mongoose.model("User",userSchema);

Post.create({
    title: "How to cook the best burger pt 2",
    body: "blah blah blah"
}, function(err, post){
    User.findOne({email: "bob96@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                }
            });
        }
    });
});
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
*/
reference.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started! Hurray!");
});