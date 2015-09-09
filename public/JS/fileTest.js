$(document).on("ready", function(){
	//
	$("#tryAgain").on("submit", function (e){
		e.preventDefault();
		console.log($("textarea[name='submission[text]']")[1].value);
		var bloop = $("textarea[name='submission[text]']")[1].value;

		$.ajax({
			type: "post",
			url: "/api/submissions",
			data: bloop,
			success: "success"
		});
		

		/*var blip = $("#submittal").val();
		alert("Blip = " + blip);
		$("#append").append('"<p>" + blip + "</p>"');*/
	})
})