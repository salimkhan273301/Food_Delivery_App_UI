$.ajax({
  url:
    "http://localhost:8080/api/orders/customer/" +
    localStorage.getItem("customerId"),
  method: "GET",
  dataType: "json",
  success: function (data) {
    populateTable(data);
  },
  error: function (xhr, status, error) {
    handleError(xhr, status, error);
  },
});

function populateTable(orders) {
  var tableBody = $("#order-table tbody");

  orders.forEach(function (order) {
    var row = $("<tr></tr>");
    row.append("<td>" + order.orderId + "</td>");
    row.append("<td>" + order.restaurantName + "</td>");
    row.append("<td>" + new Date(order.orderDate).toDateString() + "</td>");
    row.append("<td>" + order.orderItems[0].menuItem + "</td>");
    row.append("<td>" + order.totalAmount + "</td>");
    row.append("<td>" + order.status + "</td>");

    tableBody.append(row);
  });
}
