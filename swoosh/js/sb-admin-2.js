(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

    $.getJSON('js/schedule.json').done(function(teamList) {
      var todaysDate = new Date();
      var games = teamList.games;
      var todayConverted = todaysDate.getFullYear() + '-' + (todaysDate.getMonth() + 1) + '-' + todaysDate.getDate();
      var output = "";

        games.forEach(function (game) {
          var schedule = new Date(game.scheduled);
          var scheduleConverted = schedule.getFullYear() + '-' + (schedule.getMonth() + 1) + '-' + schedule.getDate();

          if (todayConverted === scheduleConverted) {
            output += `<button class="btn btn-info btn-lg col-12 " data-toggle="modal" data-target="#myModal" style="margin-bottom: 10px;"><div> ${game.home.name} <div> vs <div> ${game.away.name} </div></button>`
          }

          document.getElementById("games").innerHTML = output;
        });
    });

})(jQuery); // End of use strict
