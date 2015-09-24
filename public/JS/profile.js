console.log("Shoes")

$(document).on("ready", function(){
	//
	$("#addNewFile").on("submit", function (event){
		//alert()
		event.preventDefault();
		var storyStyle = $("#genre-pick").val();
		var name = $("#named").val();
		var text = $("#submitted").val();

		console.log(storyStyle + " " + name + " " + text);

		var submittal = {
			title: "",
			genre: "",
			content: "",
			};

		submittal.title = name;
		submittal.genre = storyStyle;
		submittal.content = text;

		$.post("/api/submissions", submittal, function (data, status){
			alert("Successfully Submitted "  + submittal.title);
		});
	});

	$(".delete").on("click", function(e){

		var title = $(this).next()[0].textContent;
		console.log(title);

		if(confirm("Are you sure you want to delete " + title + "?")) {
			var toBeDeleted = {};
			toBeDeleted.id = $(this).context.attributes[1].textContent;
			console.log("To be deleted: " + toBeDeleted.id);
			$.post("/deleteStory",  toBeDeleted, function(res){
				console.log(res);
				//console.log($(this));

    	});
			$(this).parent().remove()

		 }
		 else {
				console.log("Delete Aborted.")
			}
	});
});
