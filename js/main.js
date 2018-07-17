// STICKY NAVBAR
(function() {

  var navbar = $('.navbar.sticky');
  // var navbarOffset = navbar.offset().top;
  var navbarOffset = $(window).outerHeight()/4;  

  function stickyFunction() {
    if (window.pageYOffset > navbarOffset) {
      navbar.addClass('sticked');
    }
    else {
      navbar.removeClass('sticked');
    }
  }

  $(window).on('scroll', stickyFunction); 

})();


// PARALLAX BANNER
(function() {

  var nr = Math.floor(Math.random() * 11 + 1);  
  $('.main-banner').parallax({
    imageSrc: 'img/banner_bg' + nr + '.jpg'
  });

})();


// FORM VALIDATION AND AJAX
(function() {

  $('form.form-validate').on('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.checkValidity() === false) {
      $(this).addClass('was-validated');
    }
    else {
      var form = $(this);
      var overlay = form.find('.overlay');
      var formData = form.serialize();
      var formUrl = form.attr('action');
      var alertSuccess = form.find('.alert-success');
      var alertError = form.find('.alert-danger');
      overlay.removeClass('hide');
      
      $.ajax({
        type: 'POST',
        url: formUrl,
        data: formData
      })
      .done(function(response) {
        alertError.addClass('hide');
        alertError.attr('aria-hidden', true);
        alertSuccess.removeClass('hide');
        alertSuccess.attr('aria-hidden', false);
        // alertSuccess.find('.alert-text').text(response);
        form.find('.form-control').each(function() {
          this.value = '';
        })
      })
      .fail(function(data) {
        alertSuccess.addClass('hide');
        alertSuccess.attr('aria-hidden', true);
        alertError.removeClass('hide');
        alertError.attr('aria-hidden', false);
        if (data.responseText !== '')
          alertError.find('.alert-text').text(data.responseText);
      });

      window.setTimeout(function(){
        overlay.addClass('hide');
        form.removeClass('was-validated');
      }, 1000);
    }

  });

})();


// ONE PAGE NAV SETUP
(function() {

  var navCollapse = $('#collapse-main-nav');
  var nav = navCollapse.find('.navbar-nav');

  $('#main-nav').onePageNav({
    currentClass: 'active',
    changeHash: true,
    begin: function() {
      navCollapse.collapse('hide');
    },
    scrollChange: function(currentList) {
      nav.find('.nav-link[aria-describedby]').removeAttr('aria-describedby');
      currentList.find('a').attr('aria-describedby', 'current-page')      
    }
  });

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

  sr.reveal('.enter-left-delay', {
    origin: 'left',
    distance: '50vw'
  }, 100);

  sr.reveal('.enter-right', {
    origin: 'right',
    distance: '50vw'
  });

  sr.reveal('.enter-right-delay', {
    origin: 'right',
    distance: '50vw'
  }, 100);

  sr.reveal('.enter-bottom', {
    origin: 'bottom',
    distance: '50vh'
  });

  sr.reveal('.enter-bottom-close', {
    origin: 'bottom',
    distance: '100%'
  });

  sr.reveal('.enter-bottom-delay', {
    origin: 'bottom',
    distance: '50vh'
  }, 100);

  sr.reveal('.enter-bottom-big-delay', {
    origin: 'bottom',
    distance: '50px',
    duration: 2000,
    easing: 'cubic-bezier(.06,.8,.88,.97)'
  },1000);

})();