/*
Plugin Name: smoothscrolling
Author: highercomve (Sergio Marin)
license: MIT
*/

// Load imageLoad Plugin
(function(c,q){var m="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function n(){var b=c(j),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function p(b){k(b.target,"error"===b.type)}function k(b,a){b.src===m||-1!==c.inArray(b,l)||(l.push(b),a?h.push(b):j.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),r&&d.notifyWith(c(b),[a,e,c(j),c(h)]),e.length===l.length&&(setTimeout(n),e.unbind(".imagesLoaded",
p)))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():0,r=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),l=[],j=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",p).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)k(a,e.isBroken);else if(a.complete&&a.naturalWidth!==q)k(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=m,a.src=d}):
n();return d?d.promise(g):g}})(jQuery);

(function( $ , window, document, undefined){

  $.fn.smoothscrolling = function(options) {
    // Default settings
    var settings = $.extend( {
      'offsetTop' : 0,
      'speed'     : 800,
      'container' : false,
      'callback'  : function(element){}
    }, options);
    
    // Default varibles of plugin
    var locationPath = filterPath(location.pathname),
        scrollElem = (settings.container) ? settings.container:scrollableElement('html', 'body') ,
        windowsHeight = $(window).height(),
        allElements = this;
    
    function filterPath(string) {
      return string.replace(/^\//, '')
        .replace(/(index|default).[a-zA-Z]{3,4}$/, '')
        .replace(/\/$/, '');
    }
    // Function to select the element who has scroll
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
      // Filter the url path on anchor href
      var thisPath = filterPath(this.pathname) || locationPath,
          $elementOnFullHeight = $(".full-height"),
          $this = $(this); // this inside each referd to dom element thats why use $(this)

      if (locationPath == thisPath && (location.hostname == this.hostname || !this.hostname) && this.hash.replace(/#/, '')) {
        var $target = $(this.hash),
             target = this.hash;
        // If exist the target anchor on site.
        if (target) {
            var offsetTop = ($this.data('offsetTop')) ? $this.data('offsetTop'):settings.offsetTop ,
                targetOffset;

          // Wait until image are loaded
          $(scrollElem).imagesLoaded(function() {
            // Set every class="full-height" to windows height
            if($elementOnFullHeight.length !== 0) {
              if($elementOnFullHeight.height() < windowsHeight) {
                $(".full-height").height(windowsHeight);
              }
            }
            // Element to scroll
            targetOffset = $target.offset().top - offsetTop;
            // Set event click on this element
            $this.on('click', function (event) {
              // Prevent the default behavior of a element
              event.preventDefault();
              allElements.removeClass("active")
              $this.addClass("active");
              // Animate scroll to target
              $(scrollElem).animate({
                scrollTop: targetOffset
              }, settings.speed,function(){
                settings.callback($this);
              });
            });
          });
        }
      }
    });
  };
})( jQuery, window, document);
