const captchaGames = [
  {
    type: "text",
    task: "What's 12 + 5?",
    taunts: [
      "Wrong again. Maybe try primary school math?",
      "I’m not mad, just... disappointed.",
      "Have you considered a calculator?",
      "This is painful to watch.",
      "Are you even trying?"
    ]
  },
  {
    type: "text",
    task: "spell the word captcha backwards.",
    taunts: [
      "It's like you're trying to fail.",
      "Your keyboard deserves better.",
      "ahptcac? Really?",
      "You spelled it like your brain’s buffering.",
      "Maybe just give up?"
    ]
  },
  {
    type: "image",
    task: "Select all crabs.",
    taunts: [
      "You call that a crab? Try harder.",
      "That's a dog, genius.",
      "Crabs fear you for a reason.",
      "This isn't find the fish bro.",
      "Every marine biologist just cringed."
    ],
    images: [
      "images/bird.jpg",
      "images/cat.jpg",
      "images/bird2.jpg",
      "images/dog.jpg",
      "images/fish2.jpg",
      "images/fish.jpg",
      "images/shoe.jpg",
      "images/forrest.jpg",
      "images/house.jpg",
    ]
  }
];
// keeps track of which captcha challenge game is being played
let currentGame = 0;
let selectedImages = [];
// function that loads a new captcha on screen based on the type
function loadCaptcha() {
  const game = captchaGames[currentGame];
  const taskBox = document.getElementById("task-box");
  const inputBox = document.getElementById("input-box");
  const imageContainer = document.getElementById("image-container");
  const tauntsBox = document.getElementById("taunts-box");
  // show the game / task to the user
  taskBox.textContent = game.task;
  // clear the taunts and selections
  tauntsBox.textContent = "";
  selectedImages = [];

  if (game.type === "text") {
	// if it's a text based game show input box
    inputBox.style.display = "block";
    inputBox.value = "";
    imageContainer.innerHTML = "";
  } else if (game.type === "image") {
	// if it's an image game hide input and show imeges
    inputBox.style.display = "none";
    imageContainer.innerHTML = "";
	// loop through the image list and create image elements for each one
    game.images.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "captcha image";
      img.className = "captcha-image";
      img.onclick = function () {
        toggleImageSelection(index, img);
      };
	  // add the image to the grid
      imageContainer.appendChild(img);
    });
  }
}
	// function so it can toggle selection of images
function toggleImageSelection(index, imgElement) {
  if (selectedImages.includes(index)) {
	// if image already selected unselect it
    selectedImages = selectedImages.filter(i => i !== index);
    imgElement.style.border = "3px solid transparent";
  } else {
	// if image not selected select it
    selectedImages.push(index);
    imgElement.style.border = "3px solid red";
  }
}

function submitCaptcha() {
  const game = captchaGames[currentGame];
  const tauntsBox = document.getElementById("taunts-box");
  // randomly pick a taunt from the list of taunts
  const randomTaunt = game.taunts[Math.floor(Math.random() * game.taunts.length)];
  tauntsBox.textContent = randomTaunt;
  tauntsBox.style.color = "red";
}

// function that loads the next captcha when try another is clicked
function tryAnotherCaptcha() {
  currentGame = (currentGame + 1) % captchaGames.length;
  loadCaptcha();
}

// Load first captcha
window.onload = loadCaptcha;
