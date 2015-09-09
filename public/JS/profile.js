$(document).on("ready", function(){
	//
	$("#addNewFile").on("submit", function (event){
		//event.preventDefault();
		/*console.log($("textarea[name='submission[content]']").value);
		var bloop = $("textarea[name='submission[content]']").value;
		console.log("Bloop = " + bloop);
		var bleep = submission.content;
		console.log("Bleep = " + bleep);*/

		var submittal = {
						title: "",
						genre: "",
						content: "",
						};

		submittal.title = submission.title;
		submittal.genre = submission.genre;
		submittal.content = submission.content;

		$.post("/api/submissions", submittal, function (data, status){
			alert("WINNING!!!!!!!!!" + data + " " + status);
		});

		/*$.ajax({
			type: "post",
			url: "/api/submissions",
			data: submittal,
			success: "success"
		});*/

	})
})