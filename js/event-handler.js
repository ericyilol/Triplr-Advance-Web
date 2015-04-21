	var events = events || {},
	events = JSON.parse(localStorage.getItem("eventsData"));

	data = data || {};

	var defaults = {
		eventsStyle: "event-style",
		eventId: "event-",
		eventsImageHolder: "event-style-image"
	}, codes = {
		"1" : "#pending",
		"2" : "#inProgress",
		"3" : "#completed"
	};

	var eventsAdd = function() {
		alert("share we?");
	}


	var eventsClear = function () {
        data = {};
        localStorage.setItem("eventsData", JSON.stringify(data));
        $("." + defaults.todoTask).remove();
    };

    var generateElement = function(params){
    	var parent = $(codes[params.code]),
    	sectionWrapper,
    	imageWrapper,
    	textWrapper;

    	if (!parent) {
    		return;
    	}

    	wrapper = $("<div />", {
    		"class" : defaults.todoTask,
    		"id" : defaults.taskId + params.id,
    		"data" : params.id
    	}).appendTo(parent);

    	$("<div />", {
    		"class" : defaults.todoHeader,
    		"text": params.title
    	}).appendTo(wrapper);

    	$("<div />", {
    		"class" : defaults.todoDate,
    		"text": params.date
    	}).appendTo(wrapper);

    	$("<div />", {
    		"class" : defaults.todoDescription,
    		"text": params.description
    	}).appendTo(wrapper);


    	//Mine
    	sectionWrapper = $("<section />", {
    		"class" : defaults.eventsStyle,
    		"id" : defaults.eventId + params.id
    	}).appendTo(parent);

    	imageWrapper = $("<div />", {
    		"class" : defaults.eventsImageHolder
    	}).appendTo(sectionWrapper);


    	<section class = "event-style">
                                    <div class="event-style-image">
                                        <img src="icon/icon-plane-e.png" alt="">
                                    </div>
                                    <div class="event-style-text">
                                        <p>Arrive at Amsterdam</p>
                                        <p>Amsterdam Airport</p>
                                        <p>8:00am - 9:00am</p>
                                    </div>
                                    <div class="clear"></div>
                                </section>

    };