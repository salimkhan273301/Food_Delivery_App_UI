$(document).ready(function () {
  // Retrieve the user name from the local storage
  var userName = localStorage.getItem("userEmail");

  // Display the user name on the page
  $("#user-name").text(userName);

  // Make an AJAX request to fetch restaurant data
  $.ajax({
    url: "http://localhost:8080/api/restaurants",
    type: "GET",
    success: function (response) {
      // Loop through the response data and generate table rows
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

  // Retrieve the user ID from local storage
  var userId = localStorage.getItem("userId");
  var userEmail = localStorage.getItem("userEmail");
  console.log(userId);
  console.log(userEmail);

  // Make an AJAX request to fetch user profile data
  $.ajax({
    url: "http://localhost:8080/api/admins/email/" + userEmail,
    type: "GET",
    success: function (response) {
      var admin = response; // Assuming the response contains the admin data directly

      // Create the table row with admin data
      var row = "<tr>";
      row += "<td>" + admin.adminId + "</td>";
      row += "<td>" + admin.user.userId + "</td>";
      row += "<td>" + admin.user.email + "</td>";
      row += "<td>" + admin.name + "</td>";
      row += "<td>" + admin.mobileNumber + "</td>";
      row += "<td>" + admin.address + "</td>";
      row += "<td>" + admin.user.password + "</td>";
      row += "</tr>";

      // Append the row to the table body
      $("#profile-table tbody").append(row);
    },
    error: function (xhr, status, error) {
      console.log("Error fetching user profile data:", error);
    },
  });

  // Make an AJAX request to fetch all customers

  $.ajax({
    url: "http://localhost:8080/api/customers/all",
    type: "GET",
    success: function (response) {
      // Loop through the response data and generate table rows
      $.each(response, function (index, customer) {
        var row = "<tr>";
        row += "<td>" + customer.customerId + "</td>";
        row += "<td>" + customer.name + "</td>";
        row += "<td>" + customer.email + "</td>";
        row += "<td>" + customer.phoneNumber + "</td>";
        row += "<td>" + customer.address + "</td>";
        row += "<td>" + customer.pincode + "</td>";
        row += "<td>" + customer.password + "</td>";
        row += "<td>";
        row +=
          "<div class='btn-group' role='group' aria-label='Customer Actions'>";
        row +=
          "<button class='btn btn-primary btn-sm view-customer-btn' data-customer-id='" +
          customer.customerId +
          "'><i class='fas fa-eye'></i> View</button>";
        row +=
          "<button class='btn btn-danger btn-sm delete-customer-btn' data-customer-id='" +
          customer.customerId +
          "'><i class='fas fa-trash-alt'></i> Delete</button>";
        row += "</div>";
        row += "</td>";
        row += "</tr>";
        $("#customers-table tbody").append(row);
      });
    },
    error: function (xhr, status, error) {
      console.log("Error fetching customer data:", error);
    },
  });

  // Make an AJAX request to fetch order data
  $.ajax({
    url: "http://localhost:8080/api/orders?userId=" + userId,
    type: "GET",
    success: function (response) {
      // Loop through the response data and generate table rows
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

  // Delete customer
  $(document).on("click", ".delete-customer-btn", function () {
    var customerId = $(this).data("customer-id");

    $.ajax({
      url: "http://localhost:8080/api/customers/" + customerId,
      type: "DELETE",
      success: function (response) {
        console.log("Customer deleted successfully");
        // You can update the UI or perform other actions here
      },
      error: function (xhr, status, error) {
        console.log("Error deleting customer:", error);
        // You can display an error message or perform other actions here
      },
    });
  });

  // View customer
  $(document).on("click", ".view-customer-btn", function () {
    var customerId = $(this).data("customer-id");

    $.ajax({
      url: "http://localhost:8080/api/customers/" + customerId,
      type: "GET",
      success: function (response) {
        console.log("Customer data:", response);
        // You can display the customer data or perform other actions here
      },
      error: function (xhr, status, error) {
        console.log("Error fetching customer data:", error);
        // You can display an error message or perform other actions here
      },
    });
  });

  // Handle navbar link clicks
  $(".nav-link").click(function () {
    // Remove the 'active' class from all navbar links
    $(".nav-link").removeClass("active");

    // Hide all sections
    $(".table-responsive").hide();

    // Get the target section from the data-target attribute
    var target = $(this).attr("data-target");

    // Show the target section
    $("#" + target).show();

    // Add the 'active' class to the clicked navbar link
    $(this).addClass("active");
  });
});
