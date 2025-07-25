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
    setTimeout(function () {
        $(".odometer").each(function () {
            const count = $(this).data("count");
            $(this).html(count);
        });
    }, 300);
});
