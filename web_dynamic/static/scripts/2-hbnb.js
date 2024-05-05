$(document).ready(function () {
    const checkedAmenities = {};
    $('input:checkbox').change(function () {
      const id = $(this).data('id');
      const name = $(this).data('name');
      if ($(this).is(':checked')) {
        checkedAmenities[id] = name;
      } else {
        delete checkedAmenities[id];
      }
      const res = Object.values(checkedAmenities);
      if (res.length > 0) {
        $('div.amenities > h4').text(Object.values(checkedAmenities).join(', '));
      } else {
        $('div.amenities > h4').html('&nbsp;');
      }
    });
  
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/status/',
      type: 'GET',
      success: function (data) {
        if (data.status === 'OK') {
          $('header div#api_status').addClass('available');
        } else {
          if ($('header div#api_status').hasClass('available')) {
            $('header div#api_status').removeClass('available');
          }
        }
      }
    });
  });
