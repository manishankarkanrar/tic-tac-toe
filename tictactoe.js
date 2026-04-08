let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset");
let playerName1 = prompt("Enter Player-1 name : ");
let playerName2 = prompt("Enter Player-2 name : ");
let turn = true;
let count = 0;

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
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
}

reset_btn.addEventListener("click", reset_fun);

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText == "") {
      if (turn) {
        box.innerText = "X";
        turn = false;
      } else {
        box.innerText = "O";
        turn = true;
      }
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
  let arr = [];
  for (let i in boxes) {
    if (boxes[i].innerText == turnChar) {
      arr.push(i);
    }
  }
  let ct = 0;
  for (let i of winPatterns) {
    ct = 0;
    for (let j of i) {
      if (arr.includes(String(j))) {
        ct++;
      } else {
        ct = 0;
        break;
      }
    }
    if (ct == 3) {
      break;
    }
  }
  return ct == 3 ? true : false;
}
