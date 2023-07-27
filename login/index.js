$(document).ready(function () {
  $("#login-form").submit(function (event) {
    event.preventDefault();

    var email = $("#email").val();
    var password = $("#password").val();

    // Make an AJAX request to the login endpoint
    $.ajax({
      url: "http://localhost:8080/api/login",
      type: "POST",
      data: {
        email: email,
        password: password,
      },
      success: function (response) {
        // Handle a successful login response
        if (response.responseCode === "success") {
          var userType = response.userType;
          var usermail = response.user.email;
          var userId = response.user.userId;
          // Assuming user ID is returned in the response
          console.log(userId);

          // Save the user ID and user type to local storage
          localStorage.setItem("userId", userId);
          localStorage.setItem("userType", userType);
          localStorage.setItem("userEmail", usermail);

          if (userType === "CUSTOMER") {
            // Make an AJAX request to fetch customer data
            $.ajax({
              url: "http://localhost:8080/api/customers/user/" + userId,
              type: "GET",
              success: function (response) {
                const customerdata = response[0];
                // Store the customer ID and other relevant data in local storage
                localStorage.setItem("customerId", customerdata.customerId);
                localStorage.setItem("pincode", customerdata.pincode);
                // ...

                // Redirect to customer page
                window.location.href = "/customerPortal";
              },
              error: function (xhr, status, error) {
                // Handle error
              },
            });
          } else if (userType === "ADMIN") {
            // Make an AJAX request to fetch admin data
            $.ajax({
              url: "http://localhost:8080/api/admins/" + userId,
              type: "GET",
              success: function (adminData) {
                // Store the admin ID and other relevant data in local storage
                localStorage.setItem("adminId", adminData.adminId);
                // ...

                // Redirect to admin page
                window.location.href = "/admin/admin.html";
              },
              error: function (xhr, status, error) {
                // Handle error
              },
            });
          } else if (userType === "RESTAURANT_OWNER") {
            // Make an AJAX request to fetch restaurant owner data
            $.ajax({
              url: "http://localhost:8080/api/restaurants/user/" + userId,
              type: "GET",
              success: function (response) {
                if (response.length > 0) {
                  var restaurantOwnerData = response[0];
                  localStorage.setItem(
                    "restaurantId",
                    restaurantOwnerData.restaurantId
                  );

                  // Redirect to customer page
                  window.location.href = "/restaurantadminportal/";
                } else {
                  console.log("No restaurant found for the user");
                  // Handle no restaurant found for the user
                }
              },
              error: function (xhr, status, error) {
                console.log("Error retrieving restaurant data:", error);
                // Handle the error
              },
            });
          }
        } else {
          // Handle login failure
          $("#message").text("Invalid credentials").css("color", "red");
        }
      },
      error: function (xhr, status, error) {
        // Handle a failed login response
        $("#message").text("Login failed").css("color", "red");
      },
    });
  });
});
