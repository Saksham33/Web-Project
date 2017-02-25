$(document).ready(function(){
    $(".push_menu").click(function(){
        $(".wrapper").toggleClass("active");
    });

    $("div.menu > li > a").click(function() {
        $("div.menu > li > a").removeClass("active");
        $(this).addClass("active");
    });
});