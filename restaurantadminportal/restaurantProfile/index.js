// Fetch and display restaurant profile data
function fetchAndDisplayRestaurantProfile() {
  $.ajax({
    url:
      "http://localhost:8080/api/restaurants/user/" +
      localStorage.getItem("userId"),
    type: "GET",
    success: function (response) {
      var restaurantProfile = response[0];
      populateRestaurantProfile(restaurantProfile);
    },
    error: function (xhr, status, error) {
      console.log("Error fetching restaurant profile data:", error);
    },
  });
}

function populateRestaurantProfile(profileData) {
  $("#restaurantId").text(profileData.restaurantId);
  $("#restaurantName").text(profileData.name);
  $("#ownerName").text(profileData.ownerName);
  $("#ownerMobile").text(profileData.phoneNumber);
  $("#ownerEmail").text(profileData.email);
  $("#ownerPassword").text(profileData.password);
  $("#restaurantAddress").text(profileData.address);
  $("#pincode").text(profileData.pincode);
}

fetchAndDisplayRestaurantProfile();
