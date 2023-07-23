$(document).ready(function () {
  $("#registration-form").submit(function (event) {
    event.preventDefault();

    var name = $("#name").val();
    var address = $("#address").val();
    var pincode = $("#pincode").val();
    var ownerName = $("#ownerName").val();
    var email = $("#email").val();
    var phoneNumber = $("#phoneNumber").val();
    var password = $("#password").val();

    // Create a data object with the form values
    var data = {
      name: name,
      address: address,
      pincode: pincode,
      ownerName: ownerName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };

    // Make an AJAX request to the registration endpoint
    $.ajax({
      url: "http://localhost:8080/api/restaurants",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        // Handle a successful registration response
        alert("Registration successful!");
        window.location.href = "/home/index.html";
      },
      error: function (xhr, status, error) {
        // Handle a failed registration response
        alert("Registration failed. Please try again.");
      },
    });

    // Make an AJAX request to fetch user profile data
    $.ajax({
      url: "http://localhost:8080/api/customers/email/" + userEmail,
      type: "GET",
      success: function (response) {
        var userProfile = response; // Assuming the response contains the user profile data directly
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
  });

  // Make an AJAX request to fetch user profile data
  $.ajax({
    url:
      "http://localhost:8080/api/restaurants/user/" +
      localStorage.getItem("userId"),
    type: "GET",
    success: function (response) {
      var userProfile = response[0]; // Assuming the response is an array with one user profile object

      // Create a row for the table
      var row = "<tr>";
      row += "<td>" + userProfile.restaurantId + "</td>";
      row += "<td>" + userProfile.pincode + "</td>"; // Assuming user ID is nested inside the 'user' property
      row += "<td>" + userProfile.user.email + "</td>"; // Assuming email is nested inside the 'user' property
      row += "<td>" + userProfile.name + "</td>";
      row += "<td>" + userProfile.phoneNumber + "</td>";
      row += "<td>" + userProfile.address + "</td>";
      row += "<td>" + userProfile.password + "</td>";
      row += "</tr>";

      // Append the row to the table body
      $("#profile-table tbody").append(row);
    },
    error: function (xhr, status, error) {
      console.log("Error fetching user profile data:", error);
    },
  });
});
