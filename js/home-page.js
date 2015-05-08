var WINDOW_HEIGHT = $(window).height();
var WINDOW_WIDTH  = $(window).width();

function home_page_init() {
    // explore_init();
    mobile_init();
    autoExplore();
    // indexModalListener();
    indexModalEvent();
}

var autoExplore = function(){
        var query = window.location.search.substring(1);
        querySplit = query.split('=');
        if (querySplit[1] == "explore"){
            explore_init();
        }
}

var explore_init = function() //when user click on explore
{
        $(".home-page-header").animate({height:'170px'});
        $("#homepage-upper-content").css({'display':'none'});
        $(".not-home-page").css({'display':'block'});
        $("#search-form").css({'display':'block'});
        $(".menu-explore-button").css({'display':'none'});
        indexCityAutocomplete();
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
        $(".hamburger-logo").attr({src: './img/logo_white.png'});
        
        toggle =false;
        }
        else{
        $("#hamburger-menu").animate({height:'160px'});
        $(".hamburger-list").css({'display':'block'});
        $(".hamburger-list").css({'background-color':'white'});
        $("#hamburger-menu").css({'background-color':'white'});
        $(".hamburger-icon").attr({src: './img/hamburger-icon-blue.png'});
        $(".hamburger-logo").attr({src: './img/logo-blue.png'});
        toggle =true;

        }
    });

}

var indexModalListener = function(){
    // $("#explore-button").on('click',function(event) {
        // event.preventDefault();
        // console.log("Mingrui");
        $('.pop-modal').addClass('is-visible'); 
        $('#explore-trip-modal').addClass('is-selected');
    // });
}

var indexModalEvent = function(){
    
    //close modal
    $('.pop-modal').on('click', function(event){
        if( $(event.target).is($('.pop-modal')) || $(event.target).is('.cd-close-form') ) {
            $('.pop-modal').removeClass('is-visible');
            $('.schedule-modal').removeClass('is-selected');
            $('#edit-event-modal').empty();
        }   
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            $('.pop-modal').removeClass('is-visible');
            $('.schedule-modal').removeClass('is-selected');
            $('#edit-event-modal').empty();
        }
    });
}


var indexCityAutocomplete = function() {
    $('#go-input').keypress(function(e){
        if ( e.which == 13 ) e.preventDefault();
    });
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('go-input')),
      {
        types: ['(cities)']
    });
  // places = new google.maps.places.PlacesService(map);

  google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);
}