$(document).ready(function(){
	$("#testTest").on("click", function(e){
		renderTest();
	});

	$(".btn-edit").on("click", function(e){
		var toBeEdited = {}
		toBeEdited.id = $(this).context.attributes[2].textContent;
		console.log(toBeEdited)
		$.post("/editor",  toBeEdited, function(res){
        // append new food to the page
        console.log(res);
      });
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


// function editSubmission(context){
// 	//
// 	console.log("edit submission called")
// 	console.log(context);
	// var editId = context.id;
	// var editObject = {data: editId};
	// console.log("READY " , editObject)
	//
	// $.ajax({
	// 	url: "api/editor",
	// 	type: "POST",
	// 	data: editObject,
	//
	// 	success: function(res){
	// 		console.log(res);
	// 		//
	// 	}
	// });


//};

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
