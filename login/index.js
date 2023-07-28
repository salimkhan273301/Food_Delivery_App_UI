const CUSTOMER = "CUSTOMER";
const ADMIN = "ADMIN";
const RESTAURANT_OWNER = "RESTAURANT_OWNER";

$("#login-form").submit(function (event) {
  event.preventDefault();
  loginUser();
});

function loginUser() {
  const email = $("#email").val();
  const password = $("#password").val();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  const loginData = { email, password };
  loginService(loginData);
}

function loginService(loginData) {
  const onSuccess = (response) => {
    var userType = response.userType;
    var usermail = response.user.email;
    var userId = response.user.userId;

    localStorage.setItem("userId", userId);
    localStorage.setItem("userType", userType);
    localStorage.setItem("userEmail", usermail);

    fetchAndRedirect(userType, userId);
  };

  ajaxService("/login", "POST", loginData, onSuccess);
}

function fetchAndRedirect(userType, userId) {
  switch (userType) {
    case ADMIN:
      fetchAdminUserData(userId);
      break;

    case RESTAURANT_OWNER:
      fetchRestaurantOwnerData(userId);
      break;

    case CUSTOMER:
      fetchCustomerUserData(userId);
      break;
    default:
      console.log(
        userType + " user type does not exists in Khana Khao platform"
      );
  }
}

function fetchAdminUserData(userId) {
  const onSuccess = (response) => {
    localStorage.setItem("adminId", response.adminId);
    window.location.href = "/admin/admin.html";
  };

  ajaxService("/admins" + userId, "GET", undefined, onSuccess);
}

function fetchRestaurantOwnerData(userId) {
  const onSuccess = (response) => {
    if (response.length > 0) {
      var restaurantOwnerData = response[0];
      localStorage.setItem("restaurantId", restaurantOwnerData.restaurantId);
      window.location.href = "/restaurantadminportal/";
    } else {
      console.log("No restaurant found for the user");
    }
  };

  ajaxService("/restaurants/user/" + userId, "GET", undefined, onSuccess);
}

function fetchCustomerUserData(userId) {
  const onSuccess = (response) => {
    const customerdata = response[0];
    localStorage.setItem("customerId", customerdata.customerId);
    localStorage.setItem("pincode", customerdata.pincode);
    window.location.href = "/customerPortal";
  };
  ajaxService("/customers/user/" + userId, "GET", undefined, onSuccess);
}
