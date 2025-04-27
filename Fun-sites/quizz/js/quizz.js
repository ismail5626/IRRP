const correctAnswers = {
    1: "b",
    2: "b",
    3: "a",
    4: "b",
    5: "a",
    6: "b",
    7: "b",
    8: "c",
    9: "a",
    10: "a"
};

let userAnswers = {};
let currentQuestion = 1;

function showQuestion(questionNumber) {
    const questions = document.querySelectorAll('.question');
    questions.forEach((question) => {
        question.style.display = 'none';
    });

    const questionToShow = document.getElementById(`question-${questionNumber}`);
    if (questionToShow) {
        questionToShow.style.display = 'block';
    }
}

function nextQuestion(questionNumber) {
    const selectedAnswer = document.querySelector(`input[name="q${questionNumber}"]:checked`);
    if (!selectedAnswer) {
        alert("Please select an answer!");
        return;
    }

    userAnswers[questionNumber] = selectedAnswer.value;
    currentQuestion++;
    if (currentQuestion <= 10) {
        showQuestion(currentQuestion);
    }
}

function submitQuiz() {
    let score = 0;
    for (let question in correctAnswers) {
        if (userAnswers[question] === correctAnswers[question]) {
            score++;
        }
    }

    document.getElementById("result").innerHTML = `You scored ${score} out of 10!`;
    document.querySelector('.restart-btn').style.display = 'block';
}

function restartQuiz() {
    userAnswers = {};
    currentQuestion = 1;
    document.getElementById("result").innerHTML = "";
    document.querySelector('.restart-btn').style.display = 'none';
    showQuestion(currentQuestion);
}

// Show the first question on page load
window.onload = () => showQuestion(currentQuestion);
