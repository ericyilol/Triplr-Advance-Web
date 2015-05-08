var WINDOW_HEIGTH = $(window).height();
var WINDOW_WIDTH  = $(window).width();
var LOCALDATA = JSON.parse(localStorage.getItem("tripData"));
var autocomplete;
var tripObject = {};
var testImage;

var apiKey = 'f099f199aedf91c2cfaf8cf0e3135729';
var tags = "beijing, landmark, tourism"
var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + apiKey + "&tags=" + tags + "&per_page=20&sort=interestingness-desc&tag_mode=ALL&content_type=1";
var src;

// var tripInput = [];


function dashboard_init() {
    // clearLocalStorage();
    console.log(LOCALDATA);
    if ($.isEmptyObject(LOCALDATA)) {
        jsonInit();
        tripsInit();
    }
    else {
        tripsInit();            //Init all the trips.
    }
    timelineInit();             //Init the timeline
    newTripButtonInit();        // Init the new trip button
    tripClickInit();            //Click on a trip go to schedule page
    createNewTripFunc();        //Setup the create new trip button
    //arriveToDepartdates();      //Calcu
    datePickInit();             //Init the date picker 
    cityAutocomplete();     //Google autocomplete city API
    dashboard_mobile_init();    //
    // jsonFlickrApi();
}

var jsonFlickrApi = function() {
    
    // $('#a-link').remove();   
    
    // $('<img alt="" />').attr('id', 'loader').attr('src', 'ajax-loader.gif').appendTo('#image-container');
    
    //assign your api key equal to a variable
    // console.log("here1");
    var userID = "132046702@N03";
    
    //the initial json request to flickr
    //to get your latest public photos, use this request: http://api.flickr.com/services/rest/?&amp;method=flickr.people.getPublicPhotos&amp;api_key=' + apiKey + '&amp;user_id=29096781@N02&amp;per_page=15&amp;page=2&amp;format=json&amp;jsoncallback=?
    // var flickerAPI = "https://api.flickr.com/services/rest/?&amp;method=flickr.people.getPublicPhotos&amp;api_key=" + apiKey + "&amp;user_id=" + userID + "&amp;tags=paris&amp;per_page=12&amp;format=JSON$amp;&amp;jsoncallback=?";
    // var flickerAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '$user_id=' + userID + '?jsoncallback=?';
    // var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    // $.getJSON( flickerAPI, function(data) {
        // console.log("here!");
    // });
var apiKey = 'f099f199aedf91c2cfaf8cf0e3135729';
var tags = "beijing, landmark, tourism"
var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + apiKey + "&tags=" + tags + "&per_page=20&sort=interestingness-desc&tag_mode=ALL&content_type=1";
var src;
$.getJSON(url + "&format=json&jsoncallback=?", function(data){
    $.each(data.photos.photo, function(i,item){
        src = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
        $("<img/>").attr("src", src).appendTo("body");
        if ( i == 5 ) return false;
    });
});

  // $.getJSON( flickerAPI, {
  //   tags: "london landmark",
  //   // tagmode: "any",
  //   format: "json",
  //   per_page: 10,
  //   page: 1
  // })
  //   .done(function( data ) {
  //       // console.log("here");
  //     $.each(data.photos.photo, function(i,item){
  //       src = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
  //       $("<img/>").attr("src", src).appendTo("body");
  //       if ( i == 3 ) return false;
  //   });
  //   });
}

var datePickInit = function(){
    $('#datePicker .date').datepicker({
        'format': 'M. d  yyyy',
        'autoclose': true
    });
    // console.log(LOCALDATA);
    // initialize datepair
    $('#datePicker').datepair();
}

var cityAutocomplete = function() {
    $('#cd-location').keypress(function(e){
        if ( e.which == 13 ) e.preventDefault();
    });
    autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('cd-location')),
      {
        types: ['(cities)']
    });
  // places = new google.maps.places.PlacesService(map);

  google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);
}

