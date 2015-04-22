	var events = events || {},
	events = JSON.parse(localStorage.getItem("eventsData"));

	data = data || {};

	var defaults = {
		eventsStyle: "event-style",
		eventId: "event-",
		eventsImageHolder: "event-style-image",
		eventsTextHolder: "event-style-text",
		eventSpot: "event-spot"
	}, codes = {
		"1" : "#day1",
		"2" : "#day2",
		"3" : "#day3"
	};

	var eventsAddListener = function() {
		$('.new-event-save').click(function() {
			var parentForm = $(this).closest('.new-form');
			var parentFormInput = parentForm.find(':input');
			var errorMessage = "Title can not be empty",
            id, code, imageSrc, title, time, location, tempData;

            title = parentFormInput[0].value;
            location = parentFormInput[1].value;
            code = parentFormInput[2].value;
            time = parentFormInput[3].value + "-" + parentFormInput[4].value;
            imageSrc = "icon/icon-plane-e.png";
            id = new Date().getTime();

            if (!title) {
            	alert(errorMessage);
            	return;
        	}

        	tempData = {
        		id : id,
        		code: "1",
        		title: title,
        		location: location,
        		time: time,
        		imageSrc: imageSrc
        	};

        	data[id] = tempData;
        	localStorage.setItem("todoData", JSON.stringify(data));
        	
        	generateElement(tempData);

        	parentFormInput[0].value = "";
        	parentFormInput[1].value = "";
        	parentFormInput[2].value = "";
        	parentFormInput[3].value = "";
        	parentFormInput[4].value = "";
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


	var eventsClear = function () {
        data = {};
        localStorage.setItem("eventsData", JSON.stringify(data));
        $("." + defaults.eventsStyle).remove();
        $("." + defaults.eventSpot).addClass('empty');
        $("." + defaults.eventSpot).removeClass('noBackground');
    };

    var generateElement = function(params){
    	var parent = $(codes[1]),
    	sectionWrapper,
    	imageWrapper,
    	textWrapper;

    	var nextEmpty = parent.find('.empty' + ':first');
    	if (!nextEmpty) {
    		return;
    	}
    	nextEmpty.removeClass('empty');
    	nextEmpty.addClass('noBackground');
    	//Mine
    	sectionWrapper = $("<section />", {
    		"class" : defaults.eventsStyle,
    		"id" : defaults.eventId + params.id
    	}).appendTo(nextEmpty);

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
    		"text": params.time
    	}).appendTo(textWrapper);

		$("<div />", {
			"class": "clear"
    	}).appendTo(sectionWrapper);    	

    };