const cellElements = document.querySelectorAll(".game-board .cell"); // storing elements in array.
//console.log(cellElements);

const player1 = document.querySelector(".players .player1");
const player2 = document.querySelector(".players .player2");

const result = document.querySelector(".result");
const result_text = document.querySelector(".result h1");
const restart_btn = document.querySelector(".result button");

//WINNING CONDITIONS BY USING INDEXES AND INDEX START FROM 0.
const WINNING_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const playerO = "O";
const playerX = "X";
let toggleTurn = true;
cellElements.forEach((cell) => {
  // iterarte single-single element.
  //console.log(cell);
  cell.onclick = () => {
    //console.log(cell.innerHTML);    // only that element consoled which is clicked on and get only values.
    let currentPlayer = toggleTurn ? playerO : playerX; // itis used to toggle the turns of user.
    cell.classList.add("disabled"); // disbled (in css, pointer-none) is used so that cell click only once not again and again.

    // function call.
    addInCell(cell, currentPlayer); // it is used to add current values in game.

    if (winnerCheck(currentPlayer)) {
      // if ( condition:- if winnercheck is true)
      // console.log(currentPlayer + " WINNER ");
      addInactive(); // if win then inactive the cells so that no more fill.
      result_text.innerHTML = currentPlayer + " Win The Game";
    } else if (isDraw()) {
      // console.log("Draw The Game")
      addInactive(); // if draw then inactive the cells so that no more fill.
      result_text.innerHTML = " Draw The Game!";
    } else {
      swapPlayer(); // it is used to toggling the user turn.
    }
  };
});

function swapPlayer() {
  toggleTurn = !toggleTurn; // toggling user turn by storing alternate true-false values.
  if (toggleTurn) {
    // if value true
    player1.classList.add("active"); // classList is used to add class
    player2.classList.remove("active");
  } else {
    player2.classList.add("active");
    player1.classList.remove("active");
  }
}

function addInCell(cell, currentPlayer) {
  cell.innerHTML = currentPlayer; // it is used to show values.
  cell.classList.add(currentPlayer);
}

function isDraw() {
  //  this functiions check if every cell is filled (by using check), then returns draw the game.
  return [...cellElements].every((cell) => {
    // ... is for distruction function
    return cell.classList.contains(playerX) || cell.classList.contains(playerO);
  });
}

function addInactive() {
  result.classList.remove("inactive");
}

function winnerCheck(currentPlayer) {
  // some is used for running a loop on array & check every winning conditions and in "some" if any one condition is true then it will return true.
  return WINNING_CONDITIONS.some((condition) => {
    console.log(condition);

    // every is same as "some" but the main difference is that some returns true if any condition is true but "every" returns true when all conditions are true.
    return condition.every((index) => {
      console.log(index);
      console.log(cellElements[index].classList.contains(currentPlayer));
      return cellElements[index].classList.contains(currentPlayer); //  contains check class i.e, value of current player will in class or not.
    });
  });
}

restart_btn.onclick = () => {
  location.reload(); // page will be reloaded.
};
