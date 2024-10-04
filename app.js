let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let newGameBtn1 = document.querySelector("#new-btn1");
let msgContainer = document.querySelector(".msg-container");
let msgContainer1 = document.querySelector(".msg-container1");
let msg = document.querySelector("#msg");
let msg1 = document.querySelector("#msg1");
let audio3 = document.querySelector("#audio3");
let audio4 = document.querySelector("#audio4");
let turn0 = true; //playerX, playerO

// let arr = ["apple", "banana", "litchi"]; // 1D array
// let arr2 = [["apple", "litchi"], ["potato", "mushroom"], ["pants", "shirts"]]; // 2D array

let audio1 = new Audio();
audio1.src = "./music/touch.mp3";

let audio2 = new Audio();
audio2.src = "./music/button.mp3";

audio3 = new Audio();
audio3.src = "./music/winning.mp3";

audio4 = new Audio();
audio4.src = "./music/gameover.mp3";

// winpattern is a 2d Array
const winPatterns = [
  [0, 1, 2], // horizontal orientation line
  [3, 4, 5], // horizontal orientation line
  [6, 7, 8], // horizontal orientation line
  [0, 3, 6], // vertical orientation line
  [1, 4, 7], // vertical orientation line
  [2, 5, 8], // vertical orientation line
  [0, 4, 8], // diagonal orientation line
  [2, 4, 6], // diagonal orientation line
];


let turn = "X";
const changeTurn = () => {
  if (turn === "X") {
    turn = "O";
    document.querySelector(".bg").style.left = "85px";
  } else {
    turn = "X";
    document.querySelector(".bg").style.left = "0";
  }
 
};

const resetgame = () => {
  turn0 = true;
  enableBoxs();
  msgContainer.classList.add("hide");
  msgContainer1.classList.add("hide");
  changeTurn(turn="O");
  audio3.pause();
  audio4.pause();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (turn0) {
      // player X
      box.innerText = "X";
      turn0 = false;
      changeTurn();
    } else {
      // player O
      box.innerText = "O";
      turn0 = true;
      changeTurn();
    }
    box.disabled = true;
   checkWinner(); 
  });
});

const disabledBoxs = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxs = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulation, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  audio3.play();
  disabledBoxs();
};
const gameOver = () => {
  msg1.innerText = `Opps Sorry Game is Over Please Play Again`;
  msgContainer1.classList.remove("hide");
  audio4.play();
  disabledBoxs();
};
const checkWinner = () => {
  let filledBoxes = 0;
  for (let pattern1 of winPatterns) {
    let pos1Val = boxes[pattern1[0]].innerText;
    let pos2Val = boxes[pattern1[1]].innerText;
    let pos3Val = boxes[pattern1[2]].innerText;
    
    
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner", pos1Val);
        showWinner(pos1Val); 
        return;
    }
  }

  }
   // Check for game over (draw) if all boxes are filled
   boxes.forEach((box) => {
    if (box.innerText !== "") {
      filledBoxes++;
    }
  });

  if (filledBoxes === boxes.length) {
    gameOver(); // If all boxes are filled and no winner
  }
};

newGameBtn.addEventListener("click", resetgame);
newGameBtn1.addEventListener("click", resetgame)
resetBtn.addEventListener("click", resetgame);
