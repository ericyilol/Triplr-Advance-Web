var WINDOW_HEIGHT = $(window).height();
var WINDOW_WIDTH  = $(window).width();

// var tripInput = "
//  | 2015/12/12 ; 2015/12/18 ; New York ; photo/nyc2.jpg 
//  | 2015/12/12 ; 2015/12/18 ; London ; photo/london.jpg
//  | 2015/12/12 ; 2015/12/18 ; Beijing, Shanghai ; photo/beijing2.jpg
//  | 2015/12/12 ; 2015/12/18 ; Lisbon ; photo/lisbon.jpg
//  | 2015/12/12 ; 2015/12/18 ; Venice ; photo/venice.jpg
//  | 2014/12/12 ; 2015/12/18 ; Taipei, Kaohsiung ; photo/taipei.jpg
//  | 2014/12/12 ; 2015/12/18 ; Tokyo, Yokohama, Osaka ; photo/java.jpg
//  | 2014/12/12 ; 2015/12/18 ; Seoul ; photo/seoul.jpg
//  | 2014/12/12 ; 2015/12/18 ; Egypt ; photo/egypt.jpg
//  | 2014/12/12 ; 2015/12/18 ; Monterosso ; photo/greece.jpg
//  | 2013/12/12 ; 2015/12/18 ; San Francisco ; photo/sanfran.jpg
//  | 2013/12/12 ; 2015/12/18 ; Agra ; photo/agra.jpg
//  | 2013/12/12 ; 2015/12/18 ; Los Angeles ; photo/la.jpg"

Trip = function()
{
    this.depart_date = new Date();
    this.arrive_date = new Date();
    this.cities = {};
    this.cityImage = {};
}


function home_page_init() {
    eventHeight_init();
    explore_init();
    mobile_init();
    // timeLine_init();
    // parseInput();
}

var parseInput = function() {
    var tripSplit = tripInput.split("\n");

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

var explore_init = function() //when user click on explore
{
    // var event_height= $('.my-events').height();
    // var viewport_height = $(window).height();
    // var menu_height = viewport_height- (2 * event_height);



        $(".menu-explore-button").click(function() {
        $(".home-page-header").animate({height:'170px'});
        // $(".home-page-header").animate({height:menu_height});
        $("#homepage-upper-content").css({'display':'none'});
        // $(".row").css({'display':'block'});
        $(".not-home-page").css({'display':'block'});

        $("#search-form").css({'display':'block'});
        $(".menu-explore-button").css({'display':'none'});
            });
       

}

var mobile_init = function()
{
    var toggle = false;
    $(".hamburger-icon").click(function(){
        if (toggle){
        $("#hamburger-menu").animate({height:'60px'});
        $(".hamburger-list").css({'display':'none'});
        $(".hamburger-list").css({'background-color':'#6dd0f7'});
        $("#hamburger-menu").css({'background-color':'#6dd0f7'});
        $(".hamburger-icon").attr({src: './img/hamburger.png'});
        toggle =false;
        }
        else{
        $("#hamburger-menu").animate({height:'160px'});
        $(".hamburger-list").css({'display':'block'});
        $(".hamburger-list").css({'background-color':'white'});
        $("#hamburger-menu").css({'background-color':'white'});
        $(".hamburger-icon").attr({src: './img/hamburger-icon-blue.png'});
        toggle =true;

        }
    });

}
