"use strict";

// 벌레 깔아둘 field 불러오기
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timmer");
const gameScore = document.querySelector(".game__score");

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener("click", () => {
  console.log("btn Clicked");
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTime();
}

function stopGame() {}

function showStopButton() {
  const icon = gameBtn.querySelector(".fa-play");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-ply");
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function initGame() {
  field.innerHTML = "";
  gameScore.innerText = CARROT_COUNT;
  // 벌레와 당근을 생성한뒤 field에 추가해줌
  // console.log(fieldRect);
  addItem("carrot", 5, "img/carrot.png");
  addItem("bug", 5, "img/bug.png");
}

// Field 내에 랜덤한 위치에 요소 깔기
// x1, y1에 field의 width, height의 시작 값인 0 을 입력
// x2, y2에는 field의 MAX_width, MAX_height값을 입력 후
// 당근 사진의 크기만큼 크기를 빼준다 빼주는 이유로는
// 랜덤한 위치를 찍어주면 거기에 이미지를 깔게되는데 이때 필드의 끝자락 부분이
// 걸리게 되면 필드 밖에 이미지가 깔리게 되므로 이를 방지하기 위해 이미지의 크기만큼 빼줌
// 이후 randomNumber함수를 이용해서 x1 x2 y1 y2를 범위로한 랜덤한 수가 나오게 지정
function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    field.appendChild(item);
  }
}
// carrot size == 80
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
