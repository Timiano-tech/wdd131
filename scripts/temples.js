const date = document.getElementById("lastModified");
date.innerHTML = `Last Modification: ${document.lastModified}`;

const year = document.querySelector("#currentyear");
year.innerHTML = new Date().getFullYear();

// Hamburger Menu

const menuButton = document.querySelector("#menu-button");
const nav = document.querySelector("nav");

nav.classList.add("hide");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("hide");

    if (nav.classList.contains("hide")) {
        menuButton.textContent = "☰";
    } else {
        menuButton.textContent = "✖";
    }
});