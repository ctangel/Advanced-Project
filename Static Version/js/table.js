$(function() {
  // Hides popup element
  $('.popup').hide();

  // Adds refineries names to list element
  var populateTable = function(refineries) {
    for (var i = 0; i < refineries.length; i++) {
      $('.list').append("<li>" + refineries[i].Company + "</li>");
    }
  }

  // Applies click event handler that 2 things:
  //  1. Populates popup with relevent data of the refinery clicked on and shows
  //      the pop up
  //  2. Toggles the popup off or on if the popup already has the relevant data
  //      of the refinery clicked on
  var applyPopup = function(refineries) {
    // Any element with the class view has its refinery data in the popup
    // element
    $('.list li').on('click', function() {
      const $this = $(this);
      if ($this.hasClass('view')) {
          $('.popup').toggle();
      } else {
        $('.view').removeClass('view');
        $this.addClass('view');
        const index = $('.list li').index($this);
        $('.company').text(refineries[index].Company);
        $('.category').text(refineries[index].Category);
        $('.address').text(refineries[index].Address);
        $('.company').text(refineries[index].Company);
        $('.popup').show();
      }
    });
  }

  // AJAX call to get refinery data. On success, if populates page and applies
  // event handler for the popup
  var refineries = JSON.parse(data);
  refineries = refineries.refineries;
  populateTable(refineries);
  applyPopup(refineries);
});
