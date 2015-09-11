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
	
    $.ajax({
        url: '/story',
        type: 'DELETE',
        data: idObject,
        
        success: function(res){
            console.log("deletion successful"); 
            location.reload(); 
        }
    });
};

