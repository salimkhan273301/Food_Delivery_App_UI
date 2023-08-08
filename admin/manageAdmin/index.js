function fetchAdminProfile() {
  const onSuccess = function (response) {
    console.log(response);
    populateTable(response);
  };
  const onError = function (xhr, status, error) {
    console.log(error);
  };

  ajaxServiceV2({ onError, endpoint: "/admins", onSuccess });
}

function populateTable(response) {
  // Clear existing table rows
  $("#admins-table tbody").empty();

  // Loop through the response data and generate table rows
  $.each(response, function (index, admin) {
    const row = `
      <tr>
        <td>${admin.adminId}</td>
        <td>${admin.name}</td>
        <td>${admin.email}</td>
        <td>${admin.mobileNumber}</td>
        <td>${admin.address}</td>

        <td>${admin.password}</td>
        <td>
            <button class="btn btn-primary btn-sm view-customer-btn" data-customer-view="${admin.customerId}" onclick="viewCustomer(${admin.adminId})"><i class="fas fa-eye"></i>View</button>
            <button class="btn btn-info btn-sm edit-admin-btn" data-admin-edit="${admin.adminId}" onclick="editadmin(${admin.adminId})"><i class="fas fa-edit"></i>Edit</button>
            <button class="btn btn-danger btn-sm delete-admin-btn" data-admin-delete="${admin.adminId}" onclick="deleteadmin(${admin.adminId})"><i class="fas fa-trash-alt"></i> Delete</button>
        </td>
      </tr>`;
    $("#admins-table tbody").append(row);
  });
}

fetchAdminProfile();

function getDataFromRegistrationForm() {
  return {
    name: $("#name"),
    mobileNumber: $("#mobileNumber"),
    address: $("#address"),
    email: $("#email"),
    password: $("#password"),
  };
}

function registerAdmin() {
  const onSuccess = function (response) {
    console.log(response);
  };
  const onError = function (xhr, status, error) {
    console.log(xhr.status, error);
  };

  const data = getDataFromRegistrationForm();

  ajaxServiceV2({
    onSuccess,
    onError,
    endpoint: "/admins/createAdmin",
    type: "POST",
    data,
  });
}

$("#registerAdminBtn").click(function (e) {
  e.preventDefault();
  registerAdmin();
});
