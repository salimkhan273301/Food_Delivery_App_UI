const API_BASE_URL = "http://localhost:8080/api";
const PINCODE = localStorage.getItem("pincode");
let foodItems = [];

fetchAllMenuItemsOfPincode(PINCODE);

function displayFoodItems() {
  $("#foodDisplayCounter").empty();

  foodItems.forEach((foodItem) => {
    console.log(foodItem);
    const card = `
        <div class="col-4">
          <div class="card" style="width: 18rem">
            <img
              src="${foodItem.foodImageUrl}"
              class="card-img-top"
              style="height:200px; object-fit:cover;"
              alt="${foodItem.name}"
            />
            <div class="card-body">
              <h5 class="card-title">${foodItem.name}</h5>
              <p class="card-text badge p-0 rounded-pill text-muted">
                ${foodItem.restaurantName}
              </p>
              <p class="card-text">Description: ${foodItem.description}</p>
              <p class="card-text">Price: $${foodItem.price}</p>
              <button class="btn btn-outline-warning w-100  order-now-button"  data-id="${foodItem.id}" >Order Now</button>
            </div>
          </div>
        </div>
        `;

    $("#foodDisplayCounter").append(card);
  });

  $(".order-now-button").on("click", (event) => {
    const itemId = $(event.target).data("id");
    const item = foodItems.find((item) => item.id == itemId);

    console.log(item);
    const order = {
      customer_id: Number(localStorage.getItem("customerId")),
      restaurant_id: Number(item.restaurantId),
      orderDate: new Date(),
      status: "BOOKED",
      totalAmount: item.price,
      items: [
        {
          item_id: Number(item.id),
          quantity: 1,
          price: item.price,
        },
      ],
    };

    $.ajax({
      url: `${API_BASE_URL}/orders/bookOrder`,
      type: "POST",
      contentType: "application/json",

      data: JSON.stringify(order),
      success: function (response) {
        console.log(response);
      },
    });
  });
}

function fetchAllMenuItemsOfPincode(pincode) {
  $.ajax({
    url: `${API_BASE_URL}/menu-items/bypincode/${pincode}`,
    success: function (response) {
      if (response.length === 0) {
        // If the response is empty, display a message to the user
        $("#foodDisplayCounter").append(
          `
          <p class="text-center">No item availble in your Location</p>
        `
        );
        console.log("No menu items found for this pincode.");
      } else {
        foodItems = response; // Store the fetched restaurant data

        displayFoodItems(); // Display the first 4 rows
      }
    },
    error: function (xhr, status, error) {
      console.log("Error fetching restaurant data:", error);
      console.log(xhr.status);
    },
  });
}
