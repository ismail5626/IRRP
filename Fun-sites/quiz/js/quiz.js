const questions = [
  {
    question: "What is a group of computers networked together and used by hackers to steal information called?",
    options: ["Rootkit", "Operating System", "Botnet", "DDoS"],
    answer: "Botnet"
  },
  {
    question: "What type of software infects a machine, locks the files, then asks for money?",
    options: ["Worm", "Trojan", "Ransomware", "Browser Hijacker"],
    answer: "Ransomware"
  },
  {
    question: "What does AES stand for?",
    options: ["Advanced Encryption Standard", "Automated Encryption Security", "Adaptive Encryption System", "Access Encryption Standard"],
    answer: "Advanced Encryption Standard"
  },
  {
    question: "Which of these exploits vulnerabilities?",
    options: ["Criminals", "Government", "Hacktivists", "All of the Above"],
    answer: "All of the Above"
  },
  {
    question: "What is the primary purpose of a firewall?",
    options: ["To scan for malware", "To block unauthorized access", "To backup data", "To encrypt communication"],
    answer: "To block unauthorized access"
  },
  {
    question: "Which of the following is considered the weakest link in cybersecurity?",
    options: ["Firewall", "Encryption", "Human Error", "Antivirus software"],
    answer: "Human Error"
  },
  {
    question: "What does DDoS stand for?",
    options: ["Distributed Denial of Service", "Direct Denial of Service", "Digital Denial of Service", "Distributed Defense of Service"],
    answer: "Distributed Denial of Service"
  },
  {
    question: "Which of the following is a method of phishing?",
    options: ["Sending fake emails", "Exploiting software vulnerabilities", "Encrypting data", "Using complex passwords"],
    answer: "Sending fake emails"
  },
  {
    question: "Which tool can be used to sniff network traffic?",
    options: ["Wireshark", "Metasploit", "Burp Suite", "Nmap"],
    answer: "Wireshark"
  },
  {
    question: "What is the primary function of an antivirus program?",
    options: ["To block spam emails", "To scan and remove malware", "To encrypt data", "To monitor network traffic"],
    answer: "To scan and remove malware"
  },
  {
    question: "What is a zero-day vulnerability?",
    options: ["A vulnerability that has been fixed", "A vulnerability with a known patch", "A vulnerability that is exploited before a patch is available", "A vulnerability found in open-source software"],
    answer: "A vulnerability that is exploited before a patch is available"
  },
  {
    question: "What does two-factor authentication provide?",
    options: ["An additional password", "A physical device for authentication", "A secure network connection", "An extra layer of security"],
    answer: "An extra layer of security"
  }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    document.getElementById("question").innerText = question.question;
    const buttons = document.querySelectorAll(".answer-button");
    buttons.forEach((button, index) => {
      button.innerText = question.options[index];
      button.onclick = function () {
        if (button.innerText === question.answer) {
          score++;
        }
        currentQuestionIndex++;
        loadQuestion();
      };
    });
  } else {
    displayResult();
  }
}

function displayResult() {
  document.getElementById("question-container").style.display = "none";
  document.getElementById("score").innerText = `Your score is: ${score} out of ${questions.length}`;
  document.getElementById("result-container").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  loadQuestion();
});
