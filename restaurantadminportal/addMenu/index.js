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

function isMenuItemNotValid(menuItem) {
  return (
    menuItem.name === "" ||
    menuItem.description === "" ||
    menuItem.price === "" ||
    menuItem.restaurant === null
  );
}

function registerMenuItem() {
  const menuItem = getMenuItemFromForm();

  if (isMenuItemNotValid(menuItem)) {
    $(".error").text("Please fill in all fields");
    return;
  }

  const onSuccess = (response) => {
    $("#menu-item-form").reset();
    $(".error").text("");
    window.location.href = "/restaurantadminportal/";
  };

  ajaxService("/menu-items", "POST", menuItem, onSuccess);
}

function getItemIdFromUrl() {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const itemId = url.searchParams.get("itemId");
  return itemId;
}

function getMenuItemFromForm() {
  return {
    name: $("#name").val(),
    description: $("#description").val(),
    price: parseFloat($("#price").val()),
    food_image_url: $("#foodImageUrl").val() || "./assets/chickenWings.jpg",
    restaurant: localStorage.getItem("restaurantId"),
  };
}

function fetchItemToEditAndPopulateInform(itemId) {
  const onSuccess = (response) => {
    console.log(response);
    populateForm(response);
  };

  ajaxService(`/menu-items/${itemId}`, "GET", undefined, onSuccess);
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
  const updatedMenuItem = getMenuItemFromForm();

  const onSuccess = (response) => {
    console.log("Item updated successfully:", response);
    window.location.href = "/restaurantadminportal/menuinfo/";
  };

  ajaxService(
    `/menu-items/updatemenu/${itemId}`,
    "PUT",
    updatedMenuItem,
    onSuccess
  );
}
