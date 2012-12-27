/*
Author: highercomve (Sergio Marin)

Licencia MIT

*/

(function( $ , window, document, undefined){

  $.fn.smoothscrolling = function(options) {

    var settings = $.extend( {
      'offsetTop' : 0,
      'speed'     : 800
    }, options);

    var locationPath = filterPath(location.pathname),
        scrollElem = scrollableElement('html', 'body');
        
    function filterPath(string) {
      return string.replace(/^\//, '')
        .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
        .replace(/\/$/, '');
    }

    function scrollableElement(els) {
      for (var i = 0, argLength = arguments.length; i < argLength; i++) {
        var el = arguments[i],
          $scrollElement = $(el);
        if ($scrollElement.scrollTop() > 0) {
          return el;
        } else {
          $scrollElement.scrollTop(1);
          var isScrollable = $scrollElement.scrollTop() > 0;
          $scrollElement.scrollTop(0);
          if (isScrollable) {
            return el;
          }
        }
      }
      return [];
    }

    return this.each(function () {
      var thisPath = filterPath(this.pathname) || locationPath;
      if (locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/, '')) {
        var $target = $(this.hash),
             target = this.hash;
        if (target) {
          var $this = $(this), // this inside each referd to dom element thats why use $(this)
              offsetTop = ($this.data('offsetTop')) ? $this.data('offsetTop'):settings.offsetTop;

          var targetOffset = $target.offset().top - offsetTop;
          $this.on('click', function (event) {
            event.preventDefault();
            $(scrollElem).animate({
              scrollTop: targetOffset
            }, settings.speed);
          });
        }
      }
    });
  };
})( jQuery, window, document);