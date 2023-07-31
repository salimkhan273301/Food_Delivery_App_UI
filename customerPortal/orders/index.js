const RECEIVED = "RECEIVED";
const DELIVERED = "DELIVERED";

const CANCELED = "CANCELED";

const BOOKED = "BOOKED";

fetchOrders();

function fetchOrders() {
  $.ajax({
    url:
      "http://localhost:8080/api/orders/customer/" +
      localStorage.getItem("customerId"),
    method: "GET",
    dataType: "json",
    success: function (data) {
      populateTable(data);
      registerEventListenersOnReceiveButton();
    },
    error: function (xhr, status, error) {
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
    row.append("<td>" + order.restaurantName + "</td>");
    row.append("<td>" + new Date(order.orderDate).toDateString() + "</td>");
    row.append("<td>" + order.orderItems[0].menuItem + "</td>");
    row.append("<td>" + order.totalAmount + "</td>");
    row.append("<td>" + order.status + "</td>");
    // Add the button for changing the order status
    row.append(
      `
      <td> 
      <button class="btn btn-info text-white receive" data-id="${
        order.orderId
      }" ${isReceivedButtonDisabled(order.status) ? "disabled" : ""}> ${
        order.status === "RECEIVED" ? "Received" : "Receive"
      } </button>
      </td>
      `
    );

    tableBody.append(row);
  });
}
// Function to check if the button should be disabled based on the order status
function isReceivedButtonDisabled(status) {
  if (status === DELIVERED) return false;

  return true;
}
// // Handle the button click event to change the order status
// $(document).on("click", ".receive", function () {
//   var orderId = $(this).data("id");

//   // Implement logic to change the status from "Delivered" to "Received" and vice versa
//   var updatedStatus = isReceivedButtonDisabled($(this).text())
//     ? "Received"
//     : "Delivered";
//   // Make the AJAX PUT request to update the order status
//   $.ajax({
//     url: `${BASE_URL}/orders/${orderId}`,
//     method: "PUT",
//     dataType: "json",
//     data: JSON.stringify({ status: updatedStatus }),
//     contentType: "application/json",
//     success: function (data) {
//       // Update the button text and disable/enable status based on the updated status
//       $(this).text(updatedStatus);
//       $(this).prop("disabled", isReceivedButtonDisabled(updatedStatus));

//       // Update the corresponding table cell with the new status
//       var statusCell = $(this).closest("tr").find("td:nth-child(6)");
//       statusCell.text(updatedStatus);
//     },
//     error: function (xhr, status, error) {
//       console.error("Error updating order status:", error);
//     },
//   });
// });

function registerEventListenersOnReceiveButton() {
  $(".receive").click(function (e) {
    const orderId = $(this).attr("data-id");
    updateStatus(RECEIVED, orderId);
    e.preventDefault();
    console.log("button of deliver clicked");
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
