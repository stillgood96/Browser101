// 코드를 설명하는 주석은 가독성에 좋지 않다.
// 의도 즉 '왜?' 라는 물음에 답할 수 있는 내용을 주석에 담으면 좋다.

const items = document.querySelector(".items");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

// 버튼을 눌르고나서 이벤트를 처리하는 함수는 보통 'on' 이 붙는다
function onAdd() {
  // 1. 사용자가 입력한 텍스트를 받아와야 한다.
  const text = input.value;
  if (text == "") {
    input.focus();
    return;
  }

  // 2. 새로운 아이템을 만듬 (텍스트 + 삭제 버튼)
  const item = createItem(text);

  // 3. items 컨테이너안에 새로 만든 아이템을 추가한다 !
  items.appendChild(item);

  // 4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: "center" });

  // 5. 인풋을 초기화 해주어야 한다 !
  input.value = "";
  input.focus();
}

let id = 0; // UUID
// footer하단의 버튼을 눌렀을 때
function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item__row");
  itemRow.setAttribute("data-id", id);
  itemRow.innerHTML = `
  <div class="item">
    <span class="item__name">${text}</span>
    <button class="item__delete" >
      <i class="fas fa-trash-alt"data-id=${id}></i>
    </button>
  </div>
  <div class="item__divider"></div>`;
  id++;

  // const item = document.createElement("div");
  // item.setAttribute("class", "item");

  // const span = document.createElement("sapn");
  // span.setAttribute("class", "item__name");
  // span.innerText = text;

  // const deleteBtn = document.createElement("button");
  // deleteBtn.setAttribute("class", "item__delete");
  // deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  // deleteBtn.addEventListener("click", () => {
  //   items.removeChild(itemRow);
  // });

  // const itemDivider = document.createElement("div");
  // itemDivider.setAttribute("class", "item__divider");

  // item.appendChild(span);
  // item.appendChild(deleteBtn);

  // itemRow.appendChild(item);
  // itemRow.appendChild(itemDivider);

  return itemRow;
}

addBtn.addEventListener("click", () => {
  onAdd();
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    onAdd();
  }
});

// 이벤트 위임
items.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
