var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt=require('bcryptjs');
var session=require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var User = require('./models/user.js');

// var User= mongoose.model('User', new mongoose.Schema({
//   id : mongoose.Schema.ObjectId,
//   name: String,
//   email: {unique: true, type: String},
//   password: String
// }));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
mongoose.connect('mongodb://localhost/deekshithdb');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	cookieName:'session',
	secret:'dsdgfdghdfjghghghdfg',
	duration: 30*60*1000,
	activeDuration:5*60*1000,
	httpOnly: true,
	secure: true
}));
// app.use(function(req,res,next){

// 	if(req.session.user && user.session){
// 		User.findOne({email:req.session.user.email}, function(err,user){
// 			if(!user){
// 				req.user=user;
// 				delete req.user.password;
// 				req.session.user=user;
// 				req.locals.user=user;
// 			}
// 			else{
// 				next();
// 			}
// 		});
// 	}
// 	else{
// 		next();
// 	}
// });
app.use('/', routes);
app.use('/users', users);



module.exports = app;
app.listen(3000);
console.log('on 3000');