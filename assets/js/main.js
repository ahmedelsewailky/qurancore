/**
 * Initializes Bootstrap tooltips for all elements that have `data-bs-toggle="tooltip"`.
 * This function runs when the DOM is ready.
 */
$(function () {
    $("[data-bs-toggle=\"tooltip\"]").tooltip();
});

/**
 * Creates a typing animation effect that cycles through a list of words.
 * The effect types out and deletes each word letter by letter inside an element with the `.typer-text` class.
 * 
 * Words include: "education", "quran", "arabic language", "tajweed".
 * The animation loops infinitely with customizable typing and deleting speeds.
 */
$(function () {
    const words = ["education", "quran", "arabic language", "tajweed"];
    let part = 0;               // Current character index
    let wordIndex = 0;          // Index of the current word
    let isDeleting = false;     // Whether we're deleting the text
    const typingSpeed = 200;    // Typing speed in ms
    const deletingSpeed = 50;   // Deleting speed in ms
    const pauseTime = 1500;     // Pause after completing a word
    const target = $(".typer-text"); // Target element to display typing

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
 * Triggers odometer animation for all elements with the `.odometer` class
 * by reading the value from their `data-count` attribute and updating the content.
 * 
 * This runs after the DOM has loaded and waits 300ms before starting the animation.
 */
document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const odometers = entry.target.querySelectorAll(".odometer");
                odometers.forEach(odometer => {
                    const count = odometer.dataset.count;
                    odometer.innerHTML = count;
                });
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Start when 50% of the element is visible
    });

    // Observe each section/card that contains odometer numbers
    document.querySelectorAll(".static-card").forEach(card => {
        observer.observe(card);
    });
});


/**
 * Enables parallax effect on elements with `.parallex-effect` inside `.section`.
 * 
 * - Moves elements on mousemove based on cursor position and `data-depth` attribute.
 * - Resets position on mouseleave.
 * - Ensures each section is only bound once using `data-parallax-bound`.
 */
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.parallex-effect');

    elements.forEach(el => {
        const parent = el.closest('.section');
        if (!parent) return;

        if (parent.dataset.parallaxBound) return;
        parent.dataset.parallaxBound = true;

        const targets = parent.querySelectorAll('.parallex-effect');

        parent.addEventListener('mousemove', function (e) {
            const rect = parent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPercent = (x / rect.width - 0.5);
            const yPercent = (y / rect.height - 0.5);

            targets.forEach(target => {
                const depth = parseFloat(target.getAttribute('data-depth')) || 0.5;
                const moveX = xPercent * depth * 200;
                const moveY = yPercent * depth * 200;
                target.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });

        parent.addEventListener('mouseleave', function () {
            targets.forEach(target => {
                target.style.transform = `translate(0, 0)`;
            });
        });
    });
});



$(".testimonails .owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    responsiveClass: true,
    autoplay: true,
    autoplayTimeout: 10,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1,
            nav: true
        },
        600: {
            items: 3,
            nav: false
        },
        1000: {
            items: 3,
            nav: false,
            loop: false
        }
    }
});


$(".team-work .owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    responsiveClass: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 4,
        }
    }
});
