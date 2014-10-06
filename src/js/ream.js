  Number.prototype.between = function(a, b, inclusive) {
      var min = Math.min.apply(Math, [a, b]),
          max = Math.max.apply(Math, [a, b]);
      return inclusive ? this >= min && this <= max : this > min && this < max;
  };

  $('.slide:not(:last)').addClass('shadow');

  var shadowWidth = $('.slide').css('box-shadow').split(" ");

  $('.slide:not(:first)').each(function(i, item) {
      $(this).css({
          position: 'fixed',
          'z-index': 9 - i
      });
  })
   $('.slide:first').css({
      left: -9,
      top: -9,
      'z-index': 10
  });

  var current = $('.slide:first');
  var refTop = {
      top: 0
  };
  refTop.bottom = current.height();

  var onScroll = function (w) {
      console.log(w.scrollTop() + ' ' + refTop.top + ' ' + refTop.bottom);
      if (w.scrollTop().between(refTop.top, refTop.bottom, true) || w.scrollTop() < 0) {} else {
          if (w.scrollTop() > refTop.bottom) {
              var next = current.next('.slide');
              refTop.top = refTop.bottom;
              refTop.bottom = refTop.bottom + next.height();
              next.css({
                  position: 'relative',
                  left: -9,
                  top: -9
              });
              current = next;
          } else {
              var prev = current.prev('.slide');
              refTop.bottom = refTop.top;
              refTop.top = refTop.top - prev.height();
              current.css({
                  position: 'fixed',
                  left: 0,
                  top: 0
              });
              current = prev;
          }
      }
  }

  var onResize = function (w) {
    $('.slide').css({
      width: w.width(),
      height: w.height()
    });
    $('.container').css({
        height: $('.slide').height() * $('.slide').size()
    });
  }

  $(window).on({
      scroll: function (e) {
        onScroll($(this));
      },
      touchmove: function (e) {
        onScroll($(this));
      },
      resize: function (e) {
        onResize($(this));
      }
  });

   ////////////////////////////////////////////////////////


   // var scroll = window.requestAnimationFrame ||
   //     window.webkitRequestAnimationFrame ||
   //     window.mozRequestAnimationFrame ||
   //     window.msRequestAnimationFrame ||
   //     window.oRequestAnimationFrame ||
   // // IE Fallback, you can even fallback to onscroll
   //     function(callback) {
   //         window.setTimeout(callback, 1000 / 60)
   //     };

   // var scrollLoop = function() {
   //     if ($(window).scrollTop().between(refTop.top, refTop.bottom, true) || $(window).scrollTop() < 0) {} else {
   //         if ($(window).scrollTop() > refTop.bottom) {
   //             var next = current.next('.slide');
   //             refTop.top = refTop.bottom;
   //             refTop.bottom = refTop.bottom + next.height();
   //             next.css({
   //                 position: 'relative'
   //             });
   //             current = next;
   //         } else {
   //             var prev = current.prev('.slide');
   //             refTop.bottom = refTop.top;
   //             refTop.top = refTop.top - prev.height();
   //             current.css({
   //                 position: 'fixed'
   //             });
   //             current = prev;
   //         }
   //     }
   //     scroll(scrollLoop);
   // };