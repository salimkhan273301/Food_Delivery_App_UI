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
            <button class="btn btn-primary btn-sm view-admin-btn" data-admin-view="${admin.adminId}" onclick="viewadmin(${admin.adminId})"><i class="fas fa-eye"></i>View</button>
            <button class="btn btn-info btn-sm edit-admin-btn" data-admin-edit="${admin.adminId}" onclick="editAdmin(${admin.adminId})"><i class="fas fa-edit"></i>Edit</button>
            <button class="btn btn-danger btn-sm delete-admin-btn" data-admin-delete="${admin.adminId}" onclick="deleteadmin(${admin.adminId})"><i class="fas fa-trash-alt"></i> Delete</button>
        </td>
      </tr>`;
    $("#admins-table tbody").append(row);
  });
}

fetchAdminProfile();

function getDataFromRegistrationForm() {
  return {
    name: $("#name").val(),
    mobileNumber: $("#mobileNumber").val(),
    address: $("#address").val(),
    email: $("#email").val(),
    password: $("#password").val(),
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

function editAdmin(adminId) {
  const onSuccess = function (admin) {
    populateForm(admin);
    $("#editModal").modal("show");
  };
  const onError = function (error) {
    console.error("Error fetching admin details:", error);
  };

  ajaxService(
    `/admins/${adminId}`,
    "GET",
    undefined,
    onSuccess,
    onError,
    `[data-admin-edit=${adminId}]`
  );
}

function populateForm(admin) {
  console.log(admin);
  $("#editAdminId").val(admin.adminId);
  $("#editName").val(admin.name);
  $("#editMobileNumber").val(admin.phoneNumber);
  $("#editAddress").val(admin.address);
  $("#editEmail").val(admin.email);
  $("#editPassword").val(admin.password);
  // Populate password field
}

$("#saveChanges").on("click", function (event) {
  event.preventDefault();
  const adminId = $("#editAdminId").val();
  const updatedData = {
    name: $("#editName").val(),
    mobileNumber: $("#editMobileNumber").val(),
    address: $("#editAddress").val(),
    email: $("#editEmail").val(),
    password: $("#editPassword").val(),
  };

  updateadmin(adminId, updatedData);
  console.log(updatedData);
});

function updateadmin(adminId, updatedData) {
  const onSuccess = function (response) {
    console.log("admin with ID " + adminId + " updated successfully");
    $("#editModal").modal("hide");
    // Refresh the table after updating the admin
    fetchadmins();
  };
  const onError = function (error) {
    console.error("Error updating admin:", error);
  };

  ajaxService(
    `/admins/${adminId}`,
    "PUT",
    updatedData,
    onSuccess,
    onError,
    "#saveChanges"
  );
}
