// $(function() {
	var allEvents = ["test"]; ///only for eric 
	var events = events || {};
	var LOCALDATA = JSON.parse(localStorage.getItem("tripData"));
	// var LOCALDATA[tripID].events;
    var dateRange = [];  //Aug. 11 - Aug. 14
    var tripID;
    var eventType;
    var openBox = false;
    var autocomplete;

	var defaults = {
		eventsStyle: "event-style",
		eventId: "event-",
		eventsImageHolder: "event-style-image",
		eventsTextHolder: "event-style-text",
		notEmptySpot: "not-empty",
		eventSpot: "event-spot",
		plcaeHolderLeft: "place-holder-circle",
		plcaeHolderRight: "place-holder-text",
		dayIndexGap: 50
	}
	// var codes = {
	// 	"1" : "#day1",
	// 	"2" : "#day2",
	// 	"3" : "#day3"
	// };
	var monthRef = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

	function schedule_init(){
		getIDfromURL();				//Know which trip this is
		// console.log(LOCALDATA[tripID].events);
		calcArriveToDepartDates(LOCALDATA[tripID].arrive,LOCALDATA[tripID].depart);  //culculate a list of dates
		// codes();
		tripTableInit();			//for each trip day create a column
		expandFunc();        		//make the form expandable
		eventsInit();				//Init all the exist events
		slickInit();				//Init slick slide
		modalEvent();				//action to close modal
		schedule_mobile_init();
	}

	var getIDfromURL = function(){
		var query = window.location.search.substring(1);
		querySplit = query.split('=');
		tripID = querySplit[1];
	}

	var calcArriveToDepartDates = function(arriveDate, departDate) {
        var year = 2015,
        	tempSplit,  //[Ang,16]
        	startDate,  //2015.8.16
        	endDate;	//2015.8.19

        tempSplit = arriveDate.split('. ');
        tempSplit[0] = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(tempSplit[0]) / 3;
        startDate = new Date(year,tempSplit[0],tempSplit[1]);

        tempSplit = departDate.split('. ');
        tempSplit[0] = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(tempSplit[0]) / 3;
        endDate = new Date(year,tempSplit[0],tempSplit[1]);

        for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            // console.log(d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate());
            dateRange.push(monthRef[d.getMonth()] + ". " + d.getDate());
        }
    }

    // var codesInit = function() {
    // 	for (var i = 0; i < dateRange.length; i++) {
    // 		codes[i] = "day-" + i;
    // 	}
    // }

    var tripTableInit = function() {
    	var $tripHeaderText = $('#trip-title-h2'),
    		$tripContentParent = $('.trip-days-content'),
    		tripDayStyle = 'trip-days',
    		idPrefix = 'day-',
    		eventStyle = 'event-spot empty',
    		circleStyle = 'place-holder-circle',
    		textStyle = 'place-holder-text',
    		sectionWrapper,	//<div id="day-1" class="trip-days">
    		eventWrapper, //<div class="event-spot empty">
    		circleWrapper, //<div class="place-holder-circle">
    		textWrapper; //<div class="place-holder-text">

    	$tripHeaderText.text("My trip to " + LOCALDATA[tripID].location);

    	for (var i = 0; i < dateRange.length; i++) {
    		// console.log("fun");
    		sectionWrapper = $("<div />", {
    			"id": idPrefix + i,
    			"class": tripDayStyle
    		}).appendTo($tripContentParent);

  			$('<h3 />',{
    			'text': dateRange[i]
    		}).appendTo(sectionWrapper);

    		for (var j = 0; j < 8; j++) {
    			eventWrapper = $('<div />', {
    				'class': eventStyle
    			}).appendTo(sectionWrapper);

    			circleWrapper = $('<div />', {
    				'class': circleStyle
    			}).appendTo(eventWrapper);
    			$('<p />', {
    				'text' : "Event icon"
    			}).appendTo(circleWrapper);
    			textWrapper = $('<div />', {
    				'class' : textStyle
    			}).appendTo(eventWrapper);
    			$('<p />', {
    				'text' : "Title/Location/Time"
    			}).appendTo(textWrapper);

    			$('<div />', {
    				'class' : "clear"
    			}).appendTo(eventWrapper);
    		};
    	};
    }

	var expandFunc = function(){
		$('.trip-events-detail').click(function() {
			var parentCategory = $(this).closest('.trip-events-category');
			var nextAddEventContainer = parentCategory.next('.trip-events-add-container');
			var nextAddEvent = nextAddEventContainer.find('.trip-events-add');
			// var thisEventTypeID = $(this).attr("id");
			if (!openBox){
				openBox = !openBox;
				$('.trip-events-add').each(function() {
					$(this).empty();
				});
				$('.trip-events-add-before').each(function() {
					$(this).remove();
				});
				$('.trip-events-add-after').each(function() {
					$(this).remove();
				});

				eventType = $(this).attr("id");

				$(this).addClass('changeOpacity');
				nextAddEvent.addClass('expandHeight');
				triangleInit(nextAddEventContainer,$(this));
				createNewEventForm(nextAddEvent);
				timePickerInit();     		//timePicker for the form
				eventsAddListener();    	//When click on save, a new event pop up
			}
			else {
				closeExpandForm();
			}
		});
		$('.div-button').click(function() {
			openBox = false;
			$('.trip-events-detail').each(function() {
				$(this).removeClass('changeOpacity');
			});
			$('.trip-events-add').each(function() {
				$(this).removeClass('expandHeight');
			});
		});
	}

	var closeExpandForm = function(){
		openBox = !openBox;
		$('.trip-events-detail').each(function() {
			$(this).removeClass('changeOpacity');
		});
		$('.trip-events-add').each(function() {
			$(this).removeClass('expandHeight');
		});
	}

	var triangleInit = function($parent,$thisEventType) {
		$('<div />', {
			'class' : 'trip-events-add-before'
		}).appendTo($parent);

		$('<div />', {
			'class' : 'trip-events-add-after'
		}).appendTo($parent);

		var $beforeTriangle = $parent.find('.trip-events-add-before');
		var $afterTriangle = $parent.find('.trip-events-add-after');

		var EventTyplePostion = $thisEventType.position();
		var parentPostion = $parent.position();

		$beforeTriangle.css({"left": EventTyplePostion.left -parentPostion.left + 36 + "px"});
		$afterTriangle.css({"left": EventTyplePostion.left -parentPostion.left + 35 + "px"});
	}

	var createNewEventForm = function($parent) {
		var sectionWrapper, 
		//<form action="" class="new-form" id="new-event-form">
		fieldset, 
		// <p class="fieldset">
		selectWrapper, 
		//<select class="input-style full-width has-padding has-border date start" type="text"  placeholder="Date">
		timePicker; 
		// <span class="timePicker"

		//form div
		sectionWrapper = $('<form />', {
			'class' : "new-form",
			'id' : "new-event-form"
		}).appendTo($parent);

		// input -> Title
		fieldset = $('<p />', {
			'class' : "fieldset"
		}).appendTo(sectionWrapper);
		$('<input />', {
			'class' : "input-style full-width has-padding has-border",
			'type' : "text",
			'id' : "cd-event-title",
 			'placeholder' : "Title"
		}).appendTo(fieldset);
		$('<span />', {
			'class' : "cd-error-message",
			'text' : "Maybe a title?"
		}).appendTo(fieldset);

		// input -> Location
		fieldset = $('<p />', {
			'class' : "fieldset"
		}).appendTo(sectionWrapper);
		$('<input />', {
			'class' : "input-style full-width has-padding has-border",
			'type' : "text",
			'id' : "cd-event-location",
			'placeholder' : "Location"
		}).appendTo(fieldset);
		$('<span />', {
			'class' : "cd-error-message",
			'text' : "Where are you going?"
		}).appendTo(fieldset);

		// input -> Date Select
		fieldset = $('<p />', {
			'class' : "fieldset half-width"
		}).appendTo(sectionWrapper);
		selectWrapper = $('<select />', {
			'class' : "input-style full-width has-padding has-border",
			'type' : "text",
			'id' : "cd-event-date",
			'placeholder' : "Date"
		}).appendTo(fieldset);
		for (var i = 0; i < dateRange.length; i++) {
			$('<option />', {
				'value' : i,
				'text' : dateRange[i]
			}).appendTo(selectWrapper);
		}
		$('<span />', {
			'class' : "cd-error-message",
			'text' : "What Date?"
		}).appendTo(fieldset);

		//input -> time
		timePicker = $('<span />', {
			'class' : "timePicker"
		}).appendTo(sectionWrapper);
		fieldset = $('<p />', {
			'class' : "fieldset quater-width"
		}).appendTo(timePicker);
		$('<input />', {
			'class' : "input-style half-border full-width has-padding time start",
			'type' : "text",
			'id' : "cd-event-start",
			'placeholder' : "From"
		}).appendTo(fieldset);
		$('<span />', {
			'class' : "cd-error-message",
			'text' : "What Time?"
		}).appendTo(fieldset);
		fieldset = $('<p />', {
			'class' : "fieldset quater-width"
		}).appendTo(timePicker);
		$('<input />', {
			'class' : "input-style has-border full-width has-padding time end",
			'type' : "text",
			'id' : "cd-event-end",
			'placeholder' : "To"
		}).appendTo(fieldset);
		$("<div />", {
			"class": "clear"
    	}).appendTo(sectionWrapper);   		
		// input -> submit

		fieldset = $('<p />', {
			'class' : "fieldset"
		}).appendTo(sectionWrapper);
		$('<input />', {
			'class' : "input-style full-width",
			'id' : "new-event-submit",
			'type' : "submit",
			'value' : "Create New Event"
		}).appendTo(fieldset);
		$('<span />', {
			'class' : "cd-error-message",
			'text' : "Time Conflict!"
		}).appendTo(fieldset);

		locationAutocomplete("cd-event-location");
	}

	var timePickerInit = function() {
		$('.timePicker .time').timepicker({
			'showDuration': true,
			'timeFormat': 'H:i'
		});
    	// initialize datepair
    	$('.timePicker').datepair();
	}

	var eventsAddListener = function() {
		$('#cd-event-title').on('input', function() {
			$(this).removeClass('has-error').next('span').removeClass('is-visible');
		});
		$('#cd-event-location').on('input', function() {
			$(this).removeClass('has-error').next('span').removeClass('is-visible');
		});
		$('#cd-event-date').on('input', function() {
			$(this).removeClass('has-error').next('span').removeClass('is-visible');
			$('#new-event-submit').removeClass('has-error').next('span').removeClass('is-visible');
		});
		$('#cd-event-start').on('input', function() {
			$(this).removeClass('has-error').next('span').removeClass('is-visible');
			$('#new-event-submit').removeClass('has-error').next('span').removeClass('is-visible');
		});
		$('#cd-event-end').on('input', function() {
			$('#cd-event-start').removeClass('has-error').next('span').removeClass('is-visible');
			$('#new-event-submit').removeClass('has-error').next('span').removeClass('is-visible');
		});
		$('#new-event-submit').on('click', function(event){
			// console.log(eventType);
			event.preventDefault();
			var $parentForm = $(this).closest('.new-form');
			var parentFormInput = $parentForm.find(':input');
			// console.log(parentFormInput.length);
			// var parentFormSelect = parentForm.find(':select');
			// var errorTitle = "Title can not be empty",
			// errorDate = "Date can not be empty",
			// errorTitle = "Title can not be empty",
			// errorTime = "Time can not be empty",
			var errorConflict = "Time conflict!",
            id, imageSrc, title, date, location,
            startTime, startTimeSplit, startTimeCode,
            endTime, endTimeSplit, endTimeCode,
            tempData,
            tempI,smallClosestData,bigClosestData,
            lastEndCode, lastElementFlag;

            var eventTypeSplit = eventType.split("-");

            imageSrc = "icon/events/" + eventTypeSplit[1] + "-add.png";
 
            startTime = parentFormInput[3].value;   //2:30
            endTime = parentFormInput[4].value;		//4:30

            startTimeSplit = startTime.split(':');  //2:30 -> [2,30]
            endTimeSplit = endTime.split(':');   	//4:30 -> [4,30]

            startTimeCode = startTimeSplit[0] * 2 + startTimeSplit[1]/30; 	// 2:30 -> 5
            endTimeCode = endTimeSplit[0] * 2 + endTimeSplit[1]/30; 		// 4:30 -> 9

            id = startTimeCode + parentFormInput[2].value * defaults.dayIndexGap;  //day 2 2:30 -> 50 + 5 = 55;

            title = parentFormInput[0].value;
            location = parentFormInput[1].value.split(",")[0];
            date = parentFormInput[2].value;
            if (!title && !date && !startTime && !endTime)
            {
            	return;
            }
            if (!title) {
            	$('#cd-event-title').addClass('has-error').next('span').addClass('is-visible');
            	return;
        	}
        	if (!location) {
            	$('#cd-event-location').addClass('has-error').next('span').addClass('is-visible'); 
            	return;
        	}
        	if (!date) {
            	$('#cd-event-date').addClass('has-error').next('span').addClass('is-visible'); 
            	return;
        	}
        	if (!startTime || !endTime) {
            	$('#cd-event-start').addClass('has-error').next('span').addClass('is-visible'); 
            	return;
        	}
        	// if (!endTime) {
         //    	$('#cd-event-end').addClass('has-error').next('span').addClass('is-visible'); 
         //    	return;
        	// }
        	tempData = {
        		id : id, //55
        		day: parentFormInput[2].value, //1
        		duration: endTimeCode - startTimeCode,
        		image: imageSrc,
        		title: parentFormInput[0].value,  
        		location: location,
        		startTime: parentFormInput[3].value,
        		endTime: parentFormInput[4].value,
        	};

        	var jsonString = JSON.stringify(tempData);/////////// only for eric
        	// allEvents.push(jsonString);
        	console.log(jsonString+ ",");
        	// console.log(allEvents);

        	lastEndCode = 0;
        	lastElementFlag = true;

			var allEvents = LOCALDATA[tripID].events;
			// console.log(allEvents);

			if (allEvents.length == 0)
			{
				allEvents.push(tempData);
        		eventsRefresh();
        		closeExpandForm();
			}
			else
			{
				for (var i = 0; i < allEvents.length - 1; i++) {
					if (tempData.id > allEvents[i].id && tempData.id < allEvents[i+1].id) {
						if (tempData.id >= allEvents[i].id + allEvents[i].duration && tempData.id + tempData.duration <= allEvents[i+1].id) 
						{
							allEvents.splice(i+1,0,tempData);
							eventsRefresh();
							closeExpandForm();
							return ;
						}
						else {
							$('#new-event-submit').addClass('has-error').next('span').addClass('is-visible'); 
							return;
						}

					}
				};
				var allEvents
				if (tempData.id >= allEvents[allEvents.length - 1].id + allEvents[allEvents.length - 1].duration)
				{
					allEvents.push(tempData);
					eventsRefresh();
					closeExpandForm();
				}
				else if (tempData.id + tempData.duration < allEvents[0].id){
					allEvents.splice(0,0,tempData);
					eventsRefresh();
					closeExpandForm();
				}
				else {
					$('#new-event-submit').addClass('has-error').next('span').addClass('is-visible'); 
				}
			}
        	return ;
		});
	}

	var eventsInit = function(options) {
        options = options || {};
        options = $.extend({}, defaults, options);

        // $.each(LOCALDATA[tripID].events, function (index, params) {
        //     generateElement(params);
        // });

		// console.log(LOCALDATA[tripID].events);
		localStorage.setItem("tripData", JSON.stringify(LOCALDATA));
        for (var i = 0; i < LOCALDATA[tripID].events.length; i++) {
        	generateElement(LOCALDATA[tripID].events[i]);
        };
        modalListener();			//listen to open modal
    }

    var eventsRefresh = function() {
        var $notEmptySpot = $("." + defaults.notEmptySpot);
        eventsDelete($notEmptySpot);
        eventsInit();
    }

	var eventsClear = function () {
        LOCALDATA[tripID].events = [];
        localStorage.setItem("tripData", JSON.stringify(LOCALDATA));

        var $notEmptySpot = $("." + defaults.notEmptySpot);
        eventsDelete($notEmptySpot);
    };

    // var events

    var eventsDelete = function (eventDelete) {
        eventDelete.empty();
        eventDelete.addClass('empty');
        eventDelete.removeClass('not-empty');
        eventDelete.removeClass(defaults.eventsStyle);
    	eventDelete.removeClass('animated');
    	eventDelete.removeClass('fadeIn');
    	eventDelete.removeAttr('id');

        var circlePlaceholder = $("<div />", {
    		"class" : defaults.plcaeHolderLeft
    	}).appendTo(eventDelete);

        $("<p />", {
    		"text" : "Event icon"
    	}).appendTo(circlePlaceholder);

    	var textPlaceholder = $("<div />", {
    		"class" : defaults.plcaeHolderRight
    	}).appendTo(eventDelete);

        $("<p />", {
    		"text" : "Title/Location/Time"
    	}).appendTo(textPlaceholder);

        $("<div />", {
			"class": "clear"
    	}).appendTo(eventDelete);
    };

    var generateElement = function(params){
    	// var tempId = "#day-" + 
    	var parent = $("#day-" + params.day),
    	sectionWrapper,
    	imageWrapper,
    	textWrapper;

    	var sectionWrapper = parent.find('.empty' + ':first');
    	if (!sectionWrapper) {
    		return;
    	}

    	sectionWrapper.empty();
    	sectionWrapper.removeClass('empty');
    	sectionWrapper.addClass('not-empty');
    	sectionWrapper.addClass(defaults.eventsStyle);
    	sectionWrapper.addClass('animated');
    	sectionWrapper.addClass('fadeIn');
    	sectionWrapper.attr('id', defaults.eventId + params.id);
    	//Mine
    	// sectionWrapper = $("<section />", {
    	// 	"class" : defaults.eventsStyle + " animated fadeInDown",
    	// 	"id" : defaults.eventId + params.id
    	// }).appendTo(nextEmpty);

    	imageWrapper = $("<div />", {
    		"class" : defaults.eventsImageHolder
    	}).appendTo(sectionWrapper);

    	$("<img />", {
    		"src" : params.image
    		// "onclick" : editEvent()
    	}).appendTo(imageWrapper);
    	// $("<p />", {
    	// 	"text" : "EDIT"
    	// }).appendTo(imageWrapper);

    	textWrapper = $("<div />", {
    		"class" : defaults.eventsTextHolder
    	}).appendTo(sectionWrapper);

    	$("<h4 />", {
    		"text": params.title
    	}).appendTo(textWrapper);

    	$("<p />", {
    		"text": params.location
    	}).appendTo(textWrapper);

    	$("<p />", {
    		"class" : "timeP",
    		"text": params.startTime + " - " + params.endTime
    	}).appendTo(textWrapper);

		$("<div />", {
			"class": "clear"
    	}).appendTo(sectionWrapper);    	
    };

    var slickInit = function() {
    	// console.log(WINDOW_WIDTH);
    	if (WINDOW_WIDTH < 420){
    			$('.trip-days-content').slick({

    		        slidesToShow: 1,
    		        slidesToScroll: 1,
    		        infinite: false
    		    }); 	
    	}
    	if (WINDOW_WIDTH < 768){
    			$('.trip-days-content').slick({

    		        slidesToShow: 2,
    		        slidesToScroll: 1,
    		        infinite: false
    		    }); 	
    	} else {
    	$('.trip-days-content').slick({

            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false
        }); 


    	}
    }

    var modalListener = function(){
    	$("#share-trip").on('click',function() {
    		$('.pop-modal').addClass('is-visible'); 
    		$('#share-trip-modal').addClass('is-selected');
    	});
    	$("#save-trip").on('click',function() {
    		$('.pop-modal').addClass('is-visible'); 
    		$('#save-trip-modal').addClass('is-selected');
    		saveTripListener();
    	});
    	$("#delete-trip").on('click',function() {
    		$('.pop-modal').addClass('is-visible'); 
    		$('#delete-trip-modal').addClass('is-selected');
    		deleteTripListener();
    	});
    	$(".event-style-image").on('click',function() {
    		console.log("here!");
    		var thisID = $(this).parent().attr("id");
    		var thisIDSplit = thisID.split("-");
    		var IDNumber = thisIDSplit[1];
    		var allEvents = LOCALDATA[tripID].events;
    		for (var i = 0; i < allEvents.length; i++) {
    			if (allEvents[i].id == IDNumber) {
    				var theEvent = allEvents[i];
    				editEventForm($('#edit-event-modal'),theEvent,i);
    			}
    		}
    		$('.pop-modal').addClass('is-visible'); 
    		$('#edit-event-modal').addClass('is-selected');
    	});
    }

    var deleteTripListener = function(){
    	$('#delete-trip-delete').on('click',function(event){
    		event.preventDefault();
    		LOCALDATA.splice(tripID,1);
    		localStorage.setItem("tripData", JSON.stringify(LOCALDATA));
    		window.location = "./dashboard";
    	});
    	$('#delete-trip-cancel').on('click',function(event){
    		event.preventDefault();
    		$('.pop-modal').removeClass('is-visible');
            $('.schedule-modal').removeClass('is-selected');
    	});
    }

    var saveTripListener = function(){
    	$('#save-trip-dashboard').on('click',function(event){
    		event.preventDefault();
    		window.location = "./dashboard";
    	});
    	$('#save-trip-stay').on('click',function(event){
    		event.preventDefault();
    		$('.pop-modal').removeClass('is-visible');
            $('.schedule-modal').removeClass('is-selected');
    	});
    }

    var editEventForm = function($parent,theEvent,index) {
		var sectionWrapper, 
		//<form action="" class="new-form" id="new-event-form">
		fieldset, 
		// <p class="fieldset">
		selectWrapper, 
		//<select class="input-style full-width has-padding has-border date start" type="text"  placeholder="Date">
		timePicker; 
		// <span class="timePicker"

		//form div
		sectionWrapper = $('<form />', {
			'class' : "new-form",
			'id' : "new-event-form"
		}).appendTo($parent);

		// input -> Title
		fieldset = $('<p />', {
			'class' : "fieldset"
		}).appendTo(sectionWrapper);
		$('<input />', {
			'class' : "input-style full-width has-padding has-border",
			'type' : "text",
			'id' : "cd-change-event-title",
 			'placeholder' : "Title",
 			'value' : theEvent.title
		}).appendTo(fieldset);
		$('<span />', {
			'class' : "cd-error-message",
			'text' : "Maybe a title?"
		}).appendTo(fieldset);

		// input -> Location
		fieldset = $('<p />', {
			'class' : "fieldset"
		}).appendTo(sectionWrapper);
		$('<input />', {
			'class' : "input-style full-width has-padding has-border",
			'type' : "text",
			'id' : "cd-change-event-location",
			'placeholder' : "Location",
			'value' : theEvent.location
		}).appendTo(fieldset);
		$('<span />', {
			'class' : "cd-error-message",
			'text' : "Where are you going?"
		}).appendTo(fieldset);

		// input -> Date Select
		fieldset = $('<p />', {
			'class' : "fieldset half-width"
		}).appendTo(sectionWrapper);
		selectWrapper = $('<select />', {
			'class' : "input-style full-width has-padding has-border",
			'type' : "text",
			'id' : "cd-event-date",
			'placeholder' : "Date"
		}).appendTo(fieldset);
		for (var i = 0; i < dateRange.length; i++) {
			if (i == theEvent.day){
				$('<option />', {
				'value' : i,
				'text' : dateRange[i],
				'selected' : "selected"
				}).appendTo(selectWrapper);
			}
			else {
				$('<option />', {
				'value' : i,
				'text' : dateRange[i]
				}).appendTo(selectWrapper);
			}
		}
		$('<span />', {
			'class' : "cd-error-message",
			'text' : "What Date?"
		}).appendTo(fieldset);

		//input -> time
		timePicker = $('<span />', {
			'class' : "timePicker"
		}).appendTo(sectionWrapper);
		fieldset = $('<p />', {
			'class' : "fieldset quater-width"
		}).appendTo(timePicker);
		$('<input />', {
			'class' : "input-style half-border full-width has-padding time start",
			'type' : "text",
			'id' : "cd-change-event-start",
			'placeholder' : "From",
			'value' : theEvent.startTime
		}).appendTo(fieldset);
		$('<span />', {
			'class' : "cd-error-message",
			'text' : "What Time?"
		}).appendTo(fieldset);
		fieldset = $('<p />', {
			'class' : "fieldset quater-width"
		}).appendTo(timePicker);
		$('<input />', {
			'class' : "input-style has-border full-width has-padding time end",
			'type' : "text",
			'id' : "cd-change-event-end",
			'placeholder' : "To",
			'value' : theEvent.endTime
		}).appendTo(fieldset);
		$("<div />", {
			"class": "clear"
    	}).appendTo(sectionWrapper);   	

		// button -> change
		fieldset = $('<p />', {
			'class' : "fieldset half-width"
		}).appendTo(sectionWrapper);
		$('<input />', {
			'class' : "input-style full-width",
			'id' : "cd-change-event-change",
			'type' : "submit",
			'value' : "Change"
		}).appendTo(fieldset);
		$('<span />', {
			'class' : "cd-error-message",
			'text' : "Time Conflict!"
		}).appendTo(fieldset);

		// button -> delete
		fieldset = $('<p />', {
			'class' : "fieldset quater-width"
		}).appendTo(sectionWrapper);
		$('<input />', {
			'class' : "input-style full-width",
			'id' : "cd-change-event-cancel",
			'type' : "submit",
			'value' : "Cancel"
		}).appendTo(fieldset);
		$('<span />', {
			'class' : "cd-error-message",
			'text' : "Time Conflict!"
		}).appendTo(fieldset);

		// button -> delete
		fieldset = $('<p />', {
			'class' : "fieldset quater-width"
		}).appendTo(sectionWrapper);
		$('<input />', {
			'class' : "input-style full-width",
			'id' : "cd-change-event-delete",
			'type' : "submit",
			'value' : "Delete"
		}).appendTo(fieldset);
		$('<span />', {
			'class' : "cd-error-message",
			'text' : "Time Conflict!"
		}).appendTo(fieldset);

		$("<div />", {
			"class": "clear"
    	}).appendTo(sectionWrapper);

    	timePickerInit();
    	locationAutocomplete("cd-change-event-location");

    	$('#cd-change-event-delete').on('click',function(event){
    		event.preventDefault();
    		LOCALDATA[tripID].events.splice(index,1);
    		eventsRefresh();
    		$('.pop-modal').removeClass('is-visible');
            $('.schedule-modal').removeClass('is-selected');
            $('#edit-event-modal').empty();
    	});

    	$('#cd-change-event-cancel').on('click',function(event){
    		event.preventDefault();
    		$('.pop-modal').removeClass('is-visible');
            $('.schedule-modal').removeClass('is-selected');
            $('#edit-event-modal').empty();
    	});

    	$('#cd-change-event-change').on('click',function(event){
    		event.preventDefault();
			var $parentForm = $(this).closest('.new-form');
			var parentFormInput = $parentForm.find(':input');
			console.log(parentFormInput.length);
			// var parentFormSelect = parentForm.find(':select');
			// var errorTitle = "Title can not be empty",
			// errorDate = "Date can not be empty",
			// errorTitle = "Title can not be empty",
			// errorTime = "Time can not be empty",
			var errorConflict = "Time conflict!",
            id, imageSrc, title, date, location,
            startTime, startTimeSplit, startTimeCode,
            endTime, endTimeSplit, endTimeCode,
            tempData,
            tempI,smallClosestData,bigClosestData,
            lastEndCode, lastElementFlag;
 
            startTime = parentFormInput[3].value;   //2:30
            endTime = parentFormInput[4].value;		//4:30

            startTimeSplit = startTime.split(':');  //2:30 -> [2,30]
            endTimeSplit = endTime.split(':');   	//4:30 -> [4,30]

            startTimeCode = startTimeSplit[0] * 2 + startTimeSplit[1]/30; 	// 2:30 -> 5
            endTimeCode = endTimeSplit[0] * 2 + endTimeSplit[1]/30; 		// 4:30 -> 9

            id = startTimeCode + parentFormInput[2].value * defaults.dayIndexGap;  //day 2 2:30 -> 50 + 5 = 55;

            title = parentFormInput[0].value;
            location = parentFormInput[1].value;
            date = parentFormInput[2].value;
            if (!title && !date && !startTime && !endTime)
            {
            	return;
            }
            if (!title) {
            	$('#cd-change-event-title').addClass('has-error').next('span').addClass('is-visible');
            	return;
        	}
        	if (!location) {
            	$('#cd-change-event-location').addClass('has-error').next('span').addClass('is-visible'); 
            	return;
        	}
        	if (!date) {
            	$('#cd-change-event-date').addClass('has-error').next('span').addClass('is-visible'); 
            	return;
        	}
        	if (!startTime || !endTime) {
            	$('#cd-change-event-start').addClass('has-error').next('span').addClass('is-visible'); 
            	return;
        	}
        	tempData = {
        		id : id, //55
        		day: parentFormInput[2].value, //1
        		duration: endTimeCode - startTimeCode,
        		image: theEvent.image,
        		title: parentFormInput[0].value,  
        		location: parentFormInput[1].value.split(",")[0],
        		startTime: parentFormInput[3].value,
        		endTime: parentFormInput[4].value,
        	};

        	lastEndCode = 0;
        	lastElementFlag = true;

			var allEvents = LOCALDATA[tripID].events;
			// console.log(allEvents);
			var tempSplice = LOCALDATA[tripID].events[index];
			LOCALDATA[tripID].events.splice(index,1);
			if (allEvents.length == 0)
			{
				allEvents.push(tempData);
        		eventsRefresh();
        		closeExpandForm();
			}
			else
			{
				for (var i = 0; i < allEvents.length - 1; i++) {
					if (tempData.id > allEvents[i].id && tempData.id < allEvents[i+1].id) {
						if (tempData.id >= allEvents[i].id + allEvents[i].duration && tempData.id + tempData.duration <= allEvents[i+1].id) 
						{
							allEvents.splice(i+1,0,tempData);
							eventsRefresh();
							$('.pop-modal').removeClass('is-visible');
            				$('.schedule-modal').removeClass('is-selected');
            				$('#edit-event-modal').empty();
							return ;
						}
						else {
							$('#cd-change-event-change').addClass('has-error').next('span').addClass('is-visible'); 
							LOCALDATA[tripID].events.splice(index,0,theEvent);
							return;
						}

					}
				};
				var allEvents
				if (tempData.id >= allEvents[allEvents.length - 1].id + allEvents[allEvents.length - 1].duration)
				{
					allEvents.push(tempData);
					eventsRefresh();
					$('.pop-modal').removeClass('is-visible');
            		$('.schedule-modal').removeClass('is-selected');
            		$('#edit-event-modal').empty();
				}
				else if (tempData.id + tempData.duration < allEvents[0].id){
					allEvents.splice(0,0,tempData);
					eventsRefresh();
					$('.pop-modal').removeClass('is-visible');
            		$('.schedule-modal').removeClass('is-selected');
            		$('#edit-event-modal').empty();
				}
				else {
					$('#cd-change-event-change').addClass('has-error').next('span').addClass('is-visible'); 
				}
			}
		});
		// modalListener();
	}

var modalEvent = function(){
    
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

var schedule_mobile_init = function()
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
        $("#hamburger-menu").animate({height:'220px'});
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

var locationAutocomplete = function(IDtag) {
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById(IDtag)),
      {
        types: []
    });
  // places = new google.maps.places.PlacesService(map);

  google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);
}
  
    $(window).resize(function() {  	//change slick if resizes 
    // WINDOW_HEIGTH = $(window).height();
    WINDOW_WIDTH  = $(window).width();
    // console.log(WINDOW_WIDTH);

    slickInit();

    });


