// Header background on scroll

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

// Typing Placeholder Animation

const input = document.querySelector("input");

const placeholders = [
    "Search for restaurant...",
    "Search for pizza...",
    "Search for burgers...",
    "Search for biryani...",
    "Search for Chinese...",
    "Search for desserts..."
];

let word = 0;
let char = 0;
let deleting = false;

function typeEffect() {

    let current = placeholders[word];

    if (!deleting) {
        input.setAttribute(
            "placeholder",
            current.substring(0, char++)
        );

        if (char > current.length) {
            deleting = true;

            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        input.setAttribute(
            "placeholder",
            current.substring(0, char--)
        );

        if (char < 0) {

            deleting = false;
            word = (word + 1) % placeholders.length;

        }

    }

    setTimeout(typeEffect, deleting ? 40 : 90);

}

typeEffect();


// Fade when page loads

window.addEventListener("load", () => {

    document.querySelector("main img").classList.add("fade-in");
    document.querySelector("p").classList.add("fade-in");

});


// Search animation

input.addEventListener("focus", () => {

    input.style.transition = ".3s";
    input.style.background = "#fff";

});

input.addEventListener("blur", () => {

    input.style.background = "#fafafa";

});


// Enter key

input.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        alert("Searching for: " + input.value);

    }

});


// Smooth navbar hover

document.querySelectorAll("header a").forEach(link=>{

    link.addEventListener("mouseenter",()=>{

        link.style.transform="translateY(-3px)";

    });

    link.addEventListener("mouseleave",()=>{

        link.style.transform="translateY(0)";

    });

});


// Logo rotation

const logo=document.querySelector(".logo img");

logo.addEventListener("mouseenter",()=>{

    logo.style.transition=".6s";
    logo.style.transform="rotate(360deg)";

});

logo.addEventListener("mouseleave",()=>{

    logo.style.transform="rotate(0deg)";

});