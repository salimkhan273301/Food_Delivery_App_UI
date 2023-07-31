fetchRestaurants();

function fetchRestaurants() {
  const success = function (response) {
    populateTabel(response);
  };
  const error = function (xhr, status, error) {
    console.log("Error fetching restaurant data:", error);
  };

  ajaxService("/restaurants", "GET", undefined, success, error);
}

function populateTabel(response) {
  $.each(response, function (index, restaurant) {
    var row = "<tr>";
    row += "<td>" + restaurant.restaurantId + "</td>";
    row += "<td>" + restaurant.name + "</td>";
    row += "<td>" + restaurant.address + "</td>";
    row += "<td>" + restaurant.phoneNumber + "</td>";
    row += "<td>" + restaurant.pincode + "</td>";
    row += "</tr>";
    $("#restaurant-table tbody").append(row);
  });
}
