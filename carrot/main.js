const start = document.querySelector(".startBtn");
const timer = document.querySelector(".timer");
const residue = document.querySelector(".residue");

start.addEventListener("click", () => {
  console.log("clicked!");
  timer.innerText = "10:00";
  residue.innerText = "10";
});
