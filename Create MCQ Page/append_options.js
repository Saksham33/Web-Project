$(document).ready(function() {
	$("#b1").click(function() {
		var v = $("#i1").val().trim();
		if(v != "")
			//$("#options").append("<div><input type='radio' name='mcq'> "+v+" &nbsp; &nbsp; <button class='btn btn-danger btn-xs' onclick='del(this)'><span class='glyphicon glyphicon-remove'></span> Remove</button><br><br></div>");
			$("#options").append("<div data-toggle='buttons'><label class='btn active'><input type='radio' name='mcq' value='"+v+"' required><i class='fa fa-circle-o fa-2x'></i><i class='fa fa-dot-circle-o fa-2x'></i>&nbsp; &nbsp;<span>"+v+"</span></label>&nbsp; &nbsp;<button class='btn btn-danger btn-xs' style='margin-top: 1%;' onclick='del(this)'><div class='glyphicon glyphicon-remove'></div> Remove</button><br><br></div>");
		$("#i1").val("");
	});
	$("#b2").click(function() {
		var question = $("#t1").val().trim();
		if(question == "") {
			$("#emptyQues").css('display','inline');
			return;
		}
		else {
			$("#emptyQues").css('display','none');
		}

		var optionsArray = new Array();
		var answer = $("input[name=mcq]:checked").val();
		$("#options").find("span").each(function() {
			optionsArray.push($(this).text());
		});

		if(optionsArray.length < 2) {
			$("#emptyOptions").css('display', 'block');
			return;
		}
		else {
			$("#emptyOptions").css('display', 'none');
		}

		if(answer == null) {
			$("#emptyAnswer").css('display', 'block');
			return;
		}
		else {
			$("#emptyAnswer").css('display', 'none');
		}

		console.log(question);
		console.log(optionsArray);
		console.log(answer);
		var form = document.getElementById("mcq_form");
		form.reset();
		$("#options").children().remove();
	});
});

function del(x) {
	$(x).parent().remove();
}

