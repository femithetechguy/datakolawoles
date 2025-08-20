// Navigation and scroll logic
$(document).ready(function () {
  $(".navbar .nav-link").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        { scrollTop: $(hash).offset().top },
        700,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

// Set page title
(function () {
  document.title = "Adefemi Kolawole";
})();

// Set favicon
(function () {
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = "assets/imgs/favicon.png";
})();
