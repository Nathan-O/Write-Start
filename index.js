/*
/////////////////////////////////////////////////////////

					Server-Side js

/////////////////////////////////////////////////////////
*/

// * REQUIREMENTS * //
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var path = require("path");
var _ = require("underscore");
var methodOverride = require("method-override");
var keygen = require("keygenerator");
var db = require("./models");

var app = express();

// * CONFIG * //
app.use("/static", express.static("public"));
app.use("/vender", express.static("bower_components"));


app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

var views = path.join(process.cwd(), "views/");


// * Create Session * //
app.use(
	session({
		secret: keygen._({specials: true}),
		resave: false,
		saveUninitialized: true
	})
);


// extend req abilities 
app.use(function (req, res, next){
	// for login
	req.login = function (user){
		req.session.userId = user._id;
	};

	// get current user for profile
	req.currentUser = function (callback){
		db.User.findOne({ _id: req.session.userId }, function (err, user) {
        req.user = user;
        callback(null, user);
      });
	};

	// log out user
	req.logout = function(){
		req.session.UserId = null;
		req.user = null;
		console.log("Session id: " + req.session.UserId);
		console.log("User: " + req.user);
		res.clearCookie("guid");
	};

	next();
});


// * ROUTES * //
app.get("/", function (req, res){
	res.sendFile(path.join(views + "index.html"));
});

app.get("/login", function (req, res){
	res.sendFile(path.join(views + "login.html"));
});

app.get("/signup", function (req, res){
	res.sendFile(path.join(views + "signup.html"));
});

app.get("/profile", function (req, res){
	console.log("Profile route");
	req.currentUser(function (err, currentUser){
		console.log(currentUser);
		if (currentUser === null){
			res.redirect("/signup");
		} else {
			res.sendFile(views + "profile.html");
		}
	})
});

app.get("/just...why", function (req, res){
	res.sendFile(path.join(views + "nope.html"));
});

//************** delete for production *****************//

app.get("/users", function (req, res){
    db.User.find({}, function (err, users) {
		res.send(users);
	});
});

app.get("/logged", function (req, res){
	db.User.find({ _id: req.session.userId }, function (err, user) {
		if (err){
			console.log(err);
			res.send("No One");
		}
    	res.send(user);
	});
});

//*****************************************************//

// * POST ROUTES * //

app.post(["/login", "/api/session"], function (req, res){
	var user = req.body.user;
  	var email = user.email;
  	var password = user.password;

  	db.User.authenticate(email, password, function (err, user) {
  		if (err) {
  			console.log(err);
  			res.redirect("/signup");
  		} else {
  			req.login(user);
  			res.cookie("guid", user._id);
  			res.redirect("/profile"); 
  			/*res.send(email + " is logged in\n");*/
  		};
  	});
});

// where the user submits the sign-up form
app.post(["/signup", "/api/users"], function signup(req, res) {
	// grab the user from the params
	var user = req.body.user;
	console.log(user);
	// pull out their info
	var firstName = user.firstName;
	var lastName = user.lastName;		//need to do something about "remember me" being checked
	var userName = user.userName;
	var email = user.email;
	var password = user.password;
	var date = Date.now();

	// create the new user
	db.User.createSecure(userName, firstName, lastName, email, password, function (err, user) {
		console.log("Created Secure")
		if (err) {
			console.log(err);
		}
		req.login(user);
		res.cookie("guid", user._id);
		console.log("logged In")
		res.redirect("/profile"); 
	});	
});

// * DELETE ROUTE * //
app.delete(["/logout", "api/session"], function (req, res){
	console.log("clicked");
	req.logout();
	console.log("logged out");
	res.redirect("/");
})


// * SERVER * // 
app.listen(3000, function(){
	console.log("Listening on localhost:3000");
	console.log("Shit ain't fucked yet.");
});