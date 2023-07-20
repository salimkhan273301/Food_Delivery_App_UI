$(".nav-link").click(function () {
  // Remove the 'active' class from all navbar links
  $(".nav-link").removeClass("active");

  // Hide all sections
  $(".container").hide();

  // Get the target section from the data-target attribute
  var target = $(this).attr("data-target");

  // Show the target section
  $("#" + target).show();

  // Add the 'active' class to the clicked navbar link
  $(this).addClass("active");
});
