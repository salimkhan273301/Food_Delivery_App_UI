function logout() {
  // Clear local storage data
  localStorage.clear();
  // Redirect to login page
  window.location.href = "/login"; // Replace "/login" with the actual login page URL
}

// Bind click event to the Logout link
$("#logout-link").click(function (e) {
  e.preventDefault();
  logout();
});

const userId = localStorage.getItem("userId");

if (!userId) {
  window.location.href = "/login";
}
