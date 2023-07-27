$("#registration-form").submit(function (event) {
  event.preventDefault();

  var email = $("#email").val();
  var password = $("#password").val();
  var name = $("#name").val();
  var address = $("#address").val();
  var phoneNumber = $("#phoneNumber").val();
  var pincode = $("#pincode").val();

  // Create a data object with the form values
  var data = {
    email: email,
    password: password,
    name: name,
    address: address,
    phoneNumber: phoneNumber,
    pincode: pincode,
  };

  // Make an AJAX request to the registration endpoint
  $.ajax({
    url: "http://localhost:8080/api/customers",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function (response) {
      // Handle a successful registration response
      alert("Registration successful!");
      window.location.href = "/login/index.html";
    },
    error: function (xhr, status, error) {
      // Handle a failed registration response
      alert("Registration failed. Please try again.");
    },
  });
});
