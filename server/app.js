var express = require('express');
	app = express(),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    config = require('./config/config.js'),
    ConnectMongo = require('connect-mongo')(session),
    mongoose = require('mongoose').connect(config.dbURL),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

app.use(cookieParser());
var env = process.env.NODE_ENV || 'development';

if(env == 'development') {
    app.use(session({secret : config.sessionSecret}));
} else {
    app.use(session({
        secret : config.sessionSecret,
        store : new ConnectMongo({
            url : config.dbURL,
            stringfy : true
        })
    }))
}

/*var userSchema = mongoose.Schema({
    username : String,
    password : String,
    fullname : String
});

var Person = mongoose.model('users', userSchema);

var John = new Person({
    username : 'anuj.jain',
    password : 'anujjain',
    fullname : 'Anuj Jain'  
});

John.save(function(err){
    console.log('Done!');
});*/

app.use(passport.initialize());
app.use(passport.session());




require('./routes/routes.js')(express, app, passport, config)

require('./auth/passportAuth.js')(passport, FacebookStrategy, config, mongoose);

app.listen(3000, function(){
	console.log('Working on port 3000');
});