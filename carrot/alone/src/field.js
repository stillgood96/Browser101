"use strict";
import * as sound from "/alone/src/sound.js";

const CARROT_SIZE = 80;

// 자바스크립트에서의 클래스
// Field(필드)클래스의 정보를 담은 field 자바스크립트에서는
// 클릭 이벤트 리스너가 있다. 여기서 클릭이 발생되면 클래스내부의
// onClick 함수가 실행되게 되는데 우리가 주목해야할 점은
// onClick 함수 내부의 this. 이다.
// onClick 이 이벤트발생으로부터 함수가 호출되었을때
// onClick 함수내부에 핵심적인 기능을 담아할 this.onItemClick에서
// this에 대한 정보가 날라가게된다 .
// 다른언어에서는 당연히 정보가 남아져 이동이되도록 보이겠지만
// 자바스크립트에서는 그렇지 않다고 한다.

// 정정 클래스 내부의 함수가 콜백함수라던지 다른곳에 호출되어 팔려가게 되면
// 내부에 있던 함수의 내용중 this.의 내용은 포함이 되지 않게 된다.
// 그래서 this. 와 함수간의 연결고리가 되어주는 바인딩 작업이 필요해지는데 ...

// 해결책으로는 함수를 바인딩(?)을 해주어야한다고 한다.
// 첫번째 방법은 생성자 내부에서
// this.onClick = this.onClick.bind(this);
// this를 따로 바인딩 해주어야한다

// 두번째 방법은
// 기존 클릭 이벤트 발생시 실행하 함수를 콜백함수로 한번 감싸는거다.
// this.field.addEventListener('click',(event) => this.onClick(event));
// 애로우 펑션안에서의 this는 유지가 된다고한다.

// 세번째 방법
// 함수로 만들지 않고 함수의 내용을 변수에 할당시켜 적용을 한다.
// onClick = event => { 함수의 내용};

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
  }

  init() {
    this.field.innerHTML = "";
    this._addItem("carrot", this.carrotCount, "/alone/img/carrot.png");
    this._addItem("bug", this.bugCount, "/alone/img/bug.png");
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  // 자바스크립트에서 pirivate함수는 통용적으로 사용되지 않음
  // 그래서 함수명 앞에 _(언더바)를 붙임으로써 외부에서 함수를 바라봤을때 구분이 되도록 함
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".carrot")) {
      // 당근!!
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick("bug");
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