var onPlaceChanged = function() {
  var place = autocomplete.getPlace();
  if (place.geometry) {
    console.log("here!");
  } else {
    document.getElementById('autocomplete').placeholder = 'Enter a city';
  }

}



var clearLocalStorage = function() {
    var LOCALDATA = [];
    localStorage.setItem("tripData", JSON.stringify(LOCALDATA));
    // console.log(LOCALDATA);
    // location.reload();
}

var jsonInit = function() {
    $.getJSON(
        './data.json',
        function(data){
            LOCALDATA = data.slice(0);
            localStorage.setItem("tripData", JSON.stringify(LOCALDATA));
        });
}
var tripsInit = function() {
    // console.log(LOCALDATA);
    var $parentSection = $('.all-events'),
        pastTripPre = 'year-',
        myEvents = 'my-events ',
        cityImage = 'city-image',
        travelInfo = 'travel-info',
        travelTime = 'travel-time',
        travelCity = 'travel-city',
        columnClass = 'col-md-3 col-sm-4 col-xs-6 ',
        blackWhite = 'black-white',
        halfBlackWhite = 'half-black-white',
        sectionWapper, //<div class="row year" id="year-future">
        tripWapper, //<div class="col-md-3 col-sm-4 col-xs-6 my-events">
        imageWapper, //<div class="city-image">
        textWapper; //<div class="travel-info">

    sectionWapper  = $("<div />", {
            "class" : "row year",
            "id" : "year-Future"
        }).appendTo($parentSection);

    var today = new Date(Date.now()),
        todayYear = today.getFullYear();
        // todayMonth = today.getMonth() + 1;
        // console.log( "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf("Jun") / 3 + 1 );
        // console.log(todayYear);

    for (var i = todayYear; i >= todayYear - 10; i--) {
        sectionWapper  = $("<div />", {
                "class" : "row year",
                "id" : pastTripPre + i
            }).appendTo($parentSection);
    };

    for (var i = LOCALDATA.length - 1; i >= 0; i--) {
        var Monthday = LOCALDATA[i].arrive.split('. ');
        var thisMonth = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(Monthday[0]) / 3;
        var thisDate = new Date(LOCALDATA[i].year,thisMonth,Monthday[1]);
        // console.log(LOCALDATA[i].year,thisMonth,Monthday[1]);
        if (thisDate.getTime() > today.getTime())
        {
            sectionWapper = $parentSection.find('#year-Future');
            tripWapper  = $("<div />", {
                "class" : columnClass + myEvents + halfBlackWhite,
                "id" : "Trip-" + i
                }).appendTo(sectionWapper);
        }
        else {
            sectionWapper = $parentSection.find('#' + pastTripPre + LOCALDATA[i].year);
            tripWapper  = $("<div />", {
                "class" : columnClass + myEvents + blackWhite,
                "id" : "Trip-" + i
                }).appendTo(sectionWapper);
        }

        imageWapper  = $("<div />", {
            "class" : cityImage,
            "id" : "image-" + i
            }).appendTo(tripWapper);
        // var imagesrc;
// var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    // $.getJSON( flickerAPI, function(data) {
        // console.log("here!");
    // });
        $("<img />", {
            "src" : LOCALDATA[i].image
            // "src" : src
            }).appendTo(imageWapper);
        textWapper  = $("<div />", {
            "class" : travelInfo
            }).appendTo(tripWapper);
        $("<p />", {
            "class" : travelCity,
            "text" : LOCALDATA[i].arrive + " - " + LOCALDATA[i].depart
            }).appendTo(textWapper);
        $("<h4 />", {
            "class" : travelCity,
            "text" : LOCALDATA[i].location
            }).appendTo(textWapper);
    };
    // for (var i = LOCALDATA.length - 1; i >= 0; i--) {
    //     testImage = "#image-" + i;
    //     console.log(testImage);
    //     $.getJSON(url + "&format=json&jsoncallback=?", function(data){
    //         $.each(data.photos.photo, function(j,item){
    //             src = "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg";
    //             $("<img/>").attr("src", src).appendTo(testImage);
    //             // alert(src);
    //             if ( j == 1 ) {
    //                 // tripObject.image = src;
    //                 return false;
    //             }
    //         });
    // });
    // }
    $('.year').each(function(){
        if ($(this).is(':empty')){
            $(this).remove();
        }
    });
}

