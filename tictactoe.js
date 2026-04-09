let boxes = Array.from(document.querySelectorAll(".box"));
let reset_btn = document.querySelector("#reset");
let playerName1 = prompt("Enter Player-1 name : ")?.trim() || "Player 1";
let playerName2 = prompt("Enter Player-2 name : ")?.trim() || "Player 2";
let turn = true;
let count = 0;
let lastmove = null;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

function reset_fun() {
  count = 0;
  turn = true;
  lastmove = null;
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.color = "";
  });
}

function undoFun() {
  if (lastmove) {
    lastmove.innerText = "";
    lastmove.disabled = false;
    lastmove.style.color = "";
    turn = !turn;
    count = Math.max(0, count - 1);
  }
  lastmove = null;
}

let lastMoveButton = document.querySelector(".undo");
lastMoveButton.addEventListener("click", undoFun);
reset_btn.addEventListener("click", reset_fun);

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText == "") {
      if (turn) {
        box.innerText = "X";
        box.style.color = "red";
        turn = false;
      } else {
        box.innerText = "O";
        box.style.color = "blue";
        turn = true;
      }
      lastmove = box;
      box.disabled = true;
      count++;
      if (checkWin(box.innerText)) {
        //wait so that alert appear after the winning innerText
        setTimeout(() => {
          alert(
            `Winner is : ${box.innerText == "X" ? playerName1 : playerName2}  :)`,
          );
          reset_fun();
        }, 0);
      } else if (count == 9) {
        setTimeout(() => {
          alert(`Match is Draw...\nNone wins :(`);
          reset_fun();
        }, 0);
      }
    } else {
      alert("Box is already occupied");
    }
  });
});

function checkWin(turnChar) {
  const positions = boxes
    .map((box, index) => (box.innerText === turnChar ? index : -1))
    .filter((index) => index !== -1);

  return winPatterns.some((pattern) =>
    pattern.every((index) => positions.includes(index)),
  );
}
