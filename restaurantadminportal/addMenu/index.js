const BASE_URL = "http://localhost:8080/api";
const itemId = getItemIdFromUrl();

if (itemId) {
  fetchItemToEditAndPopulateInform(itemId);
}

$("#menu-item-form").submit(function (e) {
  e.preventDefault();

  if (itemId) {
    updateMenuItem();
  } else {
    registerMenuItem();
  }
});

function registerMenuItem() {
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

  // Send the menu item data to the server (replace tcohe URL with your API endpoint)
  $.ajax({
    url: `${BASE_URL}/menu-items`,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(menuItem),
    success: function (response) {
      //alert("Menu item registered successfully");
      // Clear the form
      $("#menu-item-form")[0].reset();
      $(".error").text("");
      // Redirect to the menu_list.html page after successful registration
      window.location.href = "/restaurantadminportal/";
    },
    error: function (xhr, status, error) {
      console.log("Error registering menu item:", error);
    },
  });
}

function getItemIdFromUrl() {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const itemId = url.searchParams.get("itemId");
  return itemId;
}

function fetchItemToEditAndPopulateInform(itemId) {
  $.ajax({
    url: `${BASE_URL}/menu-items/${itemId}`,
    type: "GET",
    contentType: "application/json",

    success: function (response) {
      console.log(response);
      populateForm(response);
    },
    error: function (xhr, status, e) {
      if (xhr.status === 404) {
        console.error("Item not found.");
      } else {
        console.error("Error fetching item:", xhr.status, e);
      }
    },
  });
}

function populateForm(data) {
  const form = $("#menu-item-form");
  const nameInput = form.find("#name");
  const descriptionInput = form.find("#description");
  const priceInput = form.find("#price");
  const foodImageUrlInput = form.find("#foodImageUrl");
  const heading = $("h3");
  const btn = form.find("button");

  heading.html("Menu Item Edit");
  btn.html("Edit");
  btn.removeClass("btn-primary").addClass("btn-warning").css("color", "white");

  nameInput.val(data.name);
  descriptionInput.val(data.description);
  priceInput.val(data.price);
  foodImageUrlInput.val(data.food_image_url);
}

function updateMenuItem() {
  const updatedMenuItem = {
    name: $("#name").val(),
    description: $("#description").val(),
    price: parseFloat($("#price").val()),
    food_image_url: $("#foodImageUrl").val() || "./assets/chickenWings.jpg",
  };

  $.ajax({
    url: `${BASE_URL}/menu-items/updatemenu/${itemId}`,
    type: "PUT",
    data: JSON.stringify(updatedMenuItem),
    contentType: "application/json",
    success: function (data) {
      console.log("Item updated successfully:", data);

      window.location.href = "/restaurantadminportal/menuinfo/";
    },
    error: function (xhr, status, error) {
      console.error("Error updating item:", error);
    },
  });
}
