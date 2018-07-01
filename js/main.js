// STICKY NAVBAR
(function() {
  var navbar = $('.navbar.sticky');
  var navbarOffset = navbar.offset().top;

  resizeFunction();
  $(window).resize(resizeFunction);

  function stickyFunction() {
    if (window.pageYOffset > navbarOffset) {
      navbar.addClass('sticked');
    }
    else {
      navbar.removeClass('sticked');
    }
  }

  function resizeFunction() {
    if ( window.matchMedia('(min-width: 576px)').matches ) {
      $(window).on('scroll', stickyFunction); 
    }
    else {
      navbar.addClass('sticked');
    }
  }
  
})();