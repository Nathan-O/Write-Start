$(document).ready(function(){
	$("#testTest").on("click", function(e){
		renderTest();
	});
})

///////////////////////////////////////////////////////

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