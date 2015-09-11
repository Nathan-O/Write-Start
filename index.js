/*
/////////////////////////////////////////////////////////

					Server-Side js

/////////////////////////////////////////////////////////
*/

// * REQUIREMENTS * //
var bodyParser = require("body-parser");
var express = require("express");
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

app.set("view engine", "ejs");

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
		req.session.userId = null;
		req.user = null;
		console.log("Session id: " + req.session.userId);
		console.log("User: " + req.user);
		res.clearCookie("guid");
	};

	next();
});


// * ROUTES * //

app.get("/", function (req, res){	// <-- needs to have a find all db function that renders usersinfo to the page
	//
	db.User.find({}, function (err, users){
		if (err){
			console.log(err);
		};
		var writing = {stories: []};
		console.log(users);
		users.forEach(function (user){
			user.submissions.forEach(function (submission){
				writing.stories.push(submission);	
			});
		});
		res.render("index.ejs", {storyInfo: writing});
	});
});


app.get("/signup", function (req, res){
	res.render("signup.ejs");
});


app.get("/login", function (req, res){
	res.render("login.ejs");
});


app.get("/profile", function (req, res){
	//
	req.currentUser(function (err, user){
		if (user === null){
			res.redirect("/signup");
		}
		res.render("profile.ejs", {userInfo: user});
	});
});


app.get("/user-profile", function (req, res){

	var userData = req.body;		// ?? Why is this wrong???
	console.log(req.body)

	db.User.findOne(userData, function (err, user){
		if (err){
			console.log(err);
			res.redirect("/not-found"); // <-- will have page.
		};
		res.render("user-profile.ejs", {userInfo: user});
	});
});


app.get("/editor", function (req, res){
	res.render("editor");
});


app.get("/just...why", function (req, res){
	res.render("nope.ejs");
});

/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

//************** delete for production *****************//
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

app.get("/fileTest", function (req, res){
	res.sendFile(path.join(views + "fileTest.html"));
});

app.post(["/fileTest", "/api/files"], function (req, res){
	//code
	console.log("req = " + req);
	console.log("req.body = " + req.body);
	console.log("req[0] = " + req[0]);
	//console.log("req.body.submission.text = " + req.body.submission.text)
	console.log("Test file submitted as: " + req.body.submission);
	var testOb = req.body;
	console.log(testOb)
	res.send(req);
});

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

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
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


app.post(["/submissions", "/api/submissions"], function (req, res) {
	console.log(req.body);
	newSubmission = req.body;

	db.User.findOne({ _id: req.session.userId}, function (err, user){
		if (err){
			return console.log("findOne ERR = " + err);
		};
		user.submissions.push(newSubmission);

		user.save(function (err, success) {
			if (err){
				return console.log("During Save ERR = " + err);
			};
			console.log("It worked?");
		});
		res.redirect("/profile"); 
	});
});

// * DELETE ROUTE * //
app.delete(["/logout", "api/session"], function (req, res) {
	console.log("clicked");
	req.logout();
	console.log("logged out");
	res.redirect("/");
})

app.delete("/story", function (req, res) {
	console.log(req.body); //<-- equals right stuff
	var ids = req.body;

	db.User.findOne({_id: ids.data[0]}, function (err, user) { 
        if (err) {
            return console.log(err);
        };
        for (var i = 0; i < user.submissions.length; i++) {
        	if (user.submissions[i]._id.toString() === ids[1]) {
            	user.submissions[i].remove();    
           		break; 
           	};
	    };
	});
    user.save(function(err, success) {
        if (err) {
        	return console.log(err);
        };
        res.send(success);
    });
});

// * SERVER * // 
app.listen(process.env.PORT || 3000, function(){
	console.log("We're running wild!")
});