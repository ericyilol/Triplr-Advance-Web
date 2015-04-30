var WINDOW_HEIGTH = $(window).height();
var WINDOW_WIDTH  = $(window).width();
var LOCALDATA = JSON.parse(localStorage.getItem("tripData"));

// var tripInput = [];


function dashboard_init() {
    // clearLocalStorage();
    if ($.isEmptyObject(LOCALDATA)) {
        jsonInit();
        tripsInit();
    }
    else {
        tripsInit();
    }
    timelineInit();
    newTripButtonInit();
    tripClickInit();
    createNewTripFunc();
    arriveToDepartdates();
    $('#datePicker .date').datepicker({
        'format': 'M. d  yyyy',
        'autoclose': true
    });
    // console.log(LOCALDATA);
    // initialize datepair
    $('#datePicker').datepair();
}

var clearLocalStorage = function() {
    var LOCALDATA = [];
    localStorage.setItem("tripData", JSON.stringify(LOCALDATA));
    console.log(LOCALDATA);
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
            "class" : cityImage
            }).appendTo(tripWapper);
        $("<img />", {
            "src" : LOCALDATA[i].image
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
        newTripButtonLeft = WINDOW_WIDTH - 120,
        newTripButtonTop = WINDOW_HEIGTH - 120;

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

    //open modal
    // $main_nav.on('click', function(event){
    //     // console.log("here");
    //     if( $(event.target).is($main_nav) ) {
    //         // on mobile open the submenu
    //         $(this).children('ul').toggleClass('is-visible');
    //         // console.log("here1");
    //     } else {
    //         // on mobile close submenu
    //         $main_nav.children('ul').removeClass('is-visible');
    //         //show modal layer
    //         $form_modal.addClass('is-visible'); 
    //         //show the selected form
    //         // ( $(event.target).is('.cd-signup') ) ? signup_selected() : login_selected();
    //         $form_new_trip.addClass('is-selected');
    //         // console.log("here2");
    //     }
    // });
    
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
        tripObject = {},
        tempDate;

    tripObject.location = parentFormInput[0].value;
    tripObject.image = "photo/greece.jpg";
    tempDate = parentFormInput[1].value.split("  ");
    tripObject.arrive = tempDate[0];
    tripObject.year = tempDate[1];
    tempDate = parentFormInput[2].value.split("  ");
    tripObject.depart = tempDate[0];
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
        console.log(thisDate.getFullYear() + "-" + thisDate.getMonth() + "-" + thisDate.getDate());
    }
}



