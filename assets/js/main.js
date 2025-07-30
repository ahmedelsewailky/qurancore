/**
 * Initialize Bootstrap tooltips on all elements with `data-bs-toggle="tooltip"`.
 * This runs when the DOM is ready.
 */
$(function () {
    $('[data-bs-toggle="tooltip"]').tooltip();
});

/**
 * Typing animation that loops through a list of words.
 * - Types and deletes each word letter by letter.
 * - Displays animation inside an element with `.typer-text` class.
 * - Loops infinitely through: "education", "quran", "arabic language", "tajweed".
 */
$(function () {
    const words = ["education", "quran", "arabic language", "tajweed"];
    let part = 0;
    let wordIndex = 0;
    let isDeleting = false;
    const typingSpeed = 200;
    const deletingSpeed = 50;
    const pauseTime = 1500;
    const target = $(".typer-text");

    function type() {
        const currentWord = words[wordIndex];
        const currentText = currentWord.substring(0, part);
        target.text(currentText);

        if (!isDeleting && part < currentWord.length) {
            part++;
            setTimeout(type, typingSpeed);
        } else if (isDeleting && part > 0) {
            part--;
            setTimeout(type, deletingSpeed);
        } else {
            if (!isDeleting) {
                isDeleting = true;
                setTimeout(type, pauseTime);
            } else {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, typingSpeed);
            }
        }
    }

    type();
});

/**
 * Animate `.odometer` elements once they're visible.
 * - Uses IntersectionObserver to detect visibility of `.static-card` elements.
 * - Sets the text content to the value from `data-count`.
 * - Runs after DOM load with a 300ms delay.
 */
document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const odometers =
                        entry.target.querySelectorAll(".odometer");
                    odometers.forEach((odometer) => {
                        const count = odometer.dataset.count;
                        odometer.innerHTML = count;
                    });
                    observer.unobserve(entry.target); // Run only once
                }
            });
        },
        {
            threshold: 0.5, // Trigger when 50% visible
        }
    );

    document.querySelectorAll(".static-card").forEach((card) => {
        observer.observe(card);
    });
});

/**
 * Parallax effect for `.parallex-effect` elements inside `.section`.
 * - Moves elements based on mouse position and `data-depth`.
 * - Resets transform on mouseleave.
 * - Ensures effect is only bound once per section.
 */
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".parallex-effect");

    elements.forEach((el) => {
        const parent = el.closest(".section");
        if (!parent || parent.dataset.parallaxBound) return;

        parent.dataset.parallaxBound = true;
        const targets = parent.querySelectorAll(".parallex-effect");

        parent.addEventListener("mousemove", function (e) {
            const rect = parent.getBoundingClientRect();
            const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
            const yPercent = (e.clientY - rect.top) / rect.height - 0.5;

            targets.forEach((target) => {
                const depth =
                    parseFloat(target.getAttribute("data-depth")) || 0.5;
                const moveX = xPercent * depth * 200;
                const moveY = yPercent * depth * 200;
                target.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });

        parent.addEventListener("mouseleave", function () {
            targets.forEach((target) => {
                target.style.transform = `translate(0, 0)`;
            });
        });
    });
});

/**
 * Owl Carousel setup for testimonials section.
 * - Loops through items with spacing.
 * - Responsive for 1 or 3 items based on screen width.
 */
$(".testimonails .owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    responsiveClass: true,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
        0: { items: 1, nav: true },
        600: { items: 1, nav: true },
        1000: { items: 3, nav: true, loop: false },
    },
});

/**
 * Owl Carousel setup for team work section.
 * - Displays 1 to 4 items depending on screen width.
 */
$(".team-work .owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    responsiveClass: true,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
        0: { items: 1 },
        600: { items: 1 },
        1000: { items: 4 },
    },
});

/**
 * Fades out preloader once window has finished loading.
 */
$(window).on("load", function () {
    $(".preloader").fadeOut("slow");
});

/**
 * Initialize AOS (Animate On Scroll) plugin.
 * - Must be included after AOS library is loaded.
 */
AOS.init();

/**
 * Enable smooth scrolling with Lenis.
 * - Logs scroll events to the console.
 */
const lenis = new Lenis({
    autoRaf: true,
});

lenis.on("scroll", (e) => {
    console.log(e); // Debug/logging purposes
});





(function () {
  const navbar = document.querySelector(".navbar-scroll-show-hide");
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let navbarReached = false;

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const navbarTop = navbar.offsetTop;

    if (currentScroll >= navbarTop) {
      navbarReached = true;
    } else {
      navbarReached = false;
      navbar.classList.remove("navbar-hidden");
      return;
    }

    if (navbarReached) {
      if (currentScroll > lastScrollTop) {
        navbar.classList.add("navbar-hidden");
      } else {
        navbar.classList.remove("navbar-hidden");
      }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
})();


$(function () {
  const backToTopBtn = $('.back-to-top');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
      backToTopBtn.addClass('show');
    } else {
      backToTopBtn.removeClass('show');
    }
  });

  backToTopBtn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 600);
  });
});