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


function editSubmission(context){
	//
	console.log(context)
	var editId = context.id;
	var editObject = {data: editId};
	console.log(editObject)

	$.ajax({
		url: "api/editor",
		type: "POST",
		data: editObject,

		success: function(res){
			console.log(res);
			//
		}
	});



};





////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// for test template

var testOb = {
	name: "Human Person"
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










