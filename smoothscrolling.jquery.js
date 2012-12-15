(function( $ ){

  $.fn.smoothscrolling = function( options) {

    var settings = $.extend( {
      'offsetTop'         : '0'
    }, options);

    var locationPath = filterPath(location.pathname);
    var scrollElem = scrollableElement('html', 'body');
        
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
        var targetOffset = $target.offset().top - settings.offsetTop;
        $(this).on('click', function (event) {
          event.preventDefault();
          $(scrollElem).animate({
            scrollTop: targetOffset
          }, 800);
        });
      }
     }
   });
  };
})( jQuery );