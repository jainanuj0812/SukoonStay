var express = require('express');
	app = express(),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    config = require('./config/config.js'),
    ConnectMongo = require('connect-mongo')(session),
    mongoose = require('mongoose').connect(config.dbURL),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    rooms = [];

app.use(cookieParser(config.sessionSecret));
var env = process.env.NODE_ENV || 'development';

app.use(function(req, res, next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type,Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Pass to next layer of middleware
    next();
})

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

var userModel = require('./schema/userSchema.js')(mongoose);
var userPostModel = require('./schema/postSchema.js')(mongoose);
require('./auth/passportAuth.js')(passport, FacebookStrategy, config, mongoose, userModel);
require('./routes/routes.js')(express, app, passport, config, userModel, userPostModel);

//app.listen(3000, function(){
//	console.log('Working on port 3000');
//});
app.set('port', process.env.PORT || 3000);
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
require('./socket/socket.js')(io, rooms);
server.listen(app.get('port'), function(){
    console.log('Chal raha he '+app.get('port')+' pe!!!');
})
