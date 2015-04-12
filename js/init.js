
(function () {
    var version = '1.0';
    var scripts = [
        'js/random-color.js',
        'js/trips-module.js',
        'js/lib/jquery.ui.min.js',
        'js/lib/bootstrap.min.js'
    ];

    var temp = [];
    for (var i = 0; i < scripts.length; i ++) {
        temp.push('<script src="' + scripts[i] + '?' + version +'"><\/script>');
    }
    document.write(temp.join(''));
})();

$(document).ready(function() {
	$('.event').each(function() {
		var randomColorChange = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		$(this).css('background-color', randomColorChange);
	});
	$('.my-event-picture').each(function() {
		var randomColorChange = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		$(this).css('background-color', randomColorChange);
	});


	$('#event2').css("background-image", "url(./photo/photo-egypt.jpg)");  

    var cw = $('.my-events').width();
    $('.my-events').css({'height':cw+'px'});


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
