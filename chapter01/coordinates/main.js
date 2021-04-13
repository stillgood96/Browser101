const horizontal = document.querySelector(".horizontal");
const vertical = document.querySelector(".vertical");
const target = document.querySelector(".target");
const tag = document.querySelector(".tag");

addEventListener("load", () => {
  const targetRect = target.getBoundingClientRect();
  console.log(targetRect);
  const targetHalfWidth = targetRect.width / 2;
  const targetHalfHeight = targetRect.height / 2;

  document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    console.log(`${x}, ${y}`);

    vertical.style.transform = `translateX(${x}px)`;
    //vertical.style.left = `${x}px`;

    horizontal.style.transform = `translateY(${y}px)`;
    // horizontal.style.top = `${y}px`;

    target.style.transform = `translate(${x - targetHalfWidth}px,${
      y - targetHalfHeight
    }px)`;
    // target.style.top = `${y}px`;
    // target.style.left = `${x}px`;

    tag.style.transform = `translate(${x + 30}px,${y + 30}px)`;
    //tag.style.top = `${y}px`;
    //tag.style.left = `${x}px`;

    tag.innerHTML = `${x}px , ${y}px`;
  });
});
