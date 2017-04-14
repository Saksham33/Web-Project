$(document).on('click', '.panel-heading span.clickable', function(e){
    var $this = $(this);
	if(!$this.hasClass('panel-collapsed')) {
		$this.closest('.panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
	} else {
		$this.closest('.panel').find('.panel-body').slideDown();
		$this.removeClass('panel-collapsed');
		$this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
	}
});

$(document).ready(function() {
	var x = $("#l1").parent();
	$(document).not("body > #animation").click(function() {
		x.removeClass("open");
	});

	$("#l1").click(function() {
		if(x.hasClass("open")) {
			x.removeClass("open");
		}
		else {
			x.addClass("open");
		}
	});

	arr = $("#quizTopics").children();
	// for(var i = 0; i < arr.length; i++) {
	// 	var j = i;
	// 	setTimeout(function() {
	// 		$(arr[i]).removeClass("ng-hide");			
	// 		$(arr[i]).attr("ng-hide", "false");
	// 	}, i*500);
	// 	console.log(i);
	// }
	$(arr).each(function(index) {
		setTimeout(function() {
			$(arr[index]).removeClass("ng-hide");
			$(arr[index]).attr("ng-hide", "false");
		}, index*400);
	});


	// $('.hover').hover(function(){
	// 		$(this).addClass('flip');
	// 		console.log("hello");
	// 	}, function(){
	// 		$(this).removeClass('flip');
	// 		console.log("hello2");
	// 	}
	// );
});