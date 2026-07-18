// Get the navigation bar
const navbar = document.getElementById("navbar");

// Detect when the user scrolls
window.addEventListener("scroll", function () {

    // If the page is scrolled more than 50 pixels
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = "#111";
        navbar.style.padding = "12px 50px";
    } else {
        navbar.style.backgroundColor = "#222";
        navbar.style.padding = "20px 50px";
    }

});