var WINDOW_HEIGTH = $(window).height();
var WINDOW_WIDTH  = $(window).width();

(function () {
    var version = '1.0';
    var scripts = [
        'js/lib/jquery.timepicker.min.js',
        'js/lib/bootstrap-datepicker.js',
        'js/lib/datepair.js',
        'js/lib/jquery.datepair.js',
        'js/random-color.js',
        'js/trips-module.js',
        'js/lib/bootstrap.min.js',
        'js/dashboard.js',
        'js/home-page.js',
        'js/schedule-page.js',
        'lib/slick-1.5.0/slick/slick.js',
        // 'lib/css-toggle/bower_components/prism/prism.js'
    ];

    var temp = [];
    for (var i = 0; i < scripts.length; i ++) {
        temp.push('<script src="' + scripts[i] + '?' + version +'"><\/script>');
    }
    document.write(temp.join(''));
})();