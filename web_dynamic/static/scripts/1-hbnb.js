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
  });
