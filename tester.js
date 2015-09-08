/////////////////////////////////////////////
/////////////////////////////////////////////
/// test - will delete
var db = require("./models");

$(document).ready(function(){
	$("#who-logged").on("click", function(){
		db.User.findOne({ _id: req.session.userId }, function (err, user) {
			if (err){
				console.log(err);
			}
        	req.user = user;
        	renderLoggedIn(user);
    	});
	});
});

function renderLoggedIn(data){
	var loggedTemplate = _.template($("#check-log-template").html());

	var checkLogHTML = loggedTemplate(data);
	$("#check-log-placeholder").append(checkLogHTML);
};

// end test functions
////////////////////////////////////////////
////////////////////////////////////////////

