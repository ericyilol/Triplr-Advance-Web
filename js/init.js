var WINDOW_HEIGTH = $(window).height();
var WINDOW_WIDTH  = $(window).width();

(function () {
    var version = '1.0';
    var scripts = [
        'js/random-color.js',
        'js/trips-module.js',
        'js/lib/jquery.ui.min.js',
        'js/lib/bootstrap.min.js',
        'js/dashboard.js'
    ];

    var temp = [];
    for (var i = 0; i < scripts.length; i ++) {
        temp.push('<script src="' + scripts[i] + '?' + version +'"><\/script>');
    }
    document.write(temp.join(''));
})();


$(document).ready(function() { 

	$('#event1').css("background-image", "url(./photo/egypt.jpg)"); 
	$('#event2').css("background-image", "url(./photo/paris.jpg)"); 
	$('#event3').css("background-image", "url(./photo/agra.jpg)"); 
	$('#event4').css("background-image", "url(./photo/seoul.jpg)"); 
	$('#event5').css("background-image", "url(./photo/prague.jpg)"); 
	$('#event6').css("background-image", "url(./photo/taipei.jpg)"); 
	$('#event7').css("background-image", "url(./photo/sudan.jpg)"); 
	$('#event8').css("background-image", "url(./photo/madrid.jpg)"); 
	$('#icon1').css("background-image", "url(./icon/icon-bus.png)");
	$('#icon2').css("background-image", "url(./icon/icon-dine.png)");

});


function navigation_init() {
    var newTripButtonLeft = WINDOW_WIDTH - 120;
    var newTripButtonTop = WINDOW_HEIGTH - 120;
    $('#new-trip').css({'top':newTripButtonTop +'px'});
    $('#new-trip').css({'left':newTripButtonLeft +'px'});
}


