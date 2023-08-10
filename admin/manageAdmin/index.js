function fetchAdminTables() {
  const onSuccess = function (response) {
    console.log(response);
    populateTable(response);
  };
  const onError = function (xhr, status, error) {
    console.log(error);
  };

  ajaxServiceV2({ onError, endpoint: "/admins", onSuccess });
}

$("#registerAdmin").click(function (e) {
  e.preventDefault();
  $("#registrationModal").modal("show");
  $("#registrationModalLabel").text("Register Admin");
  $("#registerAdminBtn").text("register");
  $("#registrationForm")[0].reset();
});

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
            <button class="btn btn-info text-white btn-sm edit-admin-btn" data-admin-edit="${admin.adminId}" onclick="editAdmin(${admin.adminId})"><i class="fas fa-edit"></i>Edit</button>
            <button class="btn btn-danger btn-sm delete-admin-btn" data-admin-delete="${admin.adminId}"onclick="deleteAdmin(${admin.adminId}, this)"><i class="fas fa-trash-alt"></i> Delete</button>
        </td>
      </tr>`;
    $("#admins-table tbody").append(row);
  });
}

fetchAdminTables();

function getDataFromRegistrationForm() {
  return {
    name: $("#name").val(),
    mobileNumber: $("#mobileNumber").val(),
    address: $("#address").val(),
    email: $("#email").val(),
    password: $("#password").val(),
  };
}

function registerAdmin(data) {
  const onSuccess = function (response) {
    console.log(response);
    fetchAdminTables();
  };
  const onError = function (xhr, status, error) {
    console.log(xhr.status, error);
  };

  ajaxServiceV2({
    onSuccess,
    onError,
    endpoint: "/admins/createAdmin",
    type: "POST",
    data,
    button: "#registerAdminBtn",
  });
}

$("#registerAdminBtn").click(function (e) {
  e.preventDefault();
  const adminId = $("#adminId").val();

  const data = getDataFromRegistrationForm();
  if (adminId) {
    updateadmin(adminId, data);
  } else {
    registerAdmin(data);
  }
});

function editAdmin(adminId) {
  const onSuccess = function (admin) {
    populateForm(admin);
    $("#registrationModal").modal("show");
    $("#registrationModalLabel").text("Update Admin");
    $("#registerAdminBtn").text("Update");
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
  $("#adminId").val(admin.adminId);
  $("#name").val(admin.name);
  $("#mobileNumber").val(admin.mobileNumber);
  $("#address").val(admin.address);
  $("#email").val(admin.email);
  $("#password").val(admin.password);
  // Populate password field
}

function updateadmin(adminId, updatedData) {
  const onSuccess = function (response) {
    console.log("admin with ID " + adminId + " updated successfully");
    $("#registrationModal").modal("hide");
    // Refresh the table after updating the admin
    fetchAdminTables();
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

//delete the admin
function deleteAdmin(adminId, buttonElement) {
  ajaxServiceV2({
    endpoint: `/admins/${adminId}`,
    type: "DELETE",
    onSuccess: function (response) {
      console.log(response);

      // Find and fade out the row from the table
      const rowElement = buttonElement.closest("tr");
      if (rowElement) {
        $(rowElement).fadeOut(1000, function () {
          $(this).remove();
          console.log("Row removed with fade-out effect.");
        });
      }
    },
    onError: function (xhr, status, error) {
      console.log(xhr.status, error);
    },
  });
}
