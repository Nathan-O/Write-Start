$(document).ready(function(){
	$("#testTest").on("click", function(e){
		renderTest();
	});

	$("#search-box").on("submit", function (e){
		e.preventDefault();
		var searchData = $("#search-input").val();
		var filter = $("#search-filter").val();

		searchFind(filter, searchData);

		// console.log(searchData);
		// console.log(filter);
	});

})


/////////////////////////////////////////////////////////////

				// Partials Functins //

/////////////////////////////////////////////////////////////

//search

function searchFind(filter, param){
	console.log(filter);
	console.log(param);
	var dataOb = {};
	//now I need an API route
	console.log("close")
	if (filter[0] === "name"){

		console.log("named")
		var splitName = param.split(" ");

		console.log(splitName); //works

		dataOb.firstName = splitName[0];
		dataOb.lastName = splitName[1];
		console.log(dataOb); //works

		$.get("/user-profile", dataOb, function (data, status){
			alert("Did it go???");
			console.log("Data: " + data + ", Status: " + status);
			console.log(data);
			var sendData = data;
			console.log(sendData);
			//$.get("/user-profile", sendData);
		});
		//console.log(data);
		//$.get("/user-profile", )
		//code
	} else if (filter[0] === "username") {

		console.log("usernamed");
		dataOb.userName = param;
		$.post("/api/user-profile", dataOb, function (data, status){
			console.log("what about here? did it go?");
			var resData = data;
			console.log(resData);

		});
		//code
	} else if (filter[0] === "genre") {
		dataOb.genre = param;
		//code
	} else {
		//code for all?
	};
	//cont.
}

/*
Still need to make an three more ejs pages and finish routes. Lots of work to do, get on it.
*/


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// for test template

var testOb = {
	name: "Dumbass"
};


function renderTest(){
	var insultTemplate = _.template($("#insult-template").html());
	/* When info needs to be added to template, 
	it goes here and gets set to the (var) template() 
	from above. Run the function with the data as 
	the argument (data must be in object form) */
	var obOb = testOb;
	console.log(obOb);

	var insultHTML = insultTemplate(obOb);
	$("#insult-placeholder").append(insultHTML);
};

///////////////////////////////////////////////////////
















/*
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
 // notes 

 Search button is clicked. 

Form gets sent to app.js and all values get set to variables

Vars are run through of statement to determine value

Api get request to database

If looking for user run dd.findone with the search input as the parameter. 

If looking for story genre then find all stories in db that have that genre selected. 

Reroute where needed.


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/










