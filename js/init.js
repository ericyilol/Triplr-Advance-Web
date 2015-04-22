var WINDOW_HEIGTH = $(window).height();
var WINDOW_WIDTH  = $(window).width();

(function () {
    var version = '1.0';
    var scripts = [
        'js/random-color.js',
        'js/trips-module.js',
        'js/lib/jquery.ui.min.js',
        'js/lib/bootstrap.min.js',
        'js/dashboard.js',
        'js/home-page.js',
        'js/schedule-page.js',
        'js/event-handler.js',
        'slick-1.5.0/slick/slick.js',
        'js/lib/bootstrap-datepicker.js',
        'js/lib/datepair.js',
        'js/jquery.datepair.js'

    ];

    var temp = [];
    for (var i = 0; i < scripts.length; i ++) {
        temp.push('<script src="' + scripts[i] + '?' + version +'"><\/script>');
    }
    document.write(temp.join(''));
})();





function navigation_init() {
    var newTripButtonLeft = WINDOW_WIDTH - 120;
    var newTripButtonTop = WINDOW_HEIGTH - 120;
    $('#new-trip').css({'top':newTripButtonTop +'px'});
    $('#new-trip').css({'left':newTripButtonLeft +'px'});
}


