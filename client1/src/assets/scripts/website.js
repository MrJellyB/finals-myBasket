$(document).ready(function () {
  $('body').on('mouseenter mouseleave', '.dropdown', function (e) {
    var _d = $(e.target).closest('.dropdown'); _d.addClass('show');
    setTimeout(function () {
      _d[_d.is(':hover') ? 'addClass' : 'removeClass']('show');
    }, 300);
  });

  /*
* Replace all SVG images with inline SVG
*/
  $('.category-navigation i.icon').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "");;

    $.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }

      $svg.attr('height', $img.css('padding-top'));
      $svg.attr('float', $img.css('float'));

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');

  });
});
