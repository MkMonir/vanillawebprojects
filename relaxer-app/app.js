const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

const breatheAnimation = function () {
  text.textContent = "Breathe In!";
  container.className = "container grow";

  setTimeout(() => {
    text.textContent = "Hold";
    setTimeout(() => {
      text.textContent = "Breathe Out!";
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
};

breatheAnimation();

setInterval(breatheAnimation, totalTime);
