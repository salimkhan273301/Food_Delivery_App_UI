$(document).ready(function () {
  var userId = localStorage.getItem("userId");
  var userEmail = localStorage.getItem("userEmail");
  var pincode = localStorage.getItem("pincode");

  // ... Existing functions for displaying user name, restaurant data, and order data

  // Display the user name on the page
  function displayUserName(userName) {
    $("#user-name").text(userName);
  }

  // Fetch and display restaurant data
  // Fetch and display restaurant data
  function fetchAndDisplayRestaurants(pincode) {
    $.ajax({
      url: "http://localhost:8080/api/restaurants/area/" + pincode,
      type: "GET",
      success: function (response) {
        restaurantData = response; // Store the fetched restaurant data
        displayRestaurantRows(0); // Display the first 4 rows
      },
      error: function (xhr, status, error) {
        console.log("Error fetching restaurant data:", error);
      },
    });
  }

  // Fetch and display user profile data
  function fetchAndDisplayUserProfile(userEmail) {
    $.ajax({
      url: "http://localhost:8080/api/customers/email/" + userEmail,
      type: "GET",
      success: function (response) {
        var userProfile = response;
        var row = "<tr>";
        row += "<td>" + userProfile.customerId + "</td>";
        row += "<td>" + userProfile.name + "</td>";
        row += "<td>" + userProfile.address + "</td>";
        row += "<td>" + userProfile.phoneNumber + "</td>";
        row += "<td>" + userProfile.pincode + "</td>";
        row += "<td>" + userProfile.email + "</td>";
        row += "<td>" + userProfile.password + "</td>";
        row += "</tr>";
        $("#profile-table tbody").append(row);
      },
      error: function (xhr, status, error) {
        console.log("Error fetching user profile data:", error);
      },
    });
  }

  // Define restaurantIndex and orderIndex variables here
  var restaurantIndex = 0;
  var orderIndex = 0;
  // Helper function to display restaurant rows based on pagination
  f;

  // Fetch and display order data
  function fetchAndDisplayOrders(userId) {
    $.ajax({
      url: "http://localhost:8080/api/orders?userId=" + userId,
      type: "GET",
      success: function (response) {
        orderData = response; // Store the fetched order data
        displayOrderRows(0); // Display the first 4 rows
      },
      error: function (xhr, status, error) {
        console.log("Error fetching order data:", error);
      },
    });
  }

  // Pagination event listeners for restaurant data
  $("#restaurant-prev-btn").on("click", function () {
    restaurantIndex = Math.max(0, restaurantIndex - 5);
    displayRestaurantRows(restaurantIndex);
  });

  $("#restaurant-next-btn").on("click", function () {
    restaurantIndex = Math.min(restaurantIndex + 5, restaurantData.length - 1);
    displayRestaurantRows(restaurantIndex);
  });
  // Pagination event listeners for order data
  $("#order-prev-btn").on("click", function () {
    orderIndex = Math.max(0, orderIndex - 4);
    displayOrderRows();
  });

  $("#order-next-btn").on("click", function () {
    orderIndex = Math.min(orderIndex + 4, orderData.length - 1);
    displayOrderRows();
  });

  // Helper function to display order rows based on pagination
  function displayOrderRows() {
    var tableBody = $("#order-table tbody");
    tableBody.empty();

    var startIndex = orderIndex;
    var endIndex = startIndex + 4;

    for (var i = startIndex; i < endIndex && i < orderData.length; i++) {
      var order = orderData[i];
      var row = "<tr>";
      row += "<td>" + order.orderId + "</td>";
      row += "<td>" + order.restaurantName + "</td>";
      row += "<td>" + order.orderDate + "</td>";
      row += "<td>" + order.totalAmount + "</td>";
      // Add more columns for other order data fields
      row += "</tr>";
      tableBody.append(row);
    }
  }

  // Call the functions
  displayUserName(userEmail);
  fetchAndDisplayRestaurants(pincode);
  fetchAndDisplayUserProfile(userEmail);
  fetchAndDisplayOrders(userId);
});
