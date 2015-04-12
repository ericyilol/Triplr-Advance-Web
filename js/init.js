$(document).ready(function() {
	$('.events').each(function() {
		var randomColorChange = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		$(this).css('background-color', randomColorChange);
	});
	$('.my-event-picture').each(function() {
		var randomColorChange = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
		$(this).css('background-color', randomColorChange);
	});

	$('#event2').css("background-image", "url(./photo/photo-egypt.jpg)");  
});