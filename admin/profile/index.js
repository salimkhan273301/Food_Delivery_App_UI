function fetchProfileInfo() {
  const success = function (data) {
    $("#customerId").text(data.adminId);
    $("#name").text(data.name);
    $("#address").text(data.address);
    $("#phoneNumber").text(data.mobileNumber);
    $("#pincode").text(data.pincode);
    $("#email").text(data.email);
    $("#password").text(data.password);
  };
  const error = function (error) {
    console.log("Error fetching profile data:", error);
  };
  const userEmail = localStorage.getItem("userEmail");
  ajaxService(`/admins/email/${userEmail}`, "GET", undefined, success, error);
}
fetchProfileInfo();
