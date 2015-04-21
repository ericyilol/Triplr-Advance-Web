// $(function() {
	function schedule_init(){
		// trianlesInit();
		trianglesUpdate();
		expandFunc();
	}

	var trianglesUpdate = function(){
		$('.trip-events-section').scroll(function() {
  			// trianlesInit();
		});
	}

	var trianlesInit = function(){
		var triangleTop = $('.trip-events-add').position().top - 10;
		var triangleLeft = $('.trip-events-add').position().left + 90;
		$('.triangle_1').css({'left':triangleLeft+'px'});
		$('.triangle_1').css({'top':triangleTop+'px'});

		triangleTop = $('.trip-events-add').position().top - 10 + $('.trip-events-add').height();
		triangleLeft = $('.trip-events-add').position().left + 90;
		$('.triangle_2').css({'left':triangleLeft+'px'});
		$('.triangle_2').css({'top':triangleTop+'px'});
	}

	var expandFunc = function(){
		var openBox = false;
		$('.trip-events-detail').click(function() {
			var parentCategory = $(this).closest('.trip-events-category');
			var nextAddEvent = parentCategory.next('.trip-events-add');
			// parentCategory.after("<div class=\"trip-events-add\"><div id=\"triangle_1\"><img src=\"icon/triangle.png\" alt=\"\"></div><div id=\"triangle_2\"><img src=\"icon/triangle_dark.png\" alt=\"></div><form role=\"form\" id=\"new-form\"><div class=\"input-group\" id=\"new-event-form\"><div class=\"wholeLine\"><input type=\"text\" class=\"form-control input\" placeholder=\"Enter title\"></div><div class=\"wholeLine\"><input type=\"text\" class=\"form-control input\" placeholder=\"Add location\"></div><div class=\"row\"><div class=\"col-md-6\"><input type=\"text\" class=\"form-control input\" placeholder=\"Start\"></div><div class=\"col-md-6\"><input type=\"text\" class=\"form-control input\" placeholder=\"End\"></div></div><div class=\"row\"><div class=\"col-md-6\"></div><div class=\"col-md-3\"><button class=\"new-event-save\">Save</button></div><div class=\"col-md-3\"><button class=\"new-event-cancel\">Cancel</button></div></div></div></form></div>")
			// $('.trip-events-add').toggleClass('expandHeight');
			if (!openBox){
				openBox = !openBox;
				$(this).addClass('changeOpacity');
				nextAddEvent.addClass('expandHeight');
			}
			else {
				openBox = !openBox;
				$('.trip-events-detail').each(function() {
					$(this).removeClass('changeOpacity');
				});
				$('.trip-events-add').each(function() {
					$(this).removeClass('expandHeight');
				});
			}
		});
	}


	//Save the data!
// });