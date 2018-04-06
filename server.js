var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');

var app = express();

// this is the line that tells our server to use the "/static" folder for static content
// app.use(express.static(__dirname + "/static"));
// two underscores before dirname
app.use(session({secret: 'rangersleadtheway'}));  // string for encryption

// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');
// This sets the location where express will look for the ejs views
app.set('views', path.join(__dirname, '/views')); 

app.get("/", function(req, res){
    if(!req.session['count']){
        req.session['count']=0;
    };
    req.session['count'] += 1;
    // response.send("<h1>Counter</h1><p>" + counter + " times.");
    res.render('index', {counter: req.session.count});
});
app.get("/addtwo", function(req, res){
    req.session['count'] += 1;
    res.redirect('/');
});

app.get('/reset', function(req, res){
    req.session['count']=0;
    res.redirect('/');
});

app.listen(8001, function(){
    console.log('Running a new Express project on port 8001');
});
