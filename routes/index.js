var express = require('express');
var bcrypt= require('bcryptjs');
var User = require('../models/user.js');
var router = express.Router();
function requirelogin(req,res,next){
if(!req.user){
  res.redirect('/login');
}
else{
  next();
}
};
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'authentication' });
});

router.get('/register', function(req,res){
	res.render('register', { title: 'Register Please'});
});

router.post('/register', function(req,res){
	var hash= bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	var user= new User({
		name: req.body.name,
		email: req.body.email,
		password: hash
	});
	user.save(function(err){
		if(err){
			var error="Something bad happened";
			if(err.code===11000){
				error="this email is already taken";
			}
			res.render('register.jade',{error:error});
		}
		else{
			res.render('dashboard.jade')
		}

	});
});

router.get('/login', function(req,res){
	res.render('login',{title: 'Login here'});
});

router.post('/login', function(req,res){
User.findOne({email:req.body.email}, function(err, user){
if(!user){
	res.render('login.jade', {error:'invalid email'});
}
else{
	if(bcrypt.compareSync(req.body.password, user.password)){
		req.session.user=user;
		res.render('dashboard');
	}
	else
	{
		res.render('login.jade',{error:'invalid password'});
	}
}

});

});
router.get('/dashboard', requirelogin, function(req,res){
	res.render('dashboard',{title:'Dashboard'});
});

router.get('/logout', function(req,res){
	// req.session.reset();
	res.redirect('/');
});

module.exports = router;
