// Fetch and display user profile data
function fetchAndDisplayUserProfile(userEmail) {
  $.ajax({
    url: "http://localhost:8080/api/customers/email/" + userEmail,
    type: "GET",
    success: function (response) {
      var userProfile = response;
      populateProfile(userProfile);
    },
    error: function (xhr, status, error) {
      console.log("Error fetching user profile data:", error);
    },
  });
}

function populateProfile(profileData) {
  $("#customerId").text(profileData.customerId);
  $("#name").text(profileData.name);
  $("#address").text(profileData.address);
  $("#phoneNumber").text(profileData.phoneNumber);
  $("#pincode").text(profileData.pincode);
  $("#email").text(profileData.email);
  $("#password").text(profileData.password);
}

fetchAndDisplayUserProfile(localStorage.getItem("userEmail"));
