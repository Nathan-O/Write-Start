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
			alert("WINNING!!!!!!!!!" + data + " " + status);
		});

		/*$.ajax({
			type: "post",
			url: "/api/submissions",
			data: submittal,
			success: "success"
		});*/
	});
});

function deleteStory(context) {
	var storyId = context.id;
	console.log(context)
	console.log(context.id);

	var ids = storyId.split("=");
	console.log(ids)
	//console.log(context.data.id)
	console.log("storyId")
	console.log(storyId);

	var idObject = {data: ids};
	 // We take the id of the button which is equivalent to the mongoDB _id of the book it is related to as well as the _id of the comment.
   
    //console.log(commentId);
    // We send an AJAX DELETE request to the backend with the combination of ids in the data field so we can easily access it via "req.body" on the backend.
    $.ajax({
        url: '/story',
        type: 'DELETE',
        data: idObject,
        // If the DELETE request is successful, we re-render all the books.
        success: function(res){
            console.log("deletion successful"); 
            location.reload(); 
        }
    });
};

