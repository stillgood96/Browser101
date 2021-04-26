"use strict";
// 혼자하는 복습 ver

// 필요 DOM 요소들
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const gameField = document.querySelector(".game__field");
const fieldRect = gameField.getBoundingClientRect();

const popUp = document.querySelector(".pop-up");
const popUpWithText = document.querySelector(".pop-up__message");
const popUpRefresh = document.querySelector(".pop-up__refresh");

// 필요 변수들
const GAME_DURATION_SEC = 5;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const CARROT_SIZE = 80;
const CARROT_IMG_PATH = "/alone/img/carrot.png";
const BUG_IMG_PATH = "/alone/img/bug.png";

let timer = undefined;
let score = 0;

// started를 쓰는 이유
//게임버튼을 시작여부에 따라 동작하는 기능이 다르기에
// 구분하기위해 전역변수를 선언하고 사용한다.
let started = false;

// step1 : 게임시작버튼 클릭시 - timer, score에 값, 필드에 요소 추가
// step2 : 게임 요소 클릭시 게임 종료 및 팝업

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

gameField.addEventListener("click", onFieldClick);

popUpRefresh.addEventListener("click", startGame;

function startGame() {
  started = true;
  score = 0;
  showStopButton();
  showTimerAndScore();
  startGameTimer(GAME_DURATION_SEC);
  setScore(CARROT_COUNT);
  init();
  hidePopUp();
}
function stopGame() {
  started = false;
  stopTimer();
  showPopUpWithText("REPLAY ?? ");
  hideGameButton();
  showStartButton();
}

function finishGame(win) {
  started = false;
  stopTimer();
  showPopUpWithText(win ? "YOU WIN!!" : "YOU LOST!!");
  hideGameButton();
}

function init() {
  gameField.innerHTML = "";
  addItems("carrot", CARROT_COUNT, CARROT_IMG_PATH);
  addItems("bug", BUG_COUNT, BUG_IMG_PATH);
}

// 타이머 스코어 hidden 제거
function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

// 타이머 설정
function startGameTimer(time) {
  setGameTimer(time);
  let remainingTimeSec = time;
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(false);
      return;
    }
    setGameTimer(--remainingTimeSec);
  }, 1000);
}

function setGameTimer(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  gameTimer.innerText = `${minutes}:${seconds}`;
}

function stopTimer() {
  clearInterval(timer);
}

// 스코어 설정
function setScore(count) {
  gameScore.innerText = count;
}

// 버튼체인지
function showStopButton() {
  const stopBtn = gameBtn.querySelector(".fas");
  stopBtn.classList.add("fa-stop");
  stopBtn.classList.remove("fa-play");
}

function showStartButton() {
  const stopBtn = gameBtn.querySelector(".fas");
  gameBtn.style.visibility = "visible";
  stopBtn.classList.add("fa-play");
  stopBtn.classList.remove("fa-stop");
}

// 필드 요소 추가(당근, 벌레)
function addItems(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    gameField.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// 요소클릭시 이벤트
function onFieldClick(event) {
  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    setScore(CARROT_COUNT - score);
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    finishGame(false);
  }
}

// 팝업 띄우기 + 메세지
function showPopUpWithText(text) {
  popUpWithText.innerText = text;
  popUp.classList.remove("hide");
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function hidePopUp() {
  popUp.classList.add("hide");
}
