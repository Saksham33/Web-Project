$(document).ready(function() {
	$("#menu-close").click(function() {
    	console.log("hello1");
    	$("#sidebar-wrapper").toggleClass("active");
	});
	$("#menu-toggle").click(function() {
	    console.log("hello2");
	    $("#sidebar-wrapper").toggleClass("active");
	});
});