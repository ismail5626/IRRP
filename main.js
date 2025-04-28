document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("adventure-button");

    // Create the audio object
    const buttonSound = new Audio("./Audio/Button_Click.mp3");

    button.addEventListener("click", () => {
        buttonSound.play();

       const funSites = [
    "Fun-sites/dad-joke/dad-joke.html",         
    "Fun-sites/cursed-captcha/cursed-captcha.html",    
    "Fun-sites/horrible-therapist/horrible-therapist.html",
    "Fun-sites/quizz/quizz.html",
    "Fun-sites/Pen/pen.html",
    "Fun-sites/tictactoe/tictactoe.html",             
    "Fun-sites/quiz/quiz.html"                        
];


        const randomSite = funSites[Math.floor(Math.random() * funSites.length)];

        button.innerText = "Wait... Something's happening!";
        button.style.background = "red";

        setTimeout(() => {
            window.location.href = randomSite;
        }, 2000);
    });

    // === Marker Mode Modal Logic ===
    const modal = document.getElementById("marker-modal");
    const footer = document.getElementById("marker-footer");
    const yesBtn = document.getElementById("marker-yes");
    const noBtn = document.getElementById("marker-no");
    const siteSelect = document.getElementById("marker-site-select");

    // Always show the modal when the page is refreshed
    modal.classList.remove("hidden");
    modal.classList.add("fade-in");

    // Check if marker mode is enabled in localStorage
    const markerMode = localStorage.getItem("markerMode");

    // Show the footer only if marker mode is enabled
    if (markerMode === "true") {
        footer.classList.remove("hidden");
        footer.classList.add("fade-in");
    } else {
        footer.classList.add("hidden"); // Ensure footer is hidden if not enabled
    }

    // Enable Marker Mode when the user clicks 'Yes'
    yesBtn.addEventListener("click", () => {
        localStorage.setItem("markerMode", "true");
        modal.classList.add("hidden");
        footer.classList.remove("hidden");
        footer.classList.add("fade-in");
    });

    // Disable Marker Mode when the user clicks 'No'
    noBtn.addEventListener("click", () => {
        localStorage.setItem("markerMode", "false");
        modal.classList.add("hidden");
        footer.classList.add("hidden");
    });

    // Navigate to the selected site from the dropdown
    siteSelect.addEventListener("change", () => {
        const selected = siteSelect.value;
        if (selected) {
            window.location.href = selected;
        }
    });
});
