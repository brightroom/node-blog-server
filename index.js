var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Post = require('./models/Post');
const fileUpload = require('express-fileupload');
mongoose.connect('mongodb://clint:strongpassword@ds219100.mlab.com:19100/blog_thoughts');




var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());







//CREATE ROUTE OR ENDPOINT
app.get('/create',function(req,res){
    
    res.render('pages/create',{title:'Create Post'});
});


//SAVE POST ROUTE OR ENDPOINT
app.post('/posts',function(req,res){
    
  
    //get our data
    var post = new Post();
    post.title = req.body.title;
    post.author = req.body.author;
    post.content = req.body.content;

    // if (req.files){
    //     let post_image = req.files.post_image;
    //     post_image.mv('./uploads/filename.jpg', function (err) {
    //         if (err)
    //             return res.status(500).send(err);

    //         // res.send('File uploaded!');
    //         console.log(post_image);
    //         console.log('FILE UPLOADED');
    //     });
    // }


    post.save(function (error) {
        if (error)
            res.send(err);


        res.redirect('/posts');
    });
    //redirect to the archive page


});

//GET SINGLE POST
app.get('/posts/:post_id',function(req,res){


    
    Post.findById(req.params.post_id, function (err, post) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('pages/post', {
                title: post.title,
                post:post
            });
        }
    });

});

//EDIT SINGLE POST
app.get('/posts/:post_id/edit', function (req, res) {


    Post.findById(req.params.post_id, function (err, post) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('pages/edit', {
                title: post.title,
                post: post
            });
        }
    });

});

//UPDATE SINGLE POST
app.post('/posts/:post_id/', function (req, res) {


    Post.findById(req.params.post_id, function (err, post) {
        if (err) {
            res.send(err);
        }
        else {

            post.title = req.body.title;
            post.author = req.body.author;
            post.content = req.body.content;

            post.save(function (err) {
                if (err)
                    res.send(err);



            res.render('pages/edit', {
                title: post.title,
                post: post
            });
        });
    }
    });

});


//GET ALL POSTS
app.get('/posts',function(req,res){

    Post.find(function (err, posts) {
        if (err)
            res.send(err);

        let data = {
            title :"All Posts",
            posts: posts
        }

        res.render('pages/posts', data);
 
    });

});

//HOMEPAGE ROUTE
app.get('/', function(req, res){

    let data = {
            title: "Home"
            }

    res.render('pages/index',data);
});


// ABOUT ROUTE 
app.get('/about', function (req, res) {
    let data = {
        title: "About"
    }
    res.render('pages/about',data);
});

//CONTACT ROUTE
app.get('/contact', function (req, res) {
    let data = {
        title: "Contact"
    }
    res.render('pages/contact',data);
});

//SERVICES ROUTE

app.get('/services',function(req,res){
    
    let data = {
        title: "services",
        services: ['Hosting','Deployment','Design','Development']
    }

    res.render('pages/services',data);
});

//DELETE POST

app.get('/posts/:post_id/delete',function(req,res){

    Post.deleteOne({ _id: req.params.post_id }, function (err) {
        if (err) return handleError(err);
            res.redirect('/posts');
    });

})


app.listen(8080);
