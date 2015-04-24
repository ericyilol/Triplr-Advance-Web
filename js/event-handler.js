	var events = events || {},
	events = JSON.parse(localStorage.getItem("eventsData"));

	data = data || {};

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
	}, codes = {
		"1" : "#day1",
		"2" : "#day2",
		"3" : "#day3"
	};

	var eventsAddListener = function() {
		$('.new-event-save').click(function() {
			var parentForm = $(this).closest('.new-form');
			var parentFormInput = parentForm.find(':input');
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
        	$.each(data, function (index, params) {
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
        					data[id] = tempData;
        					localStorage.setItem("todoData", JSON.stringify(data));
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
        		data[id] = tempData;
        		localStorage.setItem("todoData", JSON.stringify(data));
        	}
        	parentFormInput[0].value = "";
        	parentFormInput[1].value = "";
        	parentFormInput[2].value = "";
        	parentFormInput[3].value = "";
        	parentFormInput[4].value = "";
        	tempData = {};
		});
	}

	var eventInit = function(options) {
		options = options || {};
        options = $.extend({}, defaults, options);

        $.each(data, function (index, params) {
            generateElement(params);
        });

        eventsAddListener();
	}

	var eventInit = function(options) {
		options = options || {};
        options = $.extend({}, defaults, options);

        $.each(data, function (index, params) {
            generateElement(params);
        });

        eventsAddListener();
	}

	var eventsClear = function () {
        data = {};
        localStorage.setItem("eventsData", JSON.stringify(data));

        var notEmptySpot = $("." + defaults.notEmptySpot);
        eventsDelete(notEmptySpot);
    };

    var eventsClearNoDelete = function () {
        var notEmptySpot = $("." + defaults.notEmptySpot);
        eventsDelete(notEmptySpot);
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
    	var parent = $(codes[params.code]),
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

    	// var nextEmpty = parent.find('.empty' + ':first');
    	// if (!nextEmpty) {
    	// 	return;
    	// }
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