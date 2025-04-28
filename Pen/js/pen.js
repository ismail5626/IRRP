let shots = 0;
let goals = 0;
let bestGoals = 0;
let isShooting = false;
const maxShots = 5;
let difficulty = 'medium';
let keeperSpeed = 2;
let saveChance = 0.7;

const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

function createConfetti() {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FFDB33'];
  for (let i = 0; i < 200; i++) {
    confettiParticles.push({
      x: Math.random() * window.innerWidth,
      y: -20,
      size: Math.random() * 10 + 5,
      speedX: Math.random() * 4 - 2,
      speedY: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
}

let confettiParticles = [];

window.addEventListener('resize', () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
animateConfetti();

function animateConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i < confettiParticles.length; i++) {
    const p = confettiParticles[i];
    p.x += p.speedX;
    p.y += p.speedY;
    p.speedY *= 0.99;
    p.speedX *= 0.99;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.fill();
    if (p.y > window.innerHeight) {
      confettiParticles.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animateConfetti);
}

function changeDifficulty() {
  const selectedDifficulty = document.getElementById('difficulty').value;
  if (selectedDifficulty === 'easy') {
    difficulty = 'easy';
    keeperSpeed = 1.5;
    saveChance = 0.5;
  } else if (selectedDifficulty === 'medium') {
    difficulty = 'medium';
    keeperSpeed = 2;
    saveChance = 0.7;
  } else {
    difficulty = 'hard';
    keeperSpeed = 3;
    saveChance = 0.9;
  }
}

function aimAndShoot(event) {
  if (isShooting || shots >= maxShots) return;
  isShooting = true;

  const ball = document.getElementById('ball');
  const goalkeeper = document.getElementById('goalkeeper');
  const result = document.getElementById('result');
  const aimBar = document.getElementById('aimBar');
  const score = document.getElementById('score');
  const gameOver = document.getElementById('gameOver');
  const resetButton = document.getElementById('resetButton');
  const bestScore = document.getElementById('bestScore');

  ball.style.top = '';
  ball.style.left = '135px';
  goalkeeper.style.left = '125px';
  result.textContent = '';

  const rect = aimBar.getBoundingClientRect();
  let clickX = event.clientX - rect.left;
  clickX = Math.max(0, Math.min(clickX, 300));

  const ballTarget = (clickX / 300) * 260;

  ball.style.top = '10px';
  ball.style.left = `${ballTarget}px`;

  setTimeout(() => {
    let keeperDecision;

    if (Math.random() < saveChance) {
      keeperDecision = ballTarget + (Math.random() * 30 - 15);
    } else {
      keeperDecision = Math.random() * 260;
    }

    keeperDecision = Math.max(0, Math.min(keeperDecision, 260));
    goalkeeper.style.left = `${keeperDecision}px`;

    setTimeout(() => {
      const keeperPos = parseInt(goalkeeper.style.left);
      shots++;

      if (ballTarget > keeperPos - 30 && ballTarget < keeperPos + 50) {
        result.textContent = "Saved by the Keeper! 🧤";
        result.style.color = "blue";
      } else {
        result.textContent = "GOAL! 🎯";
        result.style.color = "green";
        goals++;
      }

      score.textContent = `Score: ${goals} Goals out of ${shots} Shots`;

      if (shots >= maxShots) {
        if (goals > bestGoals) {
          bestGoals = goals;
        }

        bestScore.textContent = `Best Score: ${bestGoals}/5`;
        gameOver.classList.remove('hidden');
        resetButton.classList.remove('hidden');
        aimBar.classList.add('hidden');
        result.classList.add('hidden');
        score.classList.add('hidden');
        gameOver.textContent = `Game Over! 🎉 You scored ${goals} out of ${maxShots} shots!`;

        if (goals === maxShots) {
          createConfetti();  // Start confetti explosion when perfect score
        }
      }

      isShooting = false;
    }, 400);
  }, 200);
}

function resetGame() {
  shots = 0;
  goals = 0;
  isShooting = false;
  confettiParticles = []; // Clear previous confetti

  const ball = document.getElementById('ball');
  const goalkeeper = document.getElementById('goalkeeper');
  const result = document.getElementById('result');
  const aimBar = document.getElementById('aimBar');
  const score = document.getElementById('score');
  const gameOver = document.getElementById('gameOver');
  const resetButton = document.getElementById('resetButton');

  ball.style.top = '';
  ball.style.left = '135px';
  goalkeeper.style.left = '125px';

  result.textContent = '';
  score.textContent = `Score: 0 Goals out of 0 Shots`;

  gameOver.classList.add('hidden');
  resetButton.classList.add('hidden');
  aimBar.classList.remove('hidden');
  result.classList.remove('hidden');
  score.classList.remove('hidden');
}
