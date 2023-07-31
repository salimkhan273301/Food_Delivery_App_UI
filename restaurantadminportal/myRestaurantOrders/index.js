const DELIVERED = "DELIVERED";
const CANCELED = "CANCELED";

const OrderStatus = {
  DELIVERED: "DELIVERED",
  CANCELED: "CANCELED",
};

fetchOrders();

function fetchOrders() {
  $.ajax({
    url:
      "http://localhost:8080/api/orders/restaurant/" +
      localStorage.getItem("restaurantId"),
    method: "GET",
    dataType: "json",
    success: function (data) {
      // Function to handle the successful response
      populateTable(data);
      registerEventListenersOnDeliverButton();
      registerEventListenersOnCancelButton();
    },
    error: function (xhr, status, error) {
      // Function to handle errors
      handleError(xhr, status, error);
    },
  });
}

function populateTable(orders) {
  var tableBody = $("#order-table tbody");
  tableBody.empty();
  orders.forEach(function (order) {
    var row = $("<tr></tr>");
    row.append("<td>" + order.orderId + "</td>");
    row.append("<td>" + order.customerName + "</td>");
    row.append("<td>" + new Date(order.orderDate).toDateString() + "</td>");
    row.append("<td>" + order.orderItems[0].menuItem + "</td>");
    row.append("<td>" + order.totalAmount + "</td>");
    row.append("<td>" + order.status + "</td>");
    row.append(
      `
      <td> 
      <button class="btn btn-info text-white  deliver" data-id="${
        order.orderId
      }"  ${isDeliverButtonDisabled(order.status) ? "disabled" : ""}  > ${
        order.status === DELIVERED ? "Delivered" : "Deliver"
      } </button>
      <button class="btn btn-danger text-white  cancel" data-id="${
        order.orderId
      }"  ${isCancelButtonDisabled(order.status) ? "disabled" : ""}  > ${
        order.status === CANCELED ? "Canceled" : "Cancel"
      } </button>
      
      </td>
      
      `
    );

    tableBody.append(row);
  });
}

function isDeliverButtonDisabled(status) {
  if (status === DELIVERED) {
    return true;
  }

  if (status === CANCELED) {
    return true;
  }

  return false;
}

function isCancelButtonDisabled(status) {
  if (status === OrderStatus.CANCELED) {
    return true;
  }

  if (status === DELIVERED) {
    return true;
  }

  return false;
}

function registerEventListenersOnDeliverButton() {
  $(".deliver").click(function (e) {
    const orderId = $(this).attr("data-id");
    updateStatus(OrderStatus.DELIVERED, orderId);
    e.preventDefault();
    console.log("button of deliver clicked");
  });
}

function registerEventListenersOnCancelButton() {
  $(".cancel").click(function (e) {
    const orderId = $(this).attr("data-id");
    updateStatus(CANCELED, orderId);
    e.preventDefault();
    console.log("button of cancel clicked");
  });
}

function updateStatus(status, orderId) {
  $.ajax({
    url: `http://localhost:8080/api/orders/updateStatus/${orderId}`,
    data: JSON.stringify(status),
    type: "POST",
    contentType: "application/json",
    success: function (response) {
      // Check if the response contains the success message
      if (response === "Status updated successfully") {
        // Display a success message
        console.log("Status updated successfully");
        // Fetch orders again to update the table with the new status
        fetchOrders();
      } else {
        // Display the response message as it contains the error details
        console.log("Status update failed: " + response);
      }
    },
    error: function () {
      // Handle network or other errors
      console.log("Something went wrong");
    },
  });
}

// <button class="btn btn-danger text-white mx-2  cancel "  ${
//         order.status === DELIVERED ? "disabled" : ""
//       }  >Cancel</button>
