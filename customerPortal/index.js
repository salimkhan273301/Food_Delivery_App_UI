const PINCODE = localStorage.getItem("pincode");
let foodItems = [];

fetchAllMenuItemsOfPincode(PINCODE);

function fetchAllMenuItemsOfPincode(pincode) {
  const OnSuccess = (response) => {
    if (response.length === 0) {
      $("#foodDisplayCounter").append(
        '<p class="text-center">No item availble in your Location</p>'
      );
      console.log("No menu items found for this pincode.");
    } else {
      foodItems = response; // Store the fetched restaurant data
      displayFoodItems(); // Display the first 4 rows
    }
  };

  const OnError = (xhr, status, error) => {
    console.log("Error fetching restaurant data:", error);
    console.log(xhr.status);
  };

  ajaxService(
    `/menu-items/bypincode/${pincode}`,
    "GET",
    undefined,
    OnSuccess,
    OnError
  );
}

function displayFoodItems() {
  $("#foodDisplayCounter").empty();

  populateMenuItemCards(foodItems);
  registerClickEventOnOrderButton();
}

function populateMenuItemCards(foodItems) {
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
}
function getOrderData(itemId) {
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
  return order;
}

function orderService(order) {
  const onError = (xhr, status, error) => {
    console.log(xhr.status, error);
  };
  const onSuccess = (response) => {
    console.log(response);
    window.location.href = "/customerPortal/orders/";
  };
  ajaxService("/orders/bookOrder", "POST", order, onSuccess, onError);
}

function registerClickEventOnOrderButton() {
  $(".order-now-button").on("click", (event) => {
    const itemId = $(event.target).data("id");
    const order = getOrderData(itemId);
    orderService(order);
  });
}
