$.ajax({
  url:
    "http://localhost:8080/api/orders/customer/" +
    localStorage.getItem("customerId"),
  method: "GET",
  dataType: "json",
  success: function (data) {
    // Function to handle the successful response
    populateTable(data);
  },
  error: function (xhr, status, error) {
    // Function to handle errors
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

function formatDate(dateStr) {
  const format = "YYYY-MM-DD HH:mm:ss";
  const dateObj = new Date(dateStr);

  const year = dateObj.getFullYear();
  const month = padZero(dateObj.getMonth() + 1);
  const day = padZero(dateObj.getDate());
  const hours = padZero(dateObj.getHours());
  const minutes = padZero(dateObj.getMinutes());
  const seconds = padZero(dateObj.getSeconds());

  // Replace the format placeholders with corresponding date components
  return format
    .replace("YYYY", year)
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}

function padZero(number) {
  return number < 10 ? "0" + number : number;
}
