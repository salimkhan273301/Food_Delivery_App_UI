const BASE_URL = "http://localhost:8080/api";

function ajaxService(
  endpoint,
  type = "GET",
  data = undefined,
  onSuccess = () => {},
  onError = () => {}
) {
  $.ajax({
    url: BASE_URL + endpoint,
    type: type,
    contentType: "application/json",
    ...(data ? { data: JSON.stringify(data) } : {}),
    success: function (response) {
      onSuccess(response);
    },
    error: function (xhr, status, error) {
      console.log("Error registering menu item:", error);
      onError(xhr, status, error);
    },
  });
}
