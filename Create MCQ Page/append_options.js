$(document).ready(function() {
	$("#b1").click(function() {
		var v = $("#i1").val().trim();
		if(v != "")
			$("#options").append("<div><input type='radio' name='mcq'> "+v+" &nbsp; &nbsp; <button class='btn btn-danger btn-xs' onclick='del(this)'><span class='glyphicon glyphicon-remove'></span> Remove</button><br><br></div>");
		$("#i1").val("");
	});
});

function del(x) {
	$(x).parent().remove();
}