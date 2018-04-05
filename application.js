var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var session = require("express-session");

const app = express();

//load posts
var Post = require("./models/post");
//connecting to mongodb database
mongoose.connect("mongodb://localhost/blogdb");
var db = mongoose.connection;


//check if connected to mongodb database
db.once("open", ()=>{
    console.log("Connected to DataBase...")
});
//check for db errors
db.on("error", (err) =>{
  console.log(err);
});

//viewEngine EJS
app.set("view engine", "ejs");
app.set("/views", path.join(__dirname, "/views"));


// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//static files
app.use("/public", express.static(__dirname + "/public"));
//express-session middleware
app.use(session({
  secret: '123456789',
  resave: true,
  saveUninitialized: true
}));
//connect-flash, express-messages middleware
app.use(require('connect-flash')());
app.use((req, res, next) =>{
  res.locals.messages = require('express-messages')(req, res);
  next();
});
//express-validator middleware
app.use(expressValidator({
 errorFormatter: (param, msg, value) =>{
  var namespace = param.split('.'),
  root = namespace.shift(),
  formParam = root;

  while(namespace.length){
   formParam += '[' + namespace.shift() + ']';
  }
  return{
   param : formParam,
   msg : msg,
   value : value
  };
 }
}));



//sets which doc is home screen
app.get("/", (req,res) => {
  Post.find({}, (err, posts) =>{
    if(err){
      console.log(err);
    }
    else{
      res.render("index",{
        title:"Blog Posts",
        posts : posts
      });
      console.log("Home Page Accessed...");
    }
  });
});

//posts pages
app.get('/post/:id', (req, res) =>{
  Post.findById(req.params.id, (err, post) =>{
    res.render('post',{
      post:post
    });
    console.log("Indv Post Accessed...");
  });
});

//add get page
app.get('/blog/post', (req, res) =>{
  res.render('add_blog',{
    title:"Add Forum Post"
  });
  console.log("Creat post Page Accessed...");
});

//add save("submit"/"post") post for mongodb database using post requests
app.post('/blog/post', (req, res) =>{
  req.checkBody("title", "Title is required").notEmpty();
  req.checkBody("auther", "Auther is required").notEmpty();
  req.checkBody("post", "Post is required").notEmpty();
      //catch errors
      var errors = req.validationErrors();
      if(errors){
        res.render("add_blog", {
          title:"Add Forum Post",
          errMsg:"Please fill in all the criteria",
          errors:errors
        });
      } else{
        var post = new Post();
        var timestamp = new Date;
        post.title = req.body.title;
        post.auther = req.body.auther;
        post.post = req.body.post;
        post.timestamp = timestamp;
        post.save((err) =>{
          if(err){
            console.log(err);
            return;
          }
          else{
            res.redirect('/');
          }
          console.log("New Post Added!");
        });
      }
});

//add edit post page
app.get('/post/edit/:id', (req, res) =>{
  Post.findById(req.params.id, (err, post) =>{
    res.render('edit_post',{
      title:"Edit Forum Post",
      post:post
    });
    console.log("Edit Post Page Accessed...");
  });
});

//add edit page post function
app.post('/blog/edit/:id', (req, res) =>{
  var post = {};
  var timestamp = new Date;
  post.title = req.body.title;
  post.auther = req.body.auther;
  post.post = req.body.post;
  post.timestamp = timestamp;
  var edit = {_id:req.params.id}

  Post.update(edit, post, (err) =>{
    if(err){
      console.log(err);
      return;
    }
    else{
      res.redirect('/');
    }
  });
});

//add delete function
app.delete("/post/:id", (req, res) =>{
  var query = {_id:req.params.id}

  Post.remove(query, (err) =>{
    if(err){
      console.log(err);
    }
    res.send("Deleted");
  })
})



app.listen(5000, () =>{
  console.log("Server started on for 5000...")
});
