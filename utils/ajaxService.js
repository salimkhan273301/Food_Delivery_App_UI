const BASE_URL = "http://localhost:8080/api";

const dOnSuccess = (response) => {
  console.log("Successfully Done!", response);
};

const dOnError = (xhr, status, error) => {
  console.log("Something went wrong", error);
};

function ajaxServiceV2({
  button,
  endpoint,
  type = "GET",
  data,
  onError = dOnError,
  onSuccess = dOnSuccess,
}) {
  ajaxService(endpoint, type, data, onSuccess, onError, button);
}

function ajaxService(
  endpoint,
  type = "GET",
  data = undefined,
  onSuccess,
  onError,
  button = undefined
) {
  toggleDisable(button, true);

  $.ajax({
    url: BASE_URL + endpoint,
    type: type,
    contentType: "application/json",
    ...(data ? { data: JSON.stringify(data) } : {}),
    success: function (response) {
      if (typeof response === "object") {
        onSuccess(response);
      } else {
        onSuccess({ message: response }); // Wrap the response in an object
      }
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
