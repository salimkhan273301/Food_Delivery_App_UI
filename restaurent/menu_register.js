// Function to register a menu item
function registerMenuItem() {
  // Retrieve form data
  var name = $("#name").val();
  var description = $("#description").val();
  var price = $("#price").val();
  var food_image_url = $("#foodImageUrl").val() || "./assets/chickenWings.jpg";
  var restaurant = localStorage.getItem("restaurantId"); // Retrieve restaurant ID from localStorage

  // Perform form validation
  if (
    name === "" ||
    description === "" ||
    price === "" ||
    restaurant === null
  ) {
    $(".error").text("Please fill in all fields");
    return;
  }

  // Create the menu item object
  var menuItem = {
    name: name,
    description: description,
    price: parseFloat(price),
    restaurant: restaurant,
    food_image_url,
  };

  // Send the menu item data to the server (replace the URL with your API endpoint)
  $.ajax({
    url: "http://localhost:8080/api/menu-items",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(menuItem),
    success: function (response) {
      //alert("Menu item registered successfully");
      // Clear the form
      $("#menu-item-form")[0].reset();
      $(".error").text("");
      // Redirect to the menu_list.html page after successful registration
      window.location.href = "/restaurent/restaurant_owner.html";
    },
    error: function (xhr, status, error) {
      console.log("Error registering menu item:", error);
    },
  });
}

// Function to fetch and display the menu list
function fetchAndDisplayMenuList() {
  // Retrieve the restaurant ID from localStorage
  var restaurantId = localStorage.getItem("restaurantId");

  // Check if the restaurant ID exists
  if (restaurantId) {
    // Make an AJAX request to fetch the menu list
    $.ajax({
      url: "http://localhost:8080/api/menu-items/myrestaurent/" + restaurantId,
      type: "GET",
      success: function (response) {
        // Handle the successful response and populate the menu list
        var menuList = response;
        console.log("Menu list:", menuList);

        // Get the table body element
        var tableBody = $("#menu-table tbody");

        // Clear any existing rows
        tableBody.empty();

        // Loop through the menu items and generate table rows
        $.each(menuList, function (index, menuItem) {
          var row = "<tr>";
          row += "<td>" + menuItem.name + "</td>";
          row += "<td>" + menuItem.description + "</td>";
          row += "<td>" + menuItem.price + "</td>";
          row += "</tr>";
          tableBody.append(row);
        });
      },
      error: function (xhr, status, error) {
        console.log("Error fetching menu list:", error);
      },
    });
  } else {
    console.log("Restaurant ID not found in localStorage");
  }
}

$(document).ready(function () {
  $("#menu-item-form").submit(function (e) {
    e.preventDefault();
    registerMenuItem();
  });

  // Call fetchAndDisplayMenuList() after menu registration is completed
  $("#menu-item-form").on("submit", function () {
    fetchAndDisplayMenuList();
  });

  // Initial call to fetchAndDisplayMenuList() on page load
  fetchAndDisplayMenuList();
});
