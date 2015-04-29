var WINDOW_HEIGHT = $(window).height();
var WINDOW_WIDTH  = $(window).width();

function home_page_init() {
    explore_init();
    mobile_init();
}

var explore_init = function() //when user click on explore
{
        $("#explore-button").click(function() {
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
