var express             = require("express"),
    app                 = express(),
    mongoose            = require("mongoose"),
    bodyParser          = require ("body-parser"),
    request             = require("request"),
    expressSanitizer    = require('express-sanitizer'),
    methodOverride      = require('method-override');
    

mongoose.connect("mongodb://localhost/REST");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

var postSchema = new mongoose.Schema({
    title:  String,
    image:  String,
    body:   String,
    created: {type: Date, default: Date.now}
});
var Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){
    res.render("landing"); 
});

app.get("/blogs", function(req, res){
    Post.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else{
            res.render("index", {blogs: blogs});
        }
    });
});
app.get("/blogs/new", function(req, res){
    res.render("new");
});
app.get("/blogs/:id", function(req, res){
    Post.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else{
            res.render("show", {blog: foundBlog}); 
        }
    });
});
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Post.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/blogs");
        }
    });
});
app.get("/blogs/:id/edit", function(req, res){
    res.render("edit");
});
app.get("/blogs/:id/show", function(req, res){
    res.render("show");
});
app.get("*", function(req, res){
    res.send("404 PAGE NOT FOUND SORRY!");
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Sever has started!!! Hurray :)");
});
    