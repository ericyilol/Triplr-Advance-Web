var WINDOW_HEIGTH = $(window).height();
var WINDOW_WIDTH  = $(window).width();

var tripInput = " 2015/12/12 ; 2015/12/18 ; New York ; photo/nyc2.jpg  | 2015/12/12 ; 2015/12/18 ; London ; photo/london.jpg | 2015/12/12 ; 2015/12/18 ; Beijing, Shanghai ; photo/beijing2.jpg | 2015/12/12 ; 2015/12/18 ; Lisbon ; photo/lisbon.jpg | 2015/12/12 ; 2015/12/18 ; Venice ; photo/venice.jpg | 2014/12/12 ; 2015/12/18 ; Taipei, Kaohsiung ; photo/taipei.jpg | 2014/12/12 ; 2015/12/18 ; Tokyo, Yokohama, Osaka ; photo/java.jpg | 2014/12/12 ; 2015/12/18 ; Seoul ; photo/seoul.jpg | 2014/12/12 ; 2015/12/18 ; Egypt ; photo/egypt.jpg | 2014/12/12 ; 2015/12/18 ; Monterosso ; photo/greece.jpg | 2013/12/12 ; 2015/12/18 ; San Francisco ; photo/sanfran.jpg | 2013/12/12 ; 2015/12/18 ; Agra ; photo/agra.jpg | 2013/12/12 ; 2015/12/18 ; Los Angeles ; photo/la.jpg"

Trip = function()
{
    this.depart_date = new Date();
    this.arrive_date = new Date();
    this.cities = {};
    this.cityImage = {};
}


function dashboard_init() {
    eventHeight_init();
    timeLine_init();
    parseInput();
}

var parseInput = function() {
    var trips = tripInput.split("|");
    console.log(trips.length);

}




var eventHeight_init = function() {
    var eventHeight = $('.my-events').width();
    $('.my-events').css({'height':eventHeight+'px'});
}

var timeLine_init = function()
{
    var timeLineHeight = $('.trips-planning').parent().height() - 50;
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