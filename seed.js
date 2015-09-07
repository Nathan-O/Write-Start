var db = require("./models");

//seed data
var user_list = [{
			userName: "Dreadful Octopus",
			firstName: "Nathan",
			lastName: "Ockerman",
			email: "ockerman.ns@gmail.com",
			passwordDigest: "zxcvbnm"
		},{
			userName: "LovelyLady",
			firstName: "Cheyenne",
			lastName: "Ockerman",
			email: "brownchs@gmail.com",
			passwordDigest: "boarder29"
		},{
			userName: "Das.Steve",
			firstName: "Steve",
			lastName: "Andrews",
			email: "cameraman.steve@gmail.com",
			passwordDigest: "ropes"		
		}];

/*
	userName: "",
	firstName: ""
	lastname: "",
	email: "",
	password: "",
},{
*/

console.log("It goes...");

db.User.remove({}, function (err, users){

	console.log("Stil goes...");

  db.User.create(user_list, function (err, users){
    if (err) { 
    	console.log(err);
    	return console.log("So many fails!") 
    };
    console.log("created", users.length, "users")
    process.exit();
  });
});



