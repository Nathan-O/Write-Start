/*
/////////////////////////////////////////////////////////

					Server-Side js

/////////////////////////////////////////////////////////
*/
// REQUIREMENTS //
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var path = require("path");
var _ = require("underscore");
//var db = require("./models");

var app = express();

// CONFIG //
app.use("/static", express.static("public"));
app.use("/vender", express.static("bower_components"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

var views = path.join(process.cwd(), "views/");

// Create Session //
app.use(
	session({
		secret: "secret (need change)",
		resave: false,
		saveUninitialized: true
	})
);

// ROUTES //
app.get("/", function (req, res){
	res.sendFile(path.join(views + "index.html"));
});


// SERVER // 
app.listen(3000, function(){
	console.log("Listening on localhost:3000");
	console.log("Shit ain't fucked yet.");
});