// Responses for various feelings which are clearly unhelpful, lol
const responses = {
  sad: [
    "Why not just be happy instead?",
    "Crying won't help, move on. Suck it up.",
    "Have you tried just not being sad?"
  ],
  stressed: [
    "Just relax it’s not that hard.",
    "Maybe you're just overreacting take a chill  jeez.",
    "it's not that deep chill..."
  ],
  lonely: [
    "Maybe you're just not fun to be around... just saying.",
    "Try talking to your mirror. It’s almost like having a friend.",
    "Have you considered making better friends? Maybe try that."
  ],
  anxious: [
    "just stop thinking so much.",
    "Anxiety is just imagination. Chill.",
    "Maybe you should panic more. That’ll totally help."
  ],
  tired: [
    "Sleep more? Duh.",
    "You're tired because you're lazy. Let’s be real.",
    "Nap your problems away, genius. You’ll feel great."
  ],
  default: [
    "I literally don't care. Try again.",
    "Yawn. Next.",
    "Try saying something interesting for once."
  ]
};

// Function to add messages to the chat box
function addMessage(text, isUser) {
  const chatBox = document.getElementById("chat-box");
  const message = document.createElement("div");
  message.classList.add("message");
  message.classList.add(isUser ? "user-message" : "ai-message");
  message.textContent = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Function for typing indicator by using 3 dots
function showTypingIndicator() {
  const chatBox = document.getElementById("chat-box");
  const typing = document.createElement("div");
  typing.classList.add("typing-indicator");

  // adds the 3 little dots to show that the chatbot is typing
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("span");
    typing.appendChild(dot);
  }
 // show the typing indicator at the bottom of the chatbot
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
  return typing;
}

// Handles sending the user message and chatbots response
function sendMessage() {
  const input = document.getElementById("user-input");
  const userText = input.value.trim(); // gets the text and removes the extra spaces
  if (userText === "") return; //if the message is empty dont do anything

  addMessage(userText, true);  // add the users message to the chat which is on the far right
  input.value = "";  // clear the input box

  const lower = userText.toLowerCase(); // convert to lowercase
  let foundKey = null;

  // loop through the keywords to see if any of them match what the user entered
  for (let key in responses) {
    if (key !== "default" && lower.includes(key)) {
      foundKey = key;
      break; // stop once a matching word is found
    }
  }
  // show the chatbot typing
  const typing = showTypingIndicator();

  // adds a deley for the chatbots response to make it feel like a message
  const delay = Math.random() * 500 + 1000; // Random between 1-1.5 seconds

  setTimeout(() => {
    typing.remove();  // remove typing dots after delay

    let reply;
    if (foundKey) {
	  // picks a random reply from the matching keyword responses
      const possibleReplies = responses[foundKey];
      reply = possibleReplies[Math.floor(Math.random() * possibleReplies.length)];
    } else {
      // if there is no keyword then use the default response
      const fallback = responses.default;
      reply = fallback[Math.floor(Math.random() * fallback.length)];
    }

    addMessage(reply, false);  // show chatbot response on the left
  }, delay);
}
