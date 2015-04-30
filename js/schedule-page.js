// $(function() {
	var events = events || {};
	var EVENTDATA = JSON.parse(localStorage.getItem("eventsData"));
	var LOCALDATA = JSON.parse(localStorage.getItem("tripData"));
    var dateRange = [];  //Aug. 11 - Aug. 14
    var tripID;

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
		calcArriveToDepartDates(LOCALDATA[tripID].arrive,LOCALDATA[tripID].depart);  //culculate a list of dates
		// codes();
		tripTableInit();			//for each trip day create a column
		expandFunc();        		//make the form expandable
		eventInit();				//Init all the exist events
		slickInit();				//Init slick slider
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
		var openBox = false;
		$('.trip-events-detail').click(function() {
			var parentCategory = $(this).closest('.trip-events-category');
			var nextAddEvent = parentCategory.next('.trip-events-add');
			if (!openBox){
				openBox = !openBox;
				$(this).addClass('changeOpacity');
				nextAddEvent.addClass('expandHeight');
				createNewEventForm(nextAddEvent);
				timePickerInit();     		//timePicker for the form
				eventsAddListener();    	//When click on save, a new event pop up
			}
			else {
				openBox = !openBox;
				$('.trip-events-detail').each(function() {
					$(this).removeClass('changeOpacity');
				});
				$('.trip-events-add').each(function() {
					$(this).removeClass('expandHeight');
					$(this).empty();
				});
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

	var createNewEventForm = function($parent) {
		var sectionWrapper, 
		//<form action="" class="new-form" id="new-event-form">
		fieldset, 
		// <p class="fieldset">
		selectWrapper, 
		//<select class="input-style full-width has-padding has-border date start" type="text"  placeholder="Date">
		timePicker; 
		// <span class="timePicker">

		//from div
		sectionWrapper = $('<form />', {
			'class' : "new-form",
			'id' : "new-event-form"
		}).prependTo($parent);

		// input -> Title
		fieldset = $('<p />', {
			'class' : "fieldset"
		}).appendTo(sectionWrapper);
		$('<input />', {
			'class' : "input-style full-width has-padding has-border",
			'type' : "text",
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
			'placeholder' : "Location"
		}).appendTo(fieldset);

		// input -> Date Select
		fieldset = $('<p />', {
			'class' : "fieldset half-width"
		}).appendTo(sectionWrapper);
		selectWrapper = $('<select />', {
			'class' : "input-style full-width has-padding has-border",
			'type' : "text",
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
			'placeholder' : "From"
		}).appendTo(fieldset);
		$('<span />', {
			'class' : "cd-error-message",
			'text' : "Start Time?"
		}).appendTo(fieldset);
		fieldset = $('<p />', {
			'class' : "fieldset quater-width"
		}).appendTo(timePicker);
		$('<input />', {
			'class' : "input-style has-border full-width has-padding time end",
			'type' : "text",
			'placeholder' : "To"
		}).appendTo(fieldset);
		$('<span />', {
			'class' : "cd-error-message",
			'text' : "End Time?"
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
	}

	var timePickerInit = function() {
		$('.timePicker .time').timepicker({
			'showDuration': true,
			'timeFormat': 'H:i'
		});
    	// initialize datepair
    	$('.timePicker').datepair();
	}
    
    var eventInit = function(options) {
        options = options || {};
        options = $.extend({}, defaults, options);

        $.each(EVENTDATA, function (index, params) {
            generateElement(params);
        });
    }

	var eventsAddListener = function() {
		$('#new-event-submit').on('click', function(event){
			console.log("here!");
			event.preventDefault();
			var $parentForm = $(this).closest('.new-form');
			var parentFormInput = $parentForm.find(':input');
			console.log(parentFormInput.length);
			// var parentFormSelect = parentForm.find(':select');
			var errorTitle = "Title can not be empty",
			errorDate = "Date can not be empty",
			errorTitle = "Title can not be empty",
			errorTime = "Time can not be empty",
			errorConflict = "Time conflict!",
            id, imageSrc, title, date,
            startTime, startTimeSplit, startTimeCode,
            endTime, endTimeSplit, endTimeCode,
            tempData,
            tempI,smallClosestData,bigClosestData,
            lastEndCode, lastElementFlag;

            imageSrc = "icon/icon-plane-e.png";
 
            startTime = parentFormInput[3].value;
            endTime = parentFormInput[4].value;

            startTimeSplit = startTime.split(':');
            endTimeSplit = endTime.split(':');

            startTimeCode = startTimeSplit[0] * 2 + startTimeSplit[1]/30;
            endTimeCode = endTimeSplit[0] * 2 + endTimeSplit[1]/30;

            id = startTimeCode + parentFormInput[2].value * defaults.dayIndexGap;

            console.log("id:" + id);

            title = parentFormInput[0].value;
            date = parentFormInput[2].value;
            if (!title && !date && !startTime && !endTime)
            {
            	return;
            }
            if (!title) {
            	alert(errorTitle);
            	console.log("title:" + parentFormInput[0].value);
            	console.log("location:" + parentFormInput[1].value);
            	console.log("date:" + parentFormInput[2].value);
            	console.log("start:" + parentFormInput[3].value);
            	console.log("end:" + parentFormInput[4].value);
            	return;
        	}

        	if (!date) {
            	alert(errorDate);
            	return;
        	}

        	if (!startTime || !endTime) {
            	alert(errorTime);
            	return;
        	}


        	tempData = {
        		id : id,
        		code: parentFormInput[2].value,
        		title: parentFormInput[0].value,
        		location: parentFormInput[1].value,
        		startTime: parentFormInput[3].value,
        		startIndex: startTimeCode,
        		endTime: parentFormInput[4].value,
        		endIndex: endTimeCode,
        		imageSrc: imageSrc
        	};

        	lastEndCode = 0;
        	lastElementFlag = true;
        	$.each(EVENTDATA, function (index, params) {
        		if (tempData.code == params.code) {
        			if (tempData.startIndex < params.startIndex) {
        				lastElementFlag = false;
        				console.log(tempData.code);
        				console.log(params.code);
        				console.log(tempData.startIndex);
        				console.log(lastEndCode);
        				console.log(tempData.endIndex);
        				console.log(params.startIndex);
        				if (tempData.startIndex >= lastEndCode && tempData.endIndex <= params.startIndex)
        				{
        					EVENTDATA[id] = tempData;
        					localStorage.setItem("eventsData", JSON.stringify(EVENTDATA));
        					eventsClearNoDelete();
        					eventInit();
        					return false;
        				}
        				else {
        					alert(errorConflict);
        					return false;
        				}
        			}
        			else {
        				lastEndCode = params.endIndex;
        			}
        		}
        	});

        	if (lastElementFlag) {
        		generateElement(tempData);
        		EVENTDATA[id] = tempData;
        		localStorage.setItem("eventsData", JSON.stringify(EVENTDATA));
        	}
        	parentFormInput[0].value = "";
        	parentFormInput[1].value = "";
        	parentFormInput[2].value = "";
        	parentFormInput[3].value = "";
        	parentFormInput[4].value = "";
        	tempData = {};
		});
	}

	var eventsClear = function () {
        EVENTDATA = {};
        localStorage.setItem("eventsData", JSON.stringify(EVENTDATA));

        var $notEmptySpot = $("." + defaults.notEmptySpot);
        eventsDelete($notEmptySpot);
    };

    var eventsClearNoDelete = function () {
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
    	var parent = $("#day-" + params.code),
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
    		"src" : params.imageSrc
    	}).appendTo(imageWrapper);
    	// $("<p />", {
    	// 	"text" : "EDIT"
    	// }).appendTo(imageWrapper);

    	textWrapper = $("<div />", {
    		"class" : defaults.eventsTextHolder
    	}).appendTo(sectionWrapper);

    	$("<p />", {
    		"text": params.title
    	}).appendTo(textWrapper);

    	$("<p />", {
    		"text": params.location
    	}).appendTo(textWrapper);

    	$("<p />", {
    		"text": params.startTime + " ~ " + params.endTime
    	}).appendTo(textWrapper);

		$("<div />", {
			"class": "clear"
    	}).appendTo(sectionWrapper);    	
    };

    var insertElementBefore = function(params,paramsInsert){
    	// var parent = $(codes[params.code]),
    	var sectionWrapper,
    	imageWrapper,
    	textWrapper;

    	var beforeNode = $('#' + defaults.eventId + paramsInsert.id);
    	console.log(beforeNode);

    	//Mine
    	sectionWrapper = $("<div />", {
    		"class" : defaults.eventsStyle + " animated fadeIn" + defaults.eventSpot,
    		"id" : defaults.eventId + params.id,

    	}).insertBefore(beforeNode);

    	imageWrapper = $("<div />", {
    		"class" : defaults.eventsImageHolder
    	}).appendTo(sectionWrapper);

    	$("<img />", {
    		"src" : params.imageSrc
    	}).appendTo(imageWrapper);

    	textWrapper = $("<div />", {
    		"class" : defaults.eventsTextHolder
    	}).appendTo(sectionWrapper);

    	$("<p />", {
    		"text": params.title
    	}).appendTo(textWrapper);

    	$("<p />", {
    		"text": params.location
    	}).appendTo(textWrapper);

    	$("<p />", {
    		"text": params.startTime + " ~ " + params.endTime
    	}).appendTo(textWrapper);

		$("<div />", {
			"class": "clear"
    	}).appendTo(sectionWrapper);    	
    };

    var slickInit = function() {
    	$('.trip-days-content').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false
        }); 
    }
