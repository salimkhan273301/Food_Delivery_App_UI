fetchCustomers();

function fetchCustomers() {
  const success = function (response) {
    populateTable(response);
  };

  const error = function (xhr, status, error) {
    console.log(xhr.status, error);
  };

  ajaxService("/customers/all", "GET", undefined, success, error);
}

function populateTable(response) {
  // Clear existing table rows
  $("#customers-table tbody").empty();

  // Loop through the response data and generate table rows
  $.each(response, function (index, customer) {
    const row = `
      <tr>
        <td>${customer.customerId}</td>
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.phoneNumber}</td>
        <td>${customer.address}</td>
        <td>${customer.pincode}</td>
        <td>${customer.password}</td>
        <td>
            <button class="btn btn-primary btn-sm view-customer-btn" data-customer-view="${customer.customerId}" onclick="viewCustomer(${customer.customerId})"><i class="fas fa-eye"></i>View</button>
            <button class="btn btn-info btn-sm edit-customer-btn" data-customer-edit="${customer.customerId}" onclick="editCustomer(${customer.customerId})"><i class="fas fa-edit"></i>Edit</button>
            <button class="btn btn-danger btn-sm delete-customer-btn" data-customer-delete="${customer.customerId}" onclick="deleteCustomer(${customer.customerId})"><i class="fas fa-trash-alt"></i> Delete</button>
        </td>
      </tr>`;
    $("#customers-table tbody").append(row);
  });
}

function formatPhoneNumberIndianStyle(phoneNumber) {
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  if (cleanedNumber.length === 10) {
    const providerCode = cleanedNumber.slice(0, 4);
    const subscriberNumber = cleanedNumber.slice(4);

    return `${providerCode}-${subscriberNumber}`;
  } else {
    return phoneNumber;
  }
}

function viewCustomer(customerId) {
  const onSuccess = function (customer) {
    $("#viewCustomerId").text(customer.customerId);
    $("#viewName").text(customer.name);
    $("#viewEmail").text(customer.email);
    $("#viewPhoneNumber").text(
      formatPhoneNumberIndianStyle(customer.phoneNumber)
    );
    $("#viewAddress").text(customer.address);
    $("#viewPincode").text(customer.pincode);

    $("#viewModal").modal("show");
  };
  const onError = function (error) {
    console.error("Error fetching customer details:", error);
  };
  ajaxService(
    `/customers/${customerId}`,
    "GET",
    undefined,
    onSuccess,
    onError,
    `[data-customer-view=${customerId}]`
  );
}

function editCustomer(customerId) {
  const onSuccess = function (customer) {
    populateForm(customer);
    $("#editModal").modal("show");
  };
  const onError = function (error) {
    console.error("Error fetching customer details:", error);
  };

  ajaxService(
    `/customers/${customerId}`,
    "GET",
    undefined,
    onSuccess,
    onError,
    `[data-customer-edit=${customerId}]`
  );
}

function populateForm(customer) {
  $("#editCustomerId").val(customer.customerId);
  $("#editName").val(customer.name);
  $("#editEmail").val(customer.email);
  $("#editPhoneNumber").val(customer.phoneNumber);
  $("#editAddress").val(customer.address);
  $("#editPincode").val(customer.pincode);
  $("#editPassword").val(customer.password); // Populate password field
}

$("#saveChanges").on("click", function (event) {
  event.preventDefault();
  const customerId = $("#editCustomerId").val();
  const updatedData = {
    name: $("#editName").val(),
    email: $("#editEmail").val(),
    phoneNumber: $("#editPhoneNumber").val(),
    address: $("#editAddress").val(),
    pincode: $("#editPincode").val(),
    password: $("#editPassword").val(),
  };

  updateCustomer(customerId, updatedData);
  console.log(updatedData);
});

function updateCustomer(customerId, updatedData) {
  const onSuccess = function (response) {
    console.log("Customer with ID " + customerId + " updated successfully");
    $("#editModal").modal("hide");
    // Refresh the table after updating the customer
    fetchCustomers();
  };
  const onError = function (error) {
    console.error("Error updating customer:", error);
  };

  ajaxService(
    `/customers/${customerId}`,
    "PUT",
    updatedData,
    onSuccess,
    onError,
    "#saveChanges"
  );
}

function deleteCustomer(customerId) {
  const onSuccess = function (response) {
    console.log("Customer with ID " + customerId + " deleted successfully");
    // After successful deletion, you can remove the row from the table
    $(
      "#customers-table tbody tr[data-customer-id='" + customerId + "']"
    ).remove();
  };

  const onError = function (xhr, status, error) {
    console.log(xhr.status, error);
  };

  ajaxService(
    "/customers/delete/" + customerId,
    "DELETE",
    undefined,
    onSuccess,
    onError
  );
}
