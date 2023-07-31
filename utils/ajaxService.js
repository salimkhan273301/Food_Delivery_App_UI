const BASE_URL = "http://localhost:8080/api";

const dOnSuccess = (response) => {
  console.log("Successfully Done!", response);
};

const dOnError = (xhr, status, error) => {
  console.log("Something went wrong", error);
};

function ajaxService(
  endpoint,
  type = "GET",
  data = undefined,
  onSuccess = dOnSuccess,
  onError = dOnError,
  button = undefined
) {
  toggleDisable(button, true);

  $.ajax({
    url: BASE_URL + endpoint,
    type: type,
    contentType: "application/json",
    ...(data ? { data: JSON.stringify(data) } : {}),
    success: function (response) {
      onSuccess(response);
    },
    error: function (xhr, status, error) {
      console.log("Error:", error);
      onError(xhr, status, error);
    },
    complete: function () {
      toggleDisable(button, false);
    },
  });
}

function toggleDisable(button, bool) {
  if (button) {
    $(button).prop("disabled", bool);
    if (bool) {
      $(button).addClass("disabled");
    } else {
      $(button).removeClass("disabled");
    }
  }
}
