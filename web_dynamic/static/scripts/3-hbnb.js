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
  
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: '{}',
      contentType: 'application/json; charset=utf-8',
      type: 'POST',
      success: function (data) {
        $.each(data, function (i, obj) {
          $('section.places').append('<article><div class="headline"><h2>' +
          obj.name + '</h2><div class="price_by_night">' +
          obj.price_by_night + '$</div></div>' + '<div class="information">' +
          '<div class="max_guest">' + '<div  class="guest_icon"></div>' + '<p>' +
          obj.max_guest + '</p></div><div class="number_rooms">' + '<div class="bed_icon"></div><p>' +
          obj.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_icon"></div><p>' +
          obj.number_bathrooms + '</p></div></div><div class="description"><p>' +
          obj.description + '| safe' + '</p></div></article>');
        });
      }
    });
  });
