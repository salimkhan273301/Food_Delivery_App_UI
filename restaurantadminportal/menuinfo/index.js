// Function to create and append menu item cards
function createMenuItemCard(item) {
  const card = `
    <div class="col-md-4 col-sm-6">
      <div class="card menu-item">
        <img class="card-img-top" src="${item.food_image_url}" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <p class="card-text">${item.price}</p>
          <div class="buttons">
            <a class="btn btn-primary" href="/restaurantadminportal/addMenu/?itemId=${item.itemId}">Edit</a>
            <button class="btn btn-danger" onclick="deleteItem(${item.itemId})">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `;
  return card;
}

// Function to fetch menu item data from the server using AJAX
function fetchMenuItems() {
  const onSuccess = (data) => {
    const menuContainer = $("#menu-container");
    let row = $('<div class="row menu-row"></div>');

    data.forEach((item, index) => {
      const card = createMenuItemCard(item);
      row.append(card);

      if ((index + 1) % 3 === 0 || index === data.length - 1) {
        // If index is a multiple of 3 or it's the last item, append the row to the container
        menuContainer.append(row);
        row = $('<div class="row"></div>'); // Start a new row
      }
    });
  };

  const onError = (xhr, status, error) => {
    console.log(xhr.status);
  };

  ajaxService(
    "/menu-items/myrestaurent/" + localStorage.getItem("restaurantId"),
    "GET",
    undefined,
    onSuccess,
    onError
  );
}

fetchMenuItems();

function deleteItem(itemId) {
  const onSuccess = (response) => {
    alert("Delete Item " + itemId);
  };
  const onError = (xhr, status, error) => {
    console.log(xhr.status, error);
  };

  ajaxService("/menu-items/" + itemId, "DELETE", undefined, onSuccess, onError);
}