var timelineInit = function()
{
    $('.year').each(function(){
        var thisID = $(this).attr('id'), // year-2015
            thidIDSplit = thisID.split('-'),//[year,2015]
            thisYear = thidIDSplit[1],// 2015
            timelineID = thisID + '-timeline', //year-2015-timeline
            tripYearClass = "trips-year",
            tripYearTimeline = "trips-year-timeline",
            sectionWapper; //<div class="trips-year" id="year-2015-timeline">

        var sectionWapper = $("<div />", {
            "class" : tripYearClass + " animated fadeInDown",
            "id" : timelineID
        }).prependTo(this);
        $("<p />", {
            "text" : thisYear
        }).appendTo(sectionWapper);
        $("<div />", {
            "class" : tripYearTimeline
        }).appendTo(sectionWapper);

        var timeLineHeight = $('#' + timelineID).parent().height() - 50;
        var timeLinePosition = $('#' + timelineID).parent().position();
        var timeLineTop = timeLinePosition.top + 40;
        var timeLineLeft = timeLinePosition.left + 40;
        $('#' + timelineID).find('.trips-year-timeline').css({'height':timeLineHeight+'px'});
        $('#' + timelineID).css({'left':timeLineLeft+'px'});
        $('#' + timelineID).css({'top':timeLineTop+'px'});
    });
    var oldestYear = $('.trips-year-timeline').last().height();
    oldestYear = oldestYear - 50;
    $('.trips-year-timeline').last().css({'height':oldestYear+'px'});
}

var tripClickInit = function(){
    $('.my-events').on('click',function(event){
        var thisID = $(this).attr("id");
        var thisIDSplit = thisID.split("-");
        window.location = "./schedule.html?ID=" + thisIDSplit[1];
    });
}

var newTripButtonInit = function(){
    var $parent = $('body'),
        sectionWapper, //<button id="new-trip">
        newTripButtonLeft, newTripButtonTop;
        if (WINDOW_WIDTH < 500) {
            newTripButtonLeft = WINDOW_WIDTH - 75;
            newTripButtonTop = WINDOW_HEIGTH - 75;
        }
        else {
            newTripButtonLeft = WINDOW_WIDTH - 120;
            newTripButtonTop = WINDOW_HEIGTH - 120;
        }

    sectionWapper = $('<button />', {
        "id" : "new-trip",
        "class" : "animated fadeIn",
        "onclick" : "newTripButtonClick()"
    }).appendTo($parent);
    $("<img />",{
        "src" : "img/bagy-11.png"
    }).appendTo(sectionWapper);
    $(sectionWapper).css({'top':newTripButtonTop +'px'});
    $(sectionWapper).css({'left':newTripButtonLeft +'px'});
}

var newTripButtonClick = function(event){
    $('.pop-modal').addClass('is-visible'); 
    $('#new-trip-modal').addClass('is-selected');
}

