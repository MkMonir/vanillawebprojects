const rulesBtn = document.getElementById("rules-btn");
const closebtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const popup = document.getElementById("popup-container");
const finalMessage = document.getElementById("final-message");
const playAgainBtn = document.getElementById("play-button");

let score = 0;
let live = 3;
const brickRowCount = 9;
const brickColumdCounst = 5;

// Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// Create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (j = 0; j < brickColumdCounst; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}
console.log(bricks);
// Draw ball on canvas
const drawBall = function () {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
};

// Draw paddle on canvas
const drawPaddle = function () {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
};

// Draw score on canvas
const drawScore = function () {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
};

// Draw score on canvas
const drawLive = function () {
  ctx.font = "20px Arial";
  ctx.fillText(`Live: ${live}`, canvas.width - 200, 30);
};

// Draw bricks on canvas
const drawBricks = function () {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
};

// Move paddle in canvas
const movePaddle = function () {
  paddle.x += paddle.dx;

  // Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
};

// Increase score on score board
const increaseScore = function () {
  score++;

  if (score % (brickRowCount * brickRowCount) === 0) {
    showAllBricks();
  }
};

// Move ball on canvas
const moveBall = function () {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision(Right / Left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  // Wall collision(Top / Bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // Bricks collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // Left brick side check
          ball.x + ball.size < brick.x + brick.w && // Right brick side check
          ball.y + ball.size > brick.y && // Top brick side check
          ball.y - ball.size < brick.y + brick.h // Bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;

          // Increase score
          increaseScore();
        }
      }
    });
  });

  // Hit bootom wall
  if (ball.y + ball.size > canvas.height) {
    live--;
  }
  if (live === 0) {
    popup.style.display = "flex";
    finalMessage.textContent = "Unfortunately you lost. 😕";
    score = 0;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
  }
};

// make all bricks appear
const showAllBricks = function () {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
  live = 3;
};

// Draw everything
const draw = function () {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawLive();
  drawBricks();
};

// Update canvas drawing and animations
const update = function () {
  movePaddle();
  moveBall();

  // Draw everything
  draw();

  requestAnimationFrame(update);
};
update();

// Keydown event
const keyDown = function (e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
};

// keyup event
const keyUp = function (e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
};

// Keyboard event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Event listners
rulesBtn.addEventListener("click", (e) => {
  rules.classList.add("show");
});
closebtn.addEventListener("click", (e) => {
  rules.classList.remove("show");
});
playAgainBtn.addEventListener("click", (e) => {
  e.preventDefault();

  showAllBricks();
  popup.style.display = "none";
  moveBall();
});
