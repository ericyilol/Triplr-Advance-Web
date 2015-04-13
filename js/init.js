var WINDOW_HEIGTH = $(window).height();
var WINDOW_WIDTH  = $(window).width();


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

function dashboard_init() {
    var eventHeight = $('.my-events').width();
    $('.my-events').css({'height':eventHeight+'px'});

    var timeLineHeight = $('.trips-planning').parent().height() - 100;
    var timeLinePosition = $('.trips-planning').parent().position();
    var timeLineTop = timeLinePosition.top + 40;
    var timeLineLeft = timeLinePosition.left + 40;


    $('.trips-planning .trips-planning-timeline').css({'height':timeLineHeight+'px'});
    $('.trips-planning').css({'left':timeLineLeft+'px'});
    $('.trips-planning').css({'top':timeLineTop+'px'});

    $( '.trips-gone' ).each(function() {
        var id_name = $(this).find("p").text();
        id_name = "year-" + id_name;
        console.log(id_name);
        $(this).attr('id', id_name);
        timeLineHeight = $('#' + id_name).parent().height() - 50;
        timeLinePosition = $('#' + id_name).parent().position();
        timeLineTop = timeLinePosition.top + 40;
        timeLineLeft = timeLinePosition.left + 40;
        $('#' + id_name).find('.trips-gone-timeline').css({'height':timeLineHeight+'px'});
        $('#' + id_name).css({'left':timeLineLeft+'px'});
        $('#' + id_name).css({'top':timeLineTop+'px'});
    });
    var oldestYear = $('.trips-gone-timeline').last().height();
    oldestYear = oldestYear - 50;
    $('.trips-gone-timeline').last().css({'height':oldestYear+'px'});

}

function navigation_init() {
    var newTripButtonLeft = WINDOW_WIDTH - 120;
    var newTripButtonTop = WINDOW_HEIGTH - 120;
    $('#new-trip').css({'top':newTripButtonTop +'px'});
    $('#new-trip').css({'left':newTripButtonLeft +'px'});
}


