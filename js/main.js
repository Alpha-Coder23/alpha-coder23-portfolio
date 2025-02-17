(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Navbar on scrolling
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".navbar").fadeIn("slow").css("display", "flex");
    } else {
      $(".navbar").fadeOut("slow").css("display", "none");
    }
  });

  // Smooth scrolling on the navbar links
  $(".navbar-nav a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top - 45,
        },
        500,
        "easeInOutExpo"
      );

      if ($(this).parents(".navbar-nav").length) {
        $(".navbar-nav .active").removeClass("active");
        $(this).closest("a").addClass("active");
      }
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500, "easeInOutExpo");
    return false;
  });

  // Typed Initiate
  if ($(".typed-text-output").length == 1) {
    var typed_strings = $(".typed-text").text();
    var typed = new Typed(".typed-text-output", {
      strings: typed_strings.split(", "),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }

  // Modal Video
  var $videoSrc;
  $(".btn-play").click(function () {
    $videoSrc = $(this).data("src");
  });
  console.log($videoSrc);
  $("#videoModal").on("shown.bs.modal", function (e) {
    $("#video").attr(
      "src",
      $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
    );
  });
  $("#videoModal").on("hide.bs.modal", function (e) {
    $("#video").attr("src", $videoSrc);
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Skills
  $(".skill").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    dots: true,
    loop: true,
  });

  $(document).ready(function () {
    const itemsPerPage = 6;
    let currentPage = 1;
    let filteredItems = $(".portfolio-item");

    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
      layoutMode: "fitRows",
    });

    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("active");
      $(this).addClass("active");

      const filterValue = $(this).data("filter");
      portfolioIsotope.isotope({ filter: filterValue });

      filteredItems =
        filterValue === "*"
          ? $(".portfolio-item")
          : $(".portfolio-item" + filterValue);

      currentPage = 1;
      updatePagination();
    });

    function updatePagination() {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      filteredItems.hide();
      filteredItems.slice(startIndex, endIndex).show();

      portfolioIsotope.isotope("layout");

      const itemCount = filteredItems.length;
      const totalPages = Math.ceil(itemCount / itemsPerPage);

      if (itemCount <= itemsPerPage) {
        $(".pagination").hide();
      } else {
        $(".pagination").show();
        $("#prevPage")
          .parent()
          .toggleClass("disabled", currentPage === 1);
        $("#nextPage")
          .parent()
          .toggleClass("disabled", currentPage === totalPages);
      }
    }

    $("#prevPage").on("click", function () {
      if (currentPage > 1) {
        currentPage--;
        updatePagination();
      }
    });

    $("#nextPage").on("click", function () {
      if (currentPage * itemsPerPage < filteredItems.length) {
        currentPage++;
        updatePagination();
      }
    });

    updatePagination();
  });

  // Show Toast Notification
  function showToast(message, type = "success") {
    const toastContainer = document.getElementById("toast-container");

    // Create toast element
    const toast = document.createElement("div");
    toast.classList.add("toast", type);

    // Add content to the toast
    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"></path>
          </svg>
        </div>
        <span>${message}</span>
      </div>
      <button class="close-btn">&times;</button>
      <div class="toast-progress"></div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    const progressBar = toast.querySelector(".toast-progress");
    progressBar.style.transition = "transform 5s linear";
    setTimeout(() => {
      progressBar.style.transform = "scaleX(0)";
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 500);
    }, 5000);

    toast.querySelector(".close-btn").addEventListener("click", () => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 500);
    });
  }

  function validateForm(form) {
    let isValid = true;

    const name = form.find("#name").val().trim();
    const email = form.find("#email").val().trim();
    const subject = form.find("#subject").val().trim();
    const message = form.find("#message").val().trim();

    form.find(".error-message").remove();

    if (name === "") {
      form
        .find("#name")
        .focus()
        .after(
          '<span class="error-message" style="color: red;">Please enter your name.</span>'
        );
      isValid = false;
      return isValid;
    }

    if (email === "") {
      form
        .find("#email")
        .focus()
        .after(
          '<span class="error-message" style="color: red;">Please enter your email.</span>'
        );
      isValid = false;
      return isValid;
    } else if (!validateEmail(email)) {
      form
        .find("#email")
        .focus()
        .after(
          '<span class="error-message" style="color: red;">Please enter a valid email address.</span>'
        );
      isValid = false;
      return isValid;
    }

    if (subject === "") {
      form
        .find("#subject")
        .focus()
        .after(
          '<span class="error-message" style="color: red;">Please enter the subject.</span>'
        );
      isValid = false;
      return isValid;
    }

    if (message === "") {
      form
        .find("#message")
        .focus()
        .after(
          '<span class="error-message" style="color: red;">Please enter your message.</span>'
        );
      isValid = false;
      return isValid;
    }

    return isValid;
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    if (validateForm($(this))) {
      showToast("You will be contacted shortly", "success");
      $(this).find('input[type="text"], input[type="email"], textarea').val('');
    }
  });

  $("#contactForm input, #contactForm textarea").on("input", function () {
    $(this).next(".error-message").remove();
  });
})(jQuery);
