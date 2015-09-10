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