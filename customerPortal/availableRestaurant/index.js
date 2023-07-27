const API_BASE_URL = "http://localhost:8080/api/restaurants";
let restaurants = [];
const PINCODE = localStorage.getItem("pincode");
var restaurantIndex = 0;
var restaurantPerPage = 4;

fetchAndDisplayRestaurants(PINCODE);

$("#restaurant-prev-btn").on("click", function () {
  restaurantIndex = Math.max(0, restaurantIndex - restaurantPerPage);
  displayRestaurantRows(restaurantIndex);
});

$("#restaurant-next-btn").on("click", function () {
  restaurantIndex = Math.min(
    restaurantIndex + restaurantPerPage,
    restaurants.length - 1
  );
  displayRestaurantRows(restaurantIndex);
});

function fetchAndDisplayRestaurants(pincode) {
  $.ajax({
    url: `${API_BASE_URL}/area/${pincode}`,
    type: "GET",
    success: function (response) {
      restaurants = response; // Store the fetched restaurant data
      displayRestaurantRows(0); // Display the first 4 rows
    },
    error: function (xhr, status, error) {
      console.log("Error fetching restaurant data:", error);
    },
  });
}

function displayRestaurantRows(startIndex) {
  var tableBody = $("#restaurant-table tbody");
  tableBody.empty();

  var endIndex = startIndex + restaurantPerPage;

  for (var i = startIndex; i < endIndex && i < restaurants.length; i++) {
    var restaurant = restaurants[i];
    var row = "<tr>";
    row += "<td>" + restaurant.restaurantId + "</td>";
    row += "<td>" + restaurant.name + "</td>";
    row += "<td>" + restaurant.address + "</td>";
    row += "<td>" + restaurant.phoneNumber + "</td>";
    row += "<td>" + restaurant.pincode + "</td>";
    row += "</tr>";
    tableBody.append(row);
  }
}
