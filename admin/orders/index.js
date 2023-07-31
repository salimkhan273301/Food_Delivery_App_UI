function fetchOrders() {
  const success = function (data) {
    populateTable(data);
  };
  const error = function (xhr, status, error) {
    console.log("Error fetching orders: " + error);
  };

  ajaxService("/orders", "GET", undefined, success, error);
}

// Function to populate the table with order data
function populateTable(orders) {
  var tableBody = $("#order-table-body");

  orders.forEach(function (order) {
    var row = $("<tr></tr>");
    row.append("<td>" + order.orderId + "</td>");
    row.append("<td>" + order.restaurantName + "</td>");
    row.append("<td>" + new Date(order.orderDate).toDateString() + "</td>");
    row.append("<td>" + order.totalAmount + "</td>");

    // Process order items
    var orderItemsCell = $("<td></td>");
    order.orderItems.forEach(function (item) {
      orderItemsCell.append(item.quantity + " x " + item.menuItem + "<br>");
    });
    row.append(orderItemsCell);

    row.append("<td>" + order.customerName + "</td>");
    row.append("<td>" + order.status + "</td>");

    tableBody.append(row);
  });
}

// Call the function to fetch and populate orders when the page loads
fetchOrders();