var createNewTripFunc = function(){
    var $form_modal = $('.pop-modal'),
        $main_nav = $('#new-trip'),
        $form_new_trip = $('#new-trip-modal'),
        $new_trip_form = $('#new-trip-form'),
        $form_location = $form_modal.find('#cd-location'),
        $form_arrive = $form_modal.find('#cd-arrive-date'),
        $form_depart = $form_modal.find('#cd-depart-date'),
        $form_forgot_password = $form_modal.find('#cd-reset-password');
        $form_submit = $('#new-trip-submit');
    
    //close modal
    $('.pop-modal').on('click', function(event){
        if( $(event.target).is($form_modal) || $(event.target).is('.cd-close-form') ) {
            $form_modal.removeClass('is-visible');
        }   
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            $form_modal.removeClass('is-visible');
        }
    });
    $('#cd-location').on('input', function() {
        $(this).removeClass('has-error').next('span').removeClass('is-visible');
    });
    $('#cd-arrive-date').on('input', function() {
        $(this).removeClass('has-error').next('span').removeClass('is-visible');
    });
    $('#cd-depart-date').on('input', function() {
        $(this).removeClass('has-error').next('span').removeClass('is-visible');
    });

    $form_submit.on('click', function(event){
        if( $form_location.val() == "") {
           $form_location.toggleClass('has-error').next('span').toggleClass('is-visible'); 
           event.preventDefault();
        }
        else if( $form_arrive.val() == "") {
           $form_arrive.toggleClass('has-error').next('span').toggleClass('is-visible'); 
           event.preventDefault();
        }
        else if( $form_depart.val() == "") {
           $form_depart.toggleClass('has-error').next('span').toggleClass('is-visible'); 
           event.preventDefault();
        }
        else {
            addNewTrip();
            // location.reload();
            event.preventDefault();   
        }
    });
}

var addNewTrip = function() {
    var $parentForm = $('body').find('#new-trip-form'),
        parentFormInput = $parentForm.find(':input'),
        tempDate;
    var tripLocationSplit = parentFormInput[0].value.split(",");

    tripObject.location = tripLocationSplit[0];
    // alert(src);
    tempDate = parentFormInput[1].value.split("  ");
    tripObject.arrive = tempDate[0];
    tripObject.year = tempDate[1];
    // tripObject. = tempDate[1];
    tripObject.image = "photo/nyc.jpg";
    tempDate = parentFormInput[2].value.split("  ");
    tripObject.depart = tempDate[0];
    tripObject.events = [];
    // console.log(tripObject);
    LOCALDATA.push (tripObject);
    localStorage.setItem("tripData", JSON.stringify(LOCALDATA));
    var pageID = LOCALDATA.length - 1;
    window.location = "./schedule.html?ID=" + pageID;
    // arriveToDepartdates(tripObject.arrive,tripObject.depart)
} 

var arriveToDepartdates = function() {
    // console.log("he?");
    var now = new Date(Date.now());
    // console.log(now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate());
    var daysOfYear = [];
    for (var d = new Date(2015, 2, 20); d <= now; d.setDate(d.getDate() + 1)) {
        var thisDate = new Date(d);
        // console.log(thisDate.getFullYear() + "-" + thisDate.getMonth() + "-" + thisDate.getDate());
    }
}

var dashboard_mobile_init = function()
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
        $("#year-Future-timeline").animate({'top':'110px'});
        
        toggle =false;
        }
        else{
        $("#hamburger-menu").animate({height:'190px'});
        $(".hamburger-list").css({'display':'block'});
        $(".hamburger-list").css({'background-color':'white'});
        $("#hamburger-menu").css({'background-color':'white'});
        $(".hamburger-icon").attr({src: './img/hamburger-icon-blue.png'});
        $(".hamburger-logo").attr({src: './img/logo-blue.png'});
        $("#year-Future-timeline").animate({'top':'240px'});


        toggle =true;

        }
    });

}

$(window).resize(function() {
    var WINDOW_HEIGTH = $(window).height();
    var WINDOW_WIDTH  = $(window).width();
    var newTripButtonLeft;
    var newTripButtonTop;
    if (WINDOW_WIDTH < 500) {
        newTripButtonLeft = WINDOW_WIDTH - 75;
        newTripButtonTop = WINDOW_HEIGTH - 75;
    }
    else {
        newTripButtonLeft = WINDOW_WIDTH - 120,
        newTripButtonTop = WINDOW_HEIGTH - 120;
    }
    $("#new-trip").animate({'top':newTripButtonTop});
    $("#new-trip").animate({'left':newTripButtonLeft});
});

