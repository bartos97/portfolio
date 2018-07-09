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


// FORM VALIDATION
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

      overlay.addClass('hide');
      form.removeClass('was-validated')
    }

  });
})();