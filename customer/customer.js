$(document).ready(function () {
  var userId = localStorage.getItem("userId");
  var userEmail = localStorage.getItem("userEmail");
  var pincode = localStorage.getItem("pincode");

  // Display the user name on the page
  function displayUserName(userName) {
    $("#user-name").text(userName);
  }

  // Fetch and display restaurant data
  function fetchAndDisplayRestaurants(pincode) {
    $.ajax({
      url: "http://localhost:8080/api/restaurants/area/" + pincode,
      type: "GET",
      success: function (response) {
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

  // Fetch and display order data
  function fetchAndDisplayOrders(userId) {
    $.ajax({
      url: "http://localhost:8080/api/orders?userId=" + userId,
      type: "GET",
      success: function (response) {
        $.each(response, function (index, order) {
          var row = "<tr>";
          row += "<td>" + order.orderId + "</td>";
          row += "<td>" + order.restaurantName + "</td>";
          row += "<td>" + order.orderDate + "</td>";
          row += "<td>" + order.totalAmount + "</td>";
          // Add more columns for other order data fields
          row += "</tr>";
          $("#order-table tbody").append(row);
        });
      },
      error: function (xhr, status, error) {
        console.log("Error fetching order data:", error);
      },
    });
  }

  // Call the functions
  displayUserName(userEmail);
  fetchAndDisplayRestaurants(pincode);
  fetchAndDisplayUserProfile(userEmail);
  fetchAndDisplayOrders(userId);
});
