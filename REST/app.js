var express             = require("express"),
    app                 = express(),
    bodyParser          = require('body-parser'),
    request             = require("request"),
    mongoose            = require("mongoose"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require('express-sanitizer');

mongoose.connect("mongodb://localhost/REST");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);
//RESTful ROUTER
app.get("/", function(req, res){
    res.render("landing");
});
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("Oh no you ran into an error");
            console.log(err);
        } else{
            res.render("index", {blogs: blogs});   
        }
    });
});
app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/blogs");
        }
    });
});
app.get("/blogs/new", function(req, res){
    res.render("new");
});
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else{
            res.render("show", {blog: foundBlog}); 
        }
    });
});
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else{
            res.render("edit", {blog: foundBlog}); 
        }
    });
});
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog, function(err, updatesBlog){
        if(err){
            console.log(err);
            res.redirect("/edit");
        } else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs");
        }
    });
});
app.get("*", function(req, res){
    res.send("404, go back now!! before its too late!");
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started! Hurray!");
});