// STICKY NAVBAR
(function() {
  var navbar = $('.navbar.sticky');
  // var navbarOffset = navbar.offset().top;
  var navbarOffset = $(window).outerHeight()/4;  

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


// SCROLL REVEAL SETUP
(function() {
  window.sr = ScrollReveal({
    mobile: false,
    delay: 500,
    duration: 1000
  });

  sr.reveal('.enter-left', {
    origin: 'left',
    distance: '50vw'
  });

  sr.reveal('.enter-right', {
    origin: 'right',
    distance: '50vw'
  });
})();